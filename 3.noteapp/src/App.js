import React, { useEffect, useReducer } from "react";
//아래 것은 AppSync 엔드포인트와 통신하기 위해 사용할 graphQL 클라이언트입니다.
import { API } from "aws-amplify";
import { List, Input, Button } from "antd";
import "antd/dist/antd.css";
//아래 것은 쿼리작업
import { listNotes } from "./graphql/queries";
//createNote mutation
import { createNote as CreateNote,
         deleteNote as DeleteNote,
         updateNote as UpdateNote } from "./graphql/mutations";
import { onCreateNote } from "./graphql/subscriptions";
import { v4 as uuid } from "uuid";

const CLIENT_ID = uuid();
console.log("Client_id : " + CLIENT_ID);

/*노트의 초기상태*/
const initialState = {
    notes: [] /*노트의 리스트를 가지고 있는 배열*/,
    loading: true /*로딩 상태를 나타냄*/,
    error: false /*오류 상태를 나타냄*/,
    form: { name: "", description: "" } /*노트의 속성을 가지고 있는 객체*/,
};

const reducer = (state, action) => {
    console.log("reducer 실행");
    console.log("action.type : " + action.type);

    /*각각의 이벤트에 따른 state 변경 */
    switch (action.type) {
        /*전체 리스트 가지고 오는 거*/
        case "SET_NOTES":
            console.log("reducer SET_NOTES: " + action.notes);
            return { ...state, notes: action.notes, loading: false };
        case "ADD_NOTE":
            return {...state, notes: [action.note, ...state.notes]}
        case "RESET_FORM":
            return { ...state, form: initialState.form };
        case "SET_INPUT":
            return { ...state, form: { ...state.form, [action.name]: action.value } };
        case "ERROR":
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

const styles = {
    container: { padding: 20 },
    input: { marginBottom: 10 },
    item: { textAlign: "left" },
    p: { color: "#1890ff" },
};

const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    /*노트 전체 리스트 가지고 오기*/
    const fetchNotes = async () => {
        try {
            const notesData = await API.graphql({
                query: listNotes,
            });

            //데이터가 있다는 것은 확인하였음
            console.log("noteData : " + JSON.stringify(notesData));
            dispatch({ type: "SET_NOTES", notes: notesData.data.listNotes.items });

        } catch (err) {
            console.log(err);
            dispatch({ type: "ERROR" });
        }
    };

    /*노트 생성*/
    /*optimistic response : API 호출이 성공하기 전에 로컬의 상태를 수정합니다. */
    /*로컬의 상태를 먼저 수정하고 그 이후 API 호출을 하여 서버로부터 데이터를 가지고 온다.*/
    const createNote = async () => {
        
        const { form } = state;

        if (!form.name || !form.description) {
          //여기서 팝업을?
            return alert("Please enter a name and description");
        }

        const note = { ...form, clientId: CLIENT_ID, completed: false, id: uuid() };
        console.log("createNote 함수 : " + note);

        /*노트 추가위한 useEffect 실행*/
        dispatch({ type: "ADD_NOTE", note });
        /*추가 후 폼 초기화 하는 useEffect 실행*/
        dispatch({ type: "RESET_FORM" });

        try {
            await API.graphql({
                query: CreateNote,
                variables: { input: note }
            });
            console.log("successfully created note!");
        } catch (err) {
            console.log("createNote error : " + err);
        }
    };

    /*노트 삭제*/
    /*1. 노트의 인덱스를 찾고 삭제된 노트를 제외한 노트로 리스트를 생성 */
    /*2. 로컬 상태 업데이트*/
    /*3. AppSyncAPI 통해서 해당 ID 데이터 삭제 */
    const deleteNote = async (item /*{id}*/) => {
      
      const { id } = item;   
      const index = state.notes.findIndex(n => n.id === id);
      //전체에서 index까지 자르고 그 index 이후로 또 자른다? 
      const notes = [
        ...state.notes.slice(0, index),
        ...state.notes.slice(index+1)
      ];

      dispatch({type: "SET_NOTES", notes});

      try{
          await API.graphql({
              query: DeleteNote,
              variables: {input: {id}}
          });
      }catch(err){
          console.log('deleteNote 함수에서 오류가 났어요 : ' + err);
      }
    };

    /*update 함수*/
    //삭제하려는 index를 찾아서

    const updateNote = async (note) => {

        console.log('updateNote 함수 : ' + {note});

        const index = state.notes.findIndex(n => n.id === note.id);
        const notes = [...state.notes];
        notes[index].completed = !note.completed;
        
        dispatch({type: 'SET_NOTES', notes});

        try{
            await API.graphql({
                query: UpdateNote,
                variables: {input : {id: note.id, completed: notes[index].completed}}
            });
        }catch(err){
            console.log('updateNote 함수에서 오류가 발생했어요 : ' + err);
        }
    };

    //useEffect를 이용해 함수 실행
    //컴포넌트가 렌더링된 이후에 호출됨
    //두번째 인수는 useEffect의 호출 여부를 결정합니다.
    //배열에 값이 없으면 컴포넌트가 마운트 될 때만 실행되고
    //값이 있으면 해당 값이 변경되었을 때 실행된다.
    //subscription 설정 
    //subscribe 이거 머여 아직은 이해가 가지 않는다. 이걸 왜쓰는 거임? 
    //새 노트가 생성되면 이벤트가 트리거되고 새 노트 데이터를 매개변수에 전달. next 함수 호출됨 
    //전달된 데이터를 통해 이 데이터가 현재 사용자가 만든 데이터인지 확인한다? 
    //그냥 실시간으로 이벤트를 전달 받을 수 있다는 점이 
    
    useEffect(() => {
        
        fetchNotes();

        const subscription = API.graphql({
            query: onCreateNote
        }).subscribe({
            next: noteData => {
                const note = noteData.value.data.onCreateNote;

                if(CLIENT_ID === note.clientId){
                    return;
                }
                dispatch({type: 'ADD_NOTE', note});
            }
        });

        return () => subscription.unsubscribe();

    }, []);

    const onChange = (e) => {
        dispatch({ type: "SET_INPUT", name: e.target.name, value: e.target.value });
    };

    const renderItem = (item) => {
        return (
            <List.Item style={styles.item}
                       actions={[<p style={styles.p} onClick={() => deleteNote(item)}>Delete</p>,
                                 <p style={styles.p} onClick={() => updateNote(item)}>
                                     {item.completed ? '완료' : '해야 함'}
                                 </p>]}>
                <List.Item.Meta title={item.name} description={item.description} />
            </List.Item>
        );
    };

    return (
        <div style={styles.container}>
            <Input onChange={onChange} value={state.form.name} 
                   placeholder="Note Name" name="name" style={styles.input} />
            <Input onChange={onChange} value={state.form.description} placeholder="Note description" 
                   name="description" style={styles.input} />
            <Button onClick={createNote} type="primary">
                Create Note
            </Button>
            <br/>
            <hr/>
            <List loading={state.loading} dataSource={state.notes} renderItem={renderItem} />
        </div>
    );
};

export default App;

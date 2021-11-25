import React from 'react';
import Button from './Button';
import {styles} from './Form';


//로그인 양식 렌더링 
//updateFormState - 이벤트를 넘겨준다고? 양식 상태 formState 업데이트 함 
//
//이 파라미터는 어디서 주는 것일까. 
const SignIn = ({signIn, updateFormState}) => {
    return (
        <div style={styles.container}>
            <input
                name='username'
                onChange={e => {e.persist(); updateFormState(e);}}
                style={styles.input}
                placeholder='username'
            />
            <input
                name='password'
                type='password'
                onChange={e => {e.persist(); updateFormState(e);}}
                style={styles.input}
                placeholder='password'
            />
            <Button onClick={signIn} title="로그인"></Button>
        </div>
    );
};

export default SignIn;
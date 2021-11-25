import React, {useEffect} from 'react';
import {Auth} from 'aws-amplify';

//이 구문은 뭐지?? 
//사용자가 로그인되어있으면 아무 일도 발생하지않고 인수로 전달된 컴포넌트가 렌더링된다. 
//그렇지 않으면 리다이렉트
//리다이렉트 경로는 두번째 인수로 전달된 값으로 사용
//경로가 전달되지 않으면 기본값으로 /profile 
const ProtectedRoute = (Comp, route='/profile') => (props) => {

    //사용자의 로그인 여부 확인하는 함수 
    const checkAuthState = async () => {
        try{
            await Auth.currentAuthenticatedUser();
        }catch(err){
            console.log('ProtectedRoute.js : ' + err);
            props.history.push(route);
        }
    };

    useEffect(() => {
        checkAuthState();
    }, []);

    return <Comp {...props}/>
};

export default ProtectedRoute;
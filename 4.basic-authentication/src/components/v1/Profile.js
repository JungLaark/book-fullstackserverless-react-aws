import React, {useEffect, useState} from 'react';
import { Auth } from 'aws-amplify';
import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import Container from './Container';

//로그인한 사용자 프로필 
//사용자 가입과 로그인을 위한 인증 컴포넌트 추가 
//1. 사용자가 로그인을 하지 않은 경우 인증하는 화면을 렌더링
//2. 로그아웃 버튼 제공 
// -> AmplifySignOut 컴포넌트 사용 
//3. 사용자의 정보를 UI에 렌더링 
const Profile = () => {

    useEffect(() => {
        checkUser();
    }, []);

    const [user, setUser] = useState({});

    const checkUser = async () => {
        try{
            const data = await Auth.currentUserPoolUser();
            //오타를 조심하자 
            //attribute -> attributes
            const userInfo = {username: data.username, ...data.attributes};

            setUser(userInfo);
        }catch(err){
            console.log("Profile checkUser 함수에서 오류가 났어요 : " + err);
        }   
    }

    return (
        <Container>
            <h1>Current User Profile</h1>
            <h2>User Name : {user.username}</h2>
            <h2>Email : {user.email}</h2>
            <h2>Phone : {user.phone_number}</h2>
            <AmplifySignOut/>
        </Container>
    );
};

export default withAuthenticator(Profile);
import React, {useEffect} from 'react';
import {Auth} from 'aws-amplify';
import Container from './Container';
import ProtectedRoute from './ProtectedRoute';


//보호된 route 
//사용자가 로그인을 해야 보여지는 route 
//사용자가 로그인하지 않았을 경우 -> 가입 / 로그인을 위한 프로필 페이지로 redirection 
const Protected = (props) => {

    useEffect(() => {
        Auth.currentAuthenticatedUser().catch(() => {
            //사용자의 로그인 여부 확인 
            props.history.push('/profile');
        })
    })

    return (
        <div>
            <h1>protected route</h1>            
            <h2>가입된 사람만 볼 수 있음 : 회원들만 볼 수 있는 페이지</h2>
        </div>
    );
};

export default ProtectedRoute(Protected);
import React from 'react';
import Button from './Button';
import {styles} from './Form';

//사용자의 이름을 입력받고 확인코드 전송 
const ForgotPassword = (props) => {
    return (
        <div style={styles.container}>
            <input
                name='username'
                placeholder='Username'
                onChange={e=>{e.persist(); props.updateFormState(e)}}
                style={styles.input}
            />
            <Button onClick={props.forgotPassword} title='Reset password'/>            
        </div>
    );
};

export default ForgotPassword;
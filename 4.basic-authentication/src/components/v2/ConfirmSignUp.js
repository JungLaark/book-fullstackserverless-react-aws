import React from 'react';
import Button from './Button';
import {styles} from './Form';

//MFA코드를 처리하고 제출하는 양식을 포함 
//Multi Factor Authentication 
const ConfirmSignUp = (props) => {
    return (
        <div style={styles.container}>
            <input
                name='confirmationCode'
                placeholder='Confirmation Code'
                onChange={e => {e.persist(); props.updateFormState(e)}}
                style={styles.input}
            />
            <Button onClick={props.ConfirmSignUp} title='Confirm Sign Up'></Button>
        </div>
    );
};

export default ConfirmSignUp;
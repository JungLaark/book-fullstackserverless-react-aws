import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ConfirmSignUp from './ConfirmSignUp';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordSubmit from './ForgotPasswordSubmit';

const initialFormState = {
    username: '', password: '', email: '', confirmationCode: ''
};

//개별 양식 컴포넌트를 가지고 오고 
//formState : 양식상태 
//formType : 양식의 타입. 타입을 체크하여 등록, 로그인 비밀번호 재 설정 양식 렌더링 
const Form = (props) => {

    const [z, updateFormType] = useState('signIn');
    const [formState, updateFormState] = useState(initialFormState);

    const renderForm = () => {

    };

    return (
        <div>
            {renderForm()}
        </div>
    );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 150,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      height: 45,
      marginTop: 8,
      width: 300,
      maxWidth: 300,
      padding: '0px 8px',
      fontSize: 16,
      outline: 'none',
      border: 'none',
      borderBottom: '2px solid rgba(0, 0, 0, .3)'
    },
    toggleForm: {
      fontWeight: '600',
      padding: '0px 25px',
      marginTop: '15px',
      marginBottom: 0,
      textAlign: 'center',
      color: 'rgba(0, 0, 0, 0.6)'
    },
    resetPassword: {
      marginTop: '5px',
    },
    anchor: {
      color: '#006bfc',
      cursor: 'pointer'
    }
  }

export default {Form, styles};
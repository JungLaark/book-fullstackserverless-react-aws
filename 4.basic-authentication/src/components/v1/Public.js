import React from 'react';
import Container from './Container';

//사용자의 로그인 여부와는 상관없이 보여지는 basic route  
//단순히 route 이름을 UI에 렌더링?
const Public = () => {
    return (
        <Container>
            <h1>Public Route</h1>
        </Container>
    );
};

export default Public;
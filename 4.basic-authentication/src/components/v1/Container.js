import React from 'react';

//재사용이 가능한 스타일 적용하는 컴포넌트 포함 
//모든 컴포넌트를 감싸는 컴포넌트
const Container = ({children}) => {
    return (
        <div style={styles.container}>
            {children}
        </div>
    );
};

const styles = {
    container : {
        margin: '0 auto',
        padding: '50px 100px'
    }
}

export default Container;
import React, {useState, useEffect} from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Public from './Public';
import Profile from './Profile';
import Protected from './Protected';


//현재 경로의 이름을 결정지음 
//window.location.href 속성에 따라 현재 경로 이름을 결정? 
//머선말이고 
const Router = () => {

    const [current, setCurrent] = useState('/home');

    useEffect(()=> {
        setRoute();

        /*경로가 변경될 때마다 setRoute를 호출하는 이벤트 등록*/
        window.addEventListener('hashchange', setRoute);
        return () => window.removeEventListener('hashchange', setRoute);
    },[]);

    /*경로 이름을 설정하는 함수*/
    const setRoute = () => {
        const location = window.location.href.split('/');
        const pathName = location[location.length - 1];

        setCurrent(pathName ? pathName : 'home');
         
    }

 
    return (
        <HashRouter>
          <Nav current={current}/>
          <Switch>
              <Route exact path="/" component={Public}/>
              <Route exact path="/protected" component={Protected}/>
              <Route exact path="/profile" component={Profile}/>
              <Route component={Public}/>
          </Switch>
            
        </HashRouter>
    );
};

export default Router;
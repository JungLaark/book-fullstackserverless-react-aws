import React, {useState, useEffect} from 'react';
import { API } from 'aws-amplify';
import './App.css';

const App = () => {

  const [coins, updateCoins] = useState([]);
  const [input, updateInput] = useState({limit: 5, start: 0});

  //API호출을 위한 fetchCoins 함수 정의 
  const fetchCoins = async () => {
    //data를 받아와서 그대로 그냥 전달해준게 다임 
    // const data = await API.get('cryptoapi', '/coins');
    // updateCoins(data.coins);

    const {limit, start} = input;
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`);
    
    updateCoins(data.coins);
  };

  //컴포넌트가 마운트 될 때 fetchCoins 함수 호출 
  useEffect(() => {
    fetchCoins();
  }, []);

  //사용자 입력 
  const updateInputValue = (type, value) => {
    updateInput({...input, [type] : value})
  }

  return (
    <div className="App">
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }

      <br/>
      <hr/>
      <input onChange={e=>updateInputValue('limit', e.target.value)} placeholder="limit"></input>
      <input onChange={e=>updateInputValue('start', e.target.value)} placeholder="start"></input>
      <button onClick={fetchCoins}>Fetch Coins</button>
    </div>
  );
};

export default App;
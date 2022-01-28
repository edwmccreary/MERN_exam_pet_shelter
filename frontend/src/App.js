import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, useHistory} from "react-router-dom";
import io from 'socket.io-client';

//views go here
import TestView from './views/TestView';
import PetList from './views/PetList';
import PetForm from './views/PetForm';
import PetView from './views/PetView';

function App() {

  // const [socket] = useState(() => io(':8000'));

  // useEffect(()=>{
  //   console.log("checking socket io:");
  //   socket.on('Welcome', data => console.log(data));

  //   return () => socket.disconnect(true);
  // },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <PetList/>
          </Route>
          <Route exact path="/pets/new">
            <PetForm/>
          </Route>
          <Route exact path="/pets/edit/:_id">
            <PetForm edit={true}/>
          </Route>
          <Route exact path="/pets/view/:_id">
            <PetView/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

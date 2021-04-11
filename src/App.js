import './App.css';
import React  , { useEffect } from "react";
import cookies from 'universal-cookie';
import { Switch , Route , useHistory, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./Screens/Home";
import Navbar from "./Navbar";
import Login from "./Screens/Login";
import SignIn from "./Screens/Signup";
import Userstock from "./Screens/UserStocks";
import { RequestFunction } from "./store/UserAction";

const Routing = () => {  
  const history   = useHistory();
  const Cookie    = new cookies();
  const dispatch  = useDispatch();
  useEffect(()=>{
    const token   = localStorage.getItem("token");
    let payload;
    if(token){
      payload     = token.split(".")[1];
      payload     = JSON.parse(window.atob(payload));
    }
    if(!payload){
      localStorage.clear();
      Cookie.remove("token");
      history.push("/login");
    }else{
      history.push("/");
      dispatch(RequestFunction("get",`userbyid/${payload.data._id}`));
    }
  });

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <SignIn />
      </Route>
      <Route exact path="/userstocks">
        <Userstock />
      </Route>
    </Switch>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routing/>  
    </BrowserRouter>
  )
  
};

export default App;


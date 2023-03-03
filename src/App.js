import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { UserContext } from '../../client/src/contexts/userContext';
import { API, setAuthToken } from './config/api';

//component
import Home from './component/pages/home';
import Transaction from './component/pages/transaction';
import DetailFilm from './component/pages/detailFilm';
// import Cart from './component/pages/cart';
import AddFilm from './component/pages/add-film';
import MyProfile from './component/pages/myProfile';
import MyFilm from './component/pages/myFilm';
import Category from './component/pages/category';


function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  
  useEffect(() => {
    
    //Init token every time the app is refreshed
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate('/');
    } 
    else {
      if (state.user.role === 'admin') {
        navigate('/');
        console.log(state.user.role)
      } else if (state.user.role === 'user') {
        navigate('/')
        console.log(state.user.role)
      }
    }
  }, [state]);

  const checkUserAuth = async () => { 
    try { 
       if (localStorage.token) { 
          setAuthToken(localStorage.token); 
          const response = await API.get("/check-auth"); 
  
          let payload = response.data.data; 
          payload.token = localStorage.token;
          console.log(localStorage.token);
     
          dispatch({ 
             type: "USER_SUCCESS", 
             payload, 
          }); 
          
       } 
    } catch (error) { 
      console.log(error); 
    } 
 };


  useEffect(() => {
    checkUserAuth();
  }, [])

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/film:id' element={<DetailFilm />}/>
        {/* <Route path='/cart' element={<Cart />}/> */}
        <Route path='/profile' element={<MyProfile />} />
        <Route path='/my-film' element={<MyFilm />} />
        {/* admin */}
        <Route path='/add-film' element={<AddFilm />} />
        <Route path='/category' element={<Category />} />
      </Routes>
    </>
  );
}

export default App;

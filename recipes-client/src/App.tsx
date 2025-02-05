import {  RouterProvider } from 'react-router'
import './App.css'
import { router } from './Router'
import userReducer,{ UserContext } from './reducer/UserReducer'
import { useReducer } from 'react';
import { Provider } from 'react-redux';
import store from './recipesStor/stor';
function App() {
  const [user, userDispatch] = useReducer(userReducer, {id:"",email:"",password:""});    

  return (
    <> 
      <UserContext value={{user,userDispatch}}>
      <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
      </UserContext>
    </>
  )
}

export default App

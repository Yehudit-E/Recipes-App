
import { Outlet } from 'react-router';
import Header from './header/Header';

const  Applayout=() =>{
    return (
      <>
        <Header></Header>
        <Outlet/>
      </>
    )
  }
  
  export default Applayout
import { useState } from 'react';
import Login from './Login';
import UserName from './UserName';
import { Box, Divider, Grid } from '@mui/material';
import NavBar from './NavBar';
const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <>
    <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, width: '100%', backgroundColor: 'white', zIndex: 1000 }}>
      <Grid  container spacing={2} direction="row-reverse"> {/* הוספנו direction="row-reverse" */}
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}> {/* גריד השני שיהיה מוצמד לימין */}
          {!isLogin && <Login setIsLogin={setIsLogin} />}
          <UserName/>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}> {/* גריד הראשון שיהיה מוצמד לשמאל */}
          <NavBar isLogin={isLogin}/>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" sx={{borderWidth:'1.2px',marginTop: "2px", 
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }} />
    </Box>
  </>
  )
}
export default Header
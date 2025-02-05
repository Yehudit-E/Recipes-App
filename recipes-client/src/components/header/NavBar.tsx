import { Button, Container } from "@mui/material"
import { Link } from "react-router"

const NavBar=({isLogin}:{isLogin:boolean})=>{ 
    return(<>
        <Container sx={{display: 'flex', justifyContent: 'flex-start',marginLeft:3.2}}>
        <Button sx={{"&:hover": { backgroundColor: "transparent" },height:"35px",fontSize:'17px', textTransform: 'none' ,marginRight:1.5}} 
            component={Link} to="/" >
            Home
        </Button>
        <Button sx={{"&:hover": { backgroundColor: "transparent" },height:"35px",fontSize:'17px', textTransform: 'none' ,marginRight:1.5}} 
            component={Link} to="/about" >
            About
        </Button>
        <Button sx={{"&:hover": { backgroundColor: "transparent" },height:"35px",fontSize:'17px', textTransform: 'none' ,marginRight:1.5}} 
            component={Link} to="/recipes" >
            Recipes
        </Button>
        {isLogin &&(
        <Button sx={{"&:hover": { backgroundColor: "transparent" },height:"35px",fontSize:'17px', textTransform: 'none' ,marginRight:1.5}} 
            component={Link} to="/add" >
            Add Recipe
        </Button>
        )}
        </Container>
    </>)
}
export default NavBar
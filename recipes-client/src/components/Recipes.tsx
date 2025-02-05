import RecipesList from "./RecipeList";
import { Outlet } from "react-router";
import { Box } from "@mui/material";

const Recipes = () => {
  return (
    <div style={{ padding: "10px", paddingTop: "0px", fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', padding: 3 }}>
        <Box sx={{ width: '30%' }}>
          <RecipesList/>
        </Box>
        <Box sx={{ width: '65%' }}>
          <Outlet/>
        </Box>
      </Box>
    </div>
  )
}
export default Recipes;
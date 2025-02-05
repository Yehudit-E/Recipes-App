import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { StoreType } from "../recipesStor/stor";
import UpdateRecipe from "./UpdateRecipe";
import { Box, Card, CardContent, Container, Divider, Typography } from "@mui/material";
import { Assignment, Description, LocalDining } from "@mui/icons-material";

const RecipeView = () => {
    const { id } = useParams();
    const recipesList = useSelector((store: StoreType) => store.recipes.list);
    let recipe = recipesList.find((recipe) => recipe.id === Number(id));
    return (<>
   <Container maxWidth="md" sx={{
  py: 5,
  display: 'flex',
  justifyContent: 'flex-end'
}}>
  <Card sx={{
    width: '100%',
    borderRadius: 2,
    bgcolor: 'white',
    overflow: 'hidden',
    padding: 2,
     boxShadow: 'none',
    border: '0.2px solid #e0e0e0'
  }}>
    {recipe&& (
    <CardContent>
      <Typography variant="h4" sx={{ color: "primary.main" }} gutterBottom>
        {recipe.title}
      </Typography>

      <Typography variant="body1" sx={{ color: "gray", mb: 2, fontSize: "1.1rem" }}>
      <Description sx={{ verticalAlign: 'middle', marginRight: '1px' }} />
        {recipe.description}
      </Typography>

      <Divider sx={{ my: 2, bgcolor: "#e0e0e0", height: 2 }} />

      <Typography variant="h6" sx={{ color: "primary.main" }}>
      <LocalDining sx={{ verticalAlign: 'middle', marginRight: '4px',paddingBottom: '4px' }} />
        Ingredients:
      </Typography>
      <Box sx={{
        bgcolor: "#f5f5f5",
        p: 2,
        borderRadius: 1,
        mt: 1
      }}>
        <Box component="ul" sx={{ pl: 2, listStyle: "none", m: 0 }}>
          {recipe.ingredients.map((ingredient, index) => (
            <Typography key={index} variant="body1" component="li" sx={{ mb: 0.5 }}>
              • {ingredient}
            </Typography>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 2, bgcolor: "#e0e0e0", height: 2 }} />

      <Typography variant="h6" sx={{ color: "primary.main" }}>
      <Assignment sx={{ verticalAlign: 'middle', marginRight: '4px' }} />
        Instructions:
      </Typography>
      <Box sx={{
        bgcolor: "#f5f5f5",
        p: 2,
        borderRadius: 1,
        mt: 1
      }}>
        <Typography variant="body1" sx={{ mb: 2, fontSize: "1.1rem" }}>
          {recipe.instructions}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 3 }}>
        <UpdateRecipe recipe={recipe} />
      </Box>

    </CardContent>
)}
{!recipe&&(
   <Typography  sx={{ mb: 2, fontSize: "1.1rem" }}>
   Select a recipe to view
 </Typography>
)}
  </Card>
</Container>
    </>)
}
export default RecipeView;
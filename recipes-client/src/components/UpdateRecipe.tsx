import { useContext, useState } from "react";
import { AddDispach } from "../recipesStor/stor";
import { useDispatch } from "react-redux";
import { UserContext } from "../reducer/UserReducer";
import { Recipe, updateRecipe } from "../recipesStor/recipesSlice";
import RecipeForm from "./RecipeForm";
import { Button } from "@mui/material";

const UpdateRecipe = ({ recipe }: { recipe: Recipe }) => {
    const [openForm, setOpenForm] = useState(false);
    const dispatch = useDispatch<AddDispach>();
    const user = useContext(UserContext);
    const updateRecipeSubmit = (newRecipe: Recipe) => {
        setOpenForm(false);
        dispatch(updateRecipe({ recipe: newRecipe, id: recipe.id }));
    }
    return (<>
        <div style={{
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        }}>
            {user.user.id == recipe.authorId.toString() && (
                <Button variant="text" onClick={() => setOpenForm(true)} sx={{ height: "35px", textTransform: 'none', marginTop: 3.8, marginLeft: 1.5 }}>
                    Edit Recipe
                </Button>
            )}
            {openForm && (
                <RecipeForm openForm={openForm} setOpenForm={setOpenForm} recipe={recipe} onSubmit={updateRecipeSubmit}></RecipeForm>
            )}
        </div>
    </>)
}
export default UpdateRecipe
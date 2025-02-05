import { useContext, useState } from "react";
import RecipeForm from "./RecipeForm"
import { useDispatch } from "react-redux";
import { AddDispach } from "../recipesStor/stor";
import { UserContext } from "../reducer/UserReducer";
import {addRecipe, Recipe}from "../recipesStor/recipesSlice";
import { useNavigate } from "react-router";


const AddRecipe = () => {
    const [openForm, setOpenForm] = useState(true);
    const dispatch = useDispatch<AddDispach>();
    const user = useContext(UserContext); 

    const emptyRecipe:Recipe = {
        id: 0,
        title: "",
        description: "",
        ingredients: [""],  
        instructions:"", 
        authorId:0
    }
    const navigate = useNavigate();
    const navigateBack = () => {
        navigate(-1);
    }
    const addRecipeSubmit=(recipe:Recipe)=>{  
        setOpenForm(false);
        recipe.authorId=+(user.user.id);        
        console.log(recipe);
        dispatch(addRecipe(recipe));   
        navigateBack();

    }

    return (<>
        <div style={{
            marginLeft:"45px",padding: "20px", paddingTop: "0px",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        }}>
        {user.user.id!="" &&
        openForm && (
        <RecipeForm openForm={openForm} setOpenForm={setOpenForm} recipe={emptyRecipe} onSubmit={addRecipeSubmit}></RecipeForm>
        )}
        {user.user.id=="" &&(
        <>
         <div style={{marginTop:"50px"}}> Error!!</div>
         <div>You need to be logged in to add a recipe</div>
        </>
        )}
        </div>
    </>)
}
export default AddRecipe
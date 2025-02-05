import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Recipe } from "../recipesStor/recipesSlice";
import Input from "./Input";

const recipeSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  ingredients: yup.array().of(yup.string().required("This field is required")).required("This field is required"),
  instructions: yup.string().required("This field is required"),
});
type Fields = {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
};
const RecipeForm = ({ recipe, onSubmit, openForm, setOpenForm }: 
  { recipe: Recipe; onSubmit: (data: Recipe) => void; openForm: boolean; setOpenForm: (openForm: boolean) => void; }) => {
  const { handleSubmit, reset, setValue, control, watch } = useForm<Fields>({
    resolver: yupResolver(recipeSchema),
    defaultValues: {
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    },
  });
  const ingredients = watch("ingredients") || [];
  useEffect(() => {
    if (recipe) {
      setValue("title", recipe.title);
      setValue("description", recipe.description);
      setValue("ingredients", recipe.ingredients);
      setValue("instructions", recipe.instructions);
    }
  }, [recipe, setValue]);
  const addIngredient = () => {
    setValue("ingredients", [...ingredients, ""]);
  };
  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setValue("ingredients", ingredients.filter((_, i) => i !== index));
    }
  };
  const handleFormSubmit = (data: Fields) => {
    reset();
    const newRecipe: Recipe = {
      id: recipe.id,
      title: data.title,
      description: data.description,
      ingredients: data.ingredients,
      instructions: data.instructions,
      authorId: recipe.authorId,
    };
    onSubmit(newRecipe);
  };

  return (
    <>
      {openForm && (
        <Dialog open={openForm} onClose={() => setOpenForm(false)}>
          <DialogContent sx={{ width: 370 }}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Input name="title" control={control} label="Recipe Title" />
              <Input name="description" control={control} label="Description" />
              <Typography variant="h6" sx={{ marginBottom: "8px" }}>Ingredients</Typography>
              {ingredients.map((_, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <Input name={`ingredients.${index}`} control={control} label={`Ingredient ${index + 1}`} />
                  <IconButton onClick={() => removeIngredient(index)} color="error" disabled={ingredients.length === 1}>
                    <Remove />
                  </IconButton>
                </div>
              ))}
              <Button onClick={addIngredient} startIcon={<Add />} sx={{ textTransform: "none", marginBottom: "16px" }}>
                Add Ingredient
              </Button>
              <Input name="instructions" control={control} label="Instructions" multiline rows={4} />
              <DialogActions>
                <Button sx={{ textTransform: "none" }} type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RecipeForm;




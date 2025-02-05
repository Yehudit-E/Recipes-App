import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Recipe = {
  id: number,
  title: string,
  description: string,
  authorId: number,
  ingredients: string[],
  instructions: string
}

export const fetchData = createAsyncThunk('recipes/fetch',
  async (_, thunkAPI) => {
    try {
      console.log('in async thunk');
      const response = await axios.get('http://localhost:3000/api/recipes')
      return response.data
    }
    catch (e: any) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const addRecipe = createAsyncThunk('recipes/add',
  async (recipe: Recipe, thunkAPI) => {
    console.log(recipe);
    try {
      console.log('in async thunk');
      console.log(recipe);
      
      const response = await axios.post('http://localhost:3000/api/recipes', recipe,{
          headers: {
            'user-id': recipe.authorId
          }
        }
      )
      return response.data
    }
    catch (e: any) {
      alert(e.message)
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
export const updateRecipe = createAsyncThunk('recipes/update',
  async ({ recipe, id }: { recipe: Recipe, id: number }, thunkAPI) => {
    const newRecipe = {
      ...recipe,
      id: id
    }
    try {
      console.log('in async thunk');
      const response = await axios.put('http://localhost:3000/api/recipes', newRecipe,
        {
          headers: {
            'user-id': recipe.authorId
          }
        }
      )
      thunkAPI.dispatch(fetchData());
      return response.data
    }
    catch (e: any) {
      alert(e.message)
      return thunkAPI.rejectWithValue(e.message)
    }})
const recipesSlice = createSlice({
  name: 'recipes',
  initialState: { list: [] as Recipe[], loading: true },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled,
        (state, action) => {
          console.log('fulfilled');
          state.list = [...action.payload]
        })
      .addCase(fetchData.rejected,
        () => {
          console.log('failed');
          alert("error");
        })
      .addCase(addRecipe.fulfilled,
        (state, action) => {
          console.log();
          console.log('Recipe added:', action.payload);
          state.list.push(action.payload.recipe);
        })
      .addCase(addRecipe.rejected,
        () => {
          console.log('failed');
          alert("error");
        })
      .addCase(updateRecipe.fulfilled,
        () => {
          console.log('fulfilled');
        })
      .addCase(updateRecipe.rejected,
        () => {
          console.log('failed');
        })
  }
});
export default recipesSlice;
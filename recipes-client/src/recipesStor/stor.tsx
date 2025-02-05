import { configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./recipesSlice.tsx";

const store = configureStore({
    reducer:{
        recipes:recipesSlice.reducer
    }, 
});

export type StoreType = ReturnType<typeof store.getState>
export type AddDispach = typeof store.dispatch
export default store




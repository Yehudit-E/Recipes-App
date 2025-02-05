import { createBrowserRouter } from "react-router";
import Home from "./components/Home";
import About from "./components/About";
import Applayout from "./components/Applayout";
import Recipes from "./components/Recipes";
import RecipeView from "./components/RecipeView";
import AddRecipe from "./components/AddRecipe";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: 'recipes',
        element: <Recipes/>,
        children:
          [
            { path: ':id', element: <RecipeView/>},
            { path: '', element: <RecipeView/>},
          ]
      },
      { path: 'add', element: <AddRecipe /> },
    ],
  },
]);


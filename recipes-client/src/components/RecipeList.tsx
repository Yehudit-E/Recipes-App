import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Recipe, fetchData } from '../recipesStor/recipesSlice';
import { AddDispach, StoreType } from '../recipesStor/stor';
import { MenuItem, MenuList } from '@mui/material';
import { useNavigate, useParams } from 'react-router';

const RecipesList = () => {
    const recipes = useSelector((store: StoreType) => store.recipes.list);
    const dispatch = useDispatch<AddDispach>();
    const navigate = useNavigate();
    const { id } = useParams(); 
    const selectedId = id ? Number(id) : null; 

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    const handleClick = (recipe: Recipe) => {
        const currentUrl = window.location.pathname;
        const parts = currentUrl.split('/');
        const lastPart = parts[parts.length - 1];
        const hasId = !isNaN(Number(lastPart));
        let newUrl;
        if (hasId) {
            newUrl = currentUrl.slice(0, currentUrl.lastIndexOf('/')) + `/${recipe.id}`;
        } else {
            newUrl = `${currentUrl}/${recipe.id}`;
        }
        navigate(newUrl);
    };

    return (
        <div style={{ marginLeft: "45px" }}>
            <MenuList sx={{ marginTop: "50px" }}>
                {recipes.map((recipe) => (
                    <MenuItem
                        key={recipe.id}
                        onClick={() => handleClick(recipe)}
                        disableRipple
                        sx={{
                            marginBottom: 1,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            bgcolor: selectedId === recipe.id ? '#f0f0f0' : 'transparent', // סימון הנבחר
                            '&:hover': { bgcolor: '#f0f0f0' }, 
                            transition: "none !important", 
                            animation: "none", 
                        }}>
                        {recipe.title}
                    </MenuItem>
                ))}
            </MenuList>
        </div>
    );
};

export default RecipesList;

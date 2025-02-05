import express from 'express';
import fs from 'fs';
import path from 'path';
import authMiddleware from '../middleware/authMiddleware.js';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../db/db.json');

// שליפת כל המתכונים
router.get('/', (req, res) => {
    const db = JSON.parse(fs.readFileSync(dbPath));
    res.json(db.recipes);
});

// הוספת מתכון (רק למשתמש מחובר)
router.post('/', authMiddleware, (req, res) => {
    console.log("----------------------------------------");
    console.log(req)
    console.log("----------------------------------------");
    
    const {
        title,
        description,
        products,
        ingredients,
        instructions
    } = req.body;
    const db = JSON.parse(fs.readFileSync(dbPath));

    const newRecipe = {
        id: Date.now(),
        title,
        products,
        description,
        authorId: req.header('user-id'),
        ingredients,
        instructions,
    };

    db.recipes.push(newRecipe);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(201).json({ message: "Recipe added", recipe: newRecipe });
});
router.put('/', authMiddleware, (req, res) => {
    const {
        id,
        title,
        products,
        description,
        ingredients,
        instructions,
    } = req.body;
    const authorId = req.header('user-id')
    const db = JSON.parse(fs.readFileSync(dbPath));
    const recipe = db.recipes.find(r => r.id === id)
    if (!recipe || recipe.authorId!== authorId) {
        return res.status(403).json({ message: "this isnt add" });
    }
    const newRecipe = {
        id,
        title,
        products,
        description,
        authorId,
        ingredients,
        instructions,
    };
    const recipeId = db.recipes.findIndex(r=>r.id===id)
    console.log(db.recipes[recipeId])
    db.recipes[recipeId] = newRecipe
    console.log(db.recipes[recipeId])
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(201).json({ message: "Recipe added", recipe: newRecipe });
});


export default router;

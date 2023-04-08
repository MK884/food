// const express = require("express")
import express from "express";
const router = express.Router()
import { addFoods, getAllFoods, getFoodById, removeFood, UpdateFood, findFoodByCat } from '../Controllers/FoodController.js'
// import { addFoods, getAllFoods, getFoodById, removeFood, UpdateFood, findFoodByCat} from "../Controllers/FoodController";

router.post("/", addFoods)
router.get("/", getAllFoods)
router.get("/:id", getFoodById)
router.patch("/:id", UpdateFood)
router.delete("/:id", removeFood)
router.get("/findbycat/:cat", findFoodByCat)
// module.exports = router;
export default router;
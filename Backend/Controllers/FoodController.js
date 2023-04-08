// const Food = require("../modals/FoodModel")
import Food from '../modals/FoodModel.js';
import mongoose from 'mongoose';

const addFoods = async(req,res) => {
    const {name,desc,price,photos,stock,category,discount} = req.body;
let foods; 
foods = new Food({
    name,
    desc,
    price,
    discount,
    photos,
    stock,
    category
});

try {
    await foods.save()
} catch (error) {
    console.log(error)
}
res.send({foods})
}


// get all the Foods
const getAllFoods = async(req,res) => {
    let foods;
    try {
        foods = await Food.find({})
        res.header('Access-Control-Expose-Headers', 'x-total-count');
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // if(foods){
    //     return res.send({foods})
    // }
    // return res.send({message:"Unable to fetch foods details"})
}

// Getting Individual Food
const getFoodById = async(req,res) => {
    const {id}= req.params
    let food;
    try {
        food = await Food.findById(id)
        res.header('Access-Control-Expose-Headers', 'x-total-count');
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // if(food){
    //     return res.send({food})
    // }
    // return res.send({message:"Unable to fetch individual food details"})
}

// Remove Food
const removeFood = async(req,res) => {
    const {id} = req.params
    let food;
    try {
        food = await Food.findByIdAndRemove(id)    
    } catch (error) {
        console.log(error)
    }
    if(food){
        return res.send({message:"food Deleted Successfully",food})
    }
    return res.send({message:"Unable to delete the food"})
}

// Update Food
const UpdateFood = async(req,res) => {
    const {id} = req.params
    let food;
    try {
        food = await Food.findByIdAndUpdate(id,{
            $set:req.body
        },{
            new:true
        })    
        return res.send({message:"food Updated Successfully",food})
    } catch (error) {
        console.log(error)
    }
}

// Get Food by category
const findFoodByCat = async(req,res) => {
    let food;
    try {
        food = await Food.find({category:req.params.cat})
    } catch (error) {
        console.log(error)
    }
    if(food){
        return res.send({food})
    }
    return res.send({msg:"Unable to fetch the food"})
}

export { addFoods, getAllFoods, UpdateFood, removeFood, findFoodByCat, getFoodById};


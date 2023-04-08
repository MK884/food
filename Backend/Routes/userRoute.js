// const express = require("express")
import express from "express";
const router = express.Router();
import {
  userRegistration,
  userLogin,
  getAllUsers,
  getUserById,
  removeUser,
  updateUser,
  addToCart,
  getAllCartItems,
} from "../Controllers/userController.js";

router.post("/", userRegistration);
router.post("/userlogin", userLogin);
router.get("/getusers", getAllUsers);
router.get("/getuser/:id", getUserById);
router.delete("/removeuser/:id", removeUser);
router.put("/updateuser/:id", updateUser);
router.put("/addtocart/:id", addToCart);
router.get("/getallcarts", getAllCartItems);

// module.exports = router;
export default router;


import express from "express";
const router = express.Router();
import { getOrders, orderItems, getUserOrder } from "../Controllers/OrdersControllers.js";

router.get("/",getOrders);
router.post("/",orderItems);
router.get("/:id",getUserOrder);

// module.exports = 
export default router;
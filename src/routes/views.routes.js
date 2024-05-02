import { Router } from "express";
import  ProductManager  from "../productManager.js";
import { config } from "../config.js";


const manager = new ProductManager(`${config.DIRNAME}/products.json`);
const router = Router();

router.get("/", async (req,res) => {

    let products = await manager.getProducts(0);
    res.render("home",{  products:products } );

})

router.get("/realtimeproducts", async (req,res) => {

    let products = await manager.getProducts(0);
    res.render("realTimeProducts",{  products:products } );
    
})

export default router
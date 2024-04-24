import { Router } from "express";
import  CartManager  from "../cartManager.js";
import  ProductManager  from "../productManager.js";
import { config } from "../config.js";

const manager = new CartManager(`${config.DIRNAME}/cart.json`);
const managerProducts = new ProductManager(`${config.DIRNAME}/products.json`);
const router = Router();

router.get('/:cid',async(req, res) => {

    const cid = req.params.cid;
    let cart = await manager.getCartById(parseInt(cid));

    res.send( {status:200, payload:cart} )
});

router.get('/',async(req, res) => {
    let carts = await manager.getCarts();
    res.send( {status:200, payload:carts} )
});

router.post('/', async(req, res) => {
    await manager.createCart();

    res.send({status:200, payload:manager.carts})
})

router.post('/:cid/product/:pid', async(req, res) => {

    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const product = await managerProducts.getProducts();
    const carts = await manager.getCarts();

    const existProduct = product.find( (product) => product.id === +pid);
    const existCart = carts.find( (cart) => cart.id === cid);


    if(existCart && existProduct){

        manager.addProductToCart(cid, pid)
    }


    
    res.send({status:200, payload:"Activo"})
})

export default router;
import { Router } from "express";
import  ProductManager  from "../productManager.js";
import { config } from "../config.js";


const router = Router();
const manager = new ProductManager(`${config.DIRNAME}/products.json`);

router.get("/", async(req,res) => {
    
    let limit = parseInt(req.query.limit) || 0;
    let products = await manager.getProducts(limit);
    res.send( { status: 200, payload: products }  );

});

router.get("/:id", async(req,res) => {
    
    let id = req.params.id;
    let product = await manager.getProductById(parseInt(id));

    res.send( {status:200, payload:product} );
});

router.post('/', async(req,res) => {
    
    let productToAdd = req.body;

    await manager.addProduct( ...productToAdd );

    res.send( {status:200, payload:productToAdd} )
});

router.delete('/:pid', async(req,res) => {
    let pid = req.params.pid;

    await manager.deleteProduct(parseInt(pid));
    
    res.send( {status:200, payload:"Producto Eliminado"} )
})

router.put('/:pid', async(req,res) => {
    let pid = req.params.pid;
    let body = req.body;

    await manager.updateProduct(parseInt(pid), ...body)
    
    res.send( {status:200, payload:"Producto Actualizado"} )
})

export default router;
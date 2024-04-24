import fs from "fs";

class CartManager {

    constructor(file){
        this.carts = [];
        this.file = file
    };
    
    async getCarts(){
        let carts = await fs.promises.readFile(this.file, "utf-8") || [];
        let parseCarts = await JSON.parse(carts);
        
        this.carts = parseCarts;
        
        return parseCarts;
    }
    async createCart () {
        await this.getCarts();

        const newId = this.carts.length === 0 ? 1 : this.carts[this.carts.length - 1].id + 1;

        const cart = {
            id: newId,
            products: []
        };

        this.carts.push(cart);
        await fs.promises.writeFile(this.file, JSON.stringify(this.carts), "utf-8")


        return this.carts;
    }

    async getCartById(cid){

        await this.getCarts();

        let cart = this.carts.find( cart => cart.id === cid );
        if(cart){
            return cart;
        } else{
            console.log(`No existe carrito con id ${cid}`)
        }
    }


    async addProductToCart ( cid ,pid ){

        await this.getCarts();

        const productAdd = {id:pid, quantity:1};
        const index = this.carts.findIndex( cart => cart.id === cid );

        if( this.carts[index].products.some( (product) => product.id === productAdd.id ) ){
            let indexProduct = this.carts[index].products.findIndex( product => product.id === productAdd.id);
            this.carts[index].products[indexProduct].quantity += 1;
            await fs.promises.writeFile(this.file, JSON.stringify(this.carts), "utf-8")
        } else {
            this.carts[index].products.push(productAdd);
            await fs.promises.writeFile(this.file, JSON.stringify(this.carts), "utf-8")
        }
    }
};


export default CartManager;
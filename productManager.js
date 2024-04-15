import fs from "fs";

class ProductManager {

    constructor(file){
        this.file = file;
        this.products = [];
    };

    async getProducts (limit){

        let products = await fs.promises.readFile(this.file, "utf-8") || [];
        let parseProducts = await JSON.parse(products);
        
        this.products = parseProducts;

        return limit === 0 ? parseProducts : parseProducts.slice(0, limit);
    }

    async addProduct( productoAgregar ){
        
        await this.getProducts(0);
        const exist = this.products.some( (product) => product.code === productoAgregar.code )
        
        if(!exist){
            this.products.push({ ...productoAgregar, id:this.products.length + 1} );
            await fs.promises.writeFile(this.file, JSON.stringify(this.products), "utf-8")
            console.log("Producto agregado")
        }else{
            console.log("Este producto ya existe")
        };
    };

    async getProductById (productId){
        await this.getProducts(0);
        let product = this.products.find( (product) => product.id === productId );
        
        if(product){
            return product;
        } else {
            console.log("Ese producto no existe")
        };
    }
}

export default ProductManager;

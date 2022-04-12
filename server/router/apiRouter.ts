import express from "express";
import mongoose from "mongoose";
import { Product } from "../db/models/Product";
import ProductTable from "../db/schema/ProductSchema";
const apiRouter: express.Router = express.Router();

/*
    usage: Create a Product
    URL : http://localhost:5000/api/v1/products
    Method: POST
    Fields: name, image, price, qty, info
    Access: Public
*/
apiRouter.post(
  "/products",
  async (req: express.Request, res: express.Response) => {
    try {
      let product = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        qty: req.body.qty,
        info: req.body.info,
      };

      let existingProduct = await ProductTable.findOne({ name: req.body.name });
      if (existingProduct) {
        return res.status(401).json({ product });
      }
      // Create New Product
      let newProduct = new ProductTable(product);
      await newProduct.save(); // inset into db
      res.status(200).json({ msg: "Product successfully created..." });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
);

/*
    usage: Update a Product
    URL : http://localhost:5000/api/v1/products/:productId
    Method: put
    Fields: name, image, price, qty, info
    Access: Public
*/

apiRouter.put(
  "/products/:productId",
  async (req: express.Request, res: express.Response) => {
    let { productId } = req.params;

    try {
      let updatedProduct = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        qty: req.body.qty,
        info: req.body.info,
      };

      // check if product exist
      let product = await ProductTable.findById(productId);
      if (!product) {
        return res.status(404).json(updatedProduct);
      }
      // Update existing product

      product = await ProductTable.findByIdAndUpdate(
        productId,
        {
          $set: {
            name: updatedProduct.name ? updatedProduct.name : product.name,
            image: updatedProduct.image ? updatedProduct.image : product.image,
            price: updatedProduct.price ? updatedProduct.price : product.price,
            qty: updatedProduct.qty ? updatedProduct.qty : product.qty,
            info: updatedProduct.info ? updatedProduct.info : product.info,
          },
        },
        { new: true }
      );
      res.status(200).json({ msg: "Product is updated..." });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
);

/*
    usage: GET All Products
    URL : http://localhost:5000/api/v1/products
    Method: put
    Fields:no-field
    Access: Public
*/

apiRouter.get(
  "/products",
  async (req: express.Request, res: express.Response) => {
    try {
      let products: Product[] = await ProductTable.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
);

/*
    usage: GET Single Product
    URL : http://localhost:5000/api/v1/products/:productId
    Method: put
    Fields:no-field
    Access: Public
*/
apiRouter.get(
  "/products/:productId",
  async (req: express.Request, res: express.Response) => {
    let productId = req.params.productId;
    try {
      let product: Product | null = await ProductTable.findById(productId);
      if (!product) {
        return res.status(404).json(product);
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
      console.log(error); 
    }
  }
);

/*
    usage: Delete Product
    URL : http://localhost:5000/api/v1/products/:productId
    Method: put
    Fields:no-field
    Access: Public
*/
apiRouter.delete(
  "/products/:productId",
  async (req: express.Request, res: express.Response) => {
    let productId = req.params.productId;
    try {
      let product = await ProductTable.findById(productId);
      if (!product) {
        return res.status(404).json({ msg: "Product does not exist!" });
      }
      // delete product
      product = await ProductTable.findByIdAndRemove(productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
);
export default apiRouter;

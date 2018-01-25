import {Request, Response} from "express";
import {Scopes} from "../Commons/Enums";
import {Product} from "../Entities/Product";
import {validate} from "class-validator";
import {isNullOrUndefined} from "util";
import {ProductModel} from "../Models/ProductModel";
import sharp = require("sharp");
import * as fs from "fs";
import {OutputInfo} from "sharp";

export class ProductsController {

    static AddProduct(req: Request, res: Response) {
        if (!req.tokenData) {
            return res.status(401).send();
        }

        if (req.tokenData.scope.indexOf(Scopes.OperatorScope) === -1) {
            return res.status(403).send();
        }

        const files: any = req.files;
        let product = new Product(req.body);

        let filepath = __dirname + "/../../public/images/" + files[0].filename;
        sharp(filepath)
            .resize(250)
            .withoutEnlargement()
            .png()
            .toBuffer(
                (err: Error, buffer: Buffer) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    product.thumbnail = buffer.toString('base64');
                    product.picture = files[0].filename;

                    validate(product).then(errors => {
                        if (errors.length > 0) {
                            return res.status(400).json(errors);
                        } else {
                            product.persist((err, prod) => {
                                if (err) {
                                    return res.status(400).json(err);
                                }
                                return res.status(200).send();
                            });
                        }
                    });
                });
    }


    static GetProductList(req: Request, res: Response) {
        Product.factory.find(Product, {}, (err: any, products: Product[]) => {
            if (err != null) {
                return res.status(400).json(err);
            } else {
                let result = [];
                for (let prod of products) {
                    result.push({
                        id: prod.id,
                        name: prod.name,
                        price: prod.price,
                        thumbnail: prod.thumbnail
                    });
                }
                return res.status(200).json(result);
            }
        });
    }


    static GetProductById(req: Request, res: Response) {
        Product.factory.findOne(Product, {_id: req.params.id}, (err: any, product: Product) => {
            if (err != null) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(product);
            }
        });
    }


    static EditProduct(req: Request, res: Response) {
        Product.factory.findOne(Product, {_id: req.params.id}, (err: any, product: Product) => {
            if (err != null) {
                return res.status(400).json(err);
            } else {
                if (!req.body) {
                    return res.status(400).json("empty_body");
                }

                let p = new Product(req.body);

                validate(p).then(errors => {
                    if (errors && errors.length > 0) {
                        return res.status(400).json(errors);
                    }

                    ProductModel.update({_id: req.params.id}, req.body, {}, (err: any, prod: any) => {
                        if (err) {
                            return res.status(400).json(err);
                        }

                        return res.status(200).send();
                    });
                })
            }
        })
    }


    static DeleteProduct (req: Request, res: Response) {
        Product.factory.findOne(Product, {_id: req.params.id}, (err: any, prod: Product) => {
            fs.unlink(__dirname + "/../../public/images/" + prod.picture, (err: any) => {});
            Product.factory.remove({_id: req.params.id}, (err: any) => {
                if (err) {
                    return res.status(400).json(err);
                }
                return res.status(200).send();
            });

        });
    }
}

import {Request, Response} from "express";
import {Scopes} from "../Commons/Enums";
import {Product} from "../Entities/Product";
import {isNullOrUndefined} from "util";
import {validate} from "class-validator";

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
    }
}
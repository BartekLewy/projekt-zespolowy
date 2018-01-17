import {Request, Response} from "express";
import {Order} from "../Entities/Order";
import {validate} from "class-validator";
import {Product} from "../Entities/Product";
import {IProductModel} from "../Models/ProductModel";
import {IOrderModel} from "../Models/OrderModel";

export class OrderController {
    static AddOrder (req: Request, res: Response) {
        if (req.body) {
            let order = new Order(req.body);

            validate(order).then(errors => {
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                } else {
                    order.populate('products.item', (err: any, populated: any) => {

                        let sum = 0;
                        for (let product of populated.products) {
                            sum += product.item.price * product.count;
                        }
                        order.orderValue = sum;

                        order.persist((err, prod: IOrderModel) => {
                            if (err) {
                                return res.status(400).json(err);
                            }
                            return res.status(200).send();
                        });
                    });
                }
            })
        }
    }
}

import {Request, Response} from "express";
import {Order} from "../Entities/Order";
import {validate} from "class-validator";
import {Product} from "../Entities/Product";
import {IProductModel} from "../Models/ProductModel";
import {IOrderModel} from "../Models/OrderModel";
import {isNullOrUndefined} from "util";
import {IOrder} from "../Interfaces/IOrder";

export class OrderController {
    static AddOrder (req: Request, res: Response) {
        if (req.body) {
            let order = new Order(req.body);

            validate(order).then(errors => {
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                } else {
                    order.populate('products.item', (err: any, populated: any) => {

                        if (err) {
                            console.log(err);
                            return res.status(400).json(err);
                        }

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

    static GetAllOrders (req: Request, res: Response) {
        Order.factory.find(Order, {}, (err: any, orders: Order[]) => {
            if (err != null) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(orders);
            }
        });
    }

    static GetOrderById (req: Request, res: Response) {
        Order.factory.findOne(Order, {_id: req.params.id}, (err: any, order: Order) => {
            if (err != null) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(order);
            }
        });
    }

    static ChangeOrderStatus (req: Request, res: Response) {
        if (req.body.status !== "in_progress" &&
            req.body.status !== "ready_to_send" &&
            req.body.status !== "sent") {
            return res.status(400).json("bad_status");
        }

        Order.factory.findOne(Order, {_id: req.params.id}, (err: any, order: Order) => {
            if (err != null) {
                return res.status(400).json(err);
            }

            if (isNullOrUndefined(order)) {
                return res.status(404).json("order_not_found");
            }

            order.orderStatus = req.body.status;

            order.persist((err: any, prod: IOrderModel) => {
                return res.status(200).send();
            })
        })
    }
}

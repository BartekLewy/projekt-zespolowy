import {Request, Response} from "express";
import {Order} from "../Entities/Order";
import {validate} from "class-validator";
import {Product} from "../Entities/Product";
import {IProductModel} from "../Models/ProductModel";
import {IOrderModel} from "../Models/OrderModel";
import {isNullOrUndefined} from "util";
import {IOrder} from "../Interfaces/IOrder";
import {MailManager} from "../Services/MailManager";
import {DiscountCode} from "../Entities/DiscountCode";
import {IDiscountCodeModel} from "../Models/DiscountCodeModel";

export class OrderController {
    static AddOrder (req: Request, res: Response) {
        if (req.body) {
            let order = new Order(req.body);

            validate(order).then(errors => {
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                } else {
                    if (!isNullOrUndefined(order.discountCode)) {
                        DiscountCode.factory.remove({code: order.discountCode}, (err: any) => {

                        });
                    }
                    order.populate('products.item', (err: any, populated: any) => {

                        if (err) {
                            console.log(err);
                            return res.status(400).json(err);
                        }

                        let sum = 0;
                        for (let product of populated.products) {
                            sum += product.item.price * product.count;

                            if (product.item.amount - product.count < 0) {
                               return res.status(400).json({
                                  too_much: product.item.name,
                                  amount_available: product.item.amount
                               });
                            }
                            product.item.amount -= product.count;
                            let prod = new Product(product.item);
                            prod.persist((err: any, res: IProductModel) => {
                            });
                        }

                        order.orderValue = sum;

                        order.persist((err, prod: IOrderModel) => {
                            if (err) {
                                return res.status(400).json(err);
                            }

                            let content = "Witaj " + order.firstName + " " + order.lastName + "!<br/>" +
                                "<br/>Twoje zamówienie numer " + order.id + " zostało złożone. Poinformujemy Cię o wszystkich " +
                                "zmianach dotyczących twojego zamówienia.<br/><br/>Pozdrawiamy,<br/>Zespół Sklepu z grami";
                            MailManager.sendMail(order.email, "Złożenie zamówienia", content);
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
                let status = "";
                if (req.body.status === 'in_progress') status = "W realizacji";
                if (req.body.status === 'ready_to_send') status = "Gotowe do wysyłki";
                else {
                    status = "Wysłane";
                }
                let random = (x: number) => {
                    return Math.floor(Math.random() * Math.floor(x));
                };
                let content = "Witaj " + order.firstName + " " + order.lastName + "!<br/>" +
                    "<br/>Informujemy, że Twoje zamówienie numer " + order.id + " zmieniło status na '" + status + "'.<br/>";
                    if (req.body.status === 'sent') {
                        let code = new DiscountCode();
                        let str = "";
                        for (let i =0; i<5; i++){
                            str += "ABCDEFGH123456789"[random(16)];
                        }
                        code.code = str;
                        code.value = 0.2;

                        code.persist((err: any, c: IDiscountCodeModel) => {});

                        content += "Dziękujemy że jesteś z nami. Na dowód tego przesyłamy ten oto jednorazowy kod rabatowy " +
                            "o wartości " + code.value * 100 + "% na Twoje kolejne zamówienie!<br/> Kod: " + code.code;
                    }

                    content += "<br/>Pozdrawiam,<br/> Zespół sklepu z grami";
                MailManager.sendMail(order.email, "Złożenie zamówienia", content);
                return res.status(200).send();
            })
        })
    }
}

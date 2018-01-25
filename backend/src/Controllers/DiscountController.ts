import {Request, Response} from "express";
import {DiscountCode} from "../Entities/DiscountCode";
import {validate} from "class-validator";
import {isNull, isNullOrUndefined} from "util";
import {IDiscountCodeModel} from "../Models/DiscountCodeModel";

export class DiscountController {

    static GenerateDiscountCode(req: Request, res: Response) {
        if (req.body) {
            let code = new DiscountCode(req.body);

            let finish = () => {
                code.persist((err, product: IDiscountCodeModel) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    return res.status(200).send();
                });
            };

            validate(code).then(errors => {
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                } else {
                    if (!isNullOrUndefined(code.user)) {
                        code.populate('user', (err: any, populated: any) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).json(err);
                            }

                            if (isNullOrUndefined(code.user)) {
                                console.log("no_such_user");
                                return res.status(400).json("no_such_user");
                            }

                            finish();
                        });
                    }
                    finish();
                }
            });
        } else {
            return res.status(400).json("no_param");
        }
    }

    static GetAllDiscountCodes(req: Request, res: Response) {
        DiscountCode.factory.find(DiscountCode, {}, (err: any, codes: DiscountCode[]) => {
            if (err != null) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json(codes);
            }
        });
    }

    static GetDiscountCode(req: Request, res: Response) {
        if (req.params.code) {
            DiscountCode.factory.findOne(DiscountCode, {code: req.params.code}, (err: any, discount: DiscountCode) => {
                if (err) {
                    return res.status(400).json(err);
                } if(isNullOrUndefined(discount)) {
                    return res.status(400).send();
                } else {
                    return res.status(200).json(discount);
                }
            });
        } else {
            return res.status(400).json("no_body");
        }
    }

    static RemoveDiscountCode(req: Request, res: Response) {
        if (req.params.code) {
            DiscountCode.factory.remove({code: req.params.code}, err => {
                if (err) {
                    return res.status(400).json(err);
                } else {
                    return res.status(200).send();
                }
            });
        } else {
            return res.status(400).json("no_param");
        }
    }

}
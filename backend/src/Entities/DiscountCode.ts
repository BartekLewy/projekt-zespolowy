import {Entity} from "../Classes/Entity";
import {IsNotEmpty} from "class-validator";
import {isNull, isNullOrUndefined} from "util";
import {IDiscountCode} from "../Interfaces/IDiscountCode";
import {DiscountCodeModel, IDiscountCodeModel} from "../Models/DiscountCodeModel";
import * as mongoose from "mongoose";

export class DiscountCode extends Entity<IDiscountCodeModel> implements IDiscountCode {
    protected data: any;

    get id(): any { return this.data._id }

    @IsNotEmpty()
    get code(): string { return this.data.code }
    set code(c: string) { this.data.code = c }

    @IsNotEmpty()
    get value(): number { return this.data.value }
    set value(v: number) { this.data.value = v }

    get user(): mongoose.Schema.Types.ObjectId { return this.data.user }
    set user(u: mongoose.Schema.Types.ObjectId) { this.data.user = u }

    static get factory() { return new DiscountCode() }

    constructor (data?: IDiscountCode) {
        super(DiscountCodeModel);

        if (isNullOrUndefined(data)) {
            this.data = {};
        } else {
            this.data = data;
        }
    }

    public persist(callback: (err: any, res: IDiscountCodeModel) => void = null) {
        let model = new DiscountCodeModel(this.data);

        model.save((err, product) => {
            if (err != null) {
                return callback (err, null);
            }

            if (callback != null) {
                return callback(err, product);
            }
        });
    }
}
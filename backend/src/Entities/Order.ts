import {IOrderModel, OrderModel} from "../Models/OrderModel";
import {Entity} from "../Classes/Entity";
import {IOrder} from "../Interfaces/IOrder";
import {IsNotEmpty} from "class-validator";
import {isNull, isNullOrUndefined} from "util";
import * as mongoose from "mongoose";

export class Order extends Entity<IOrderModel> implements IOrder {

    protected  data: any;

    get id(): any { return this.data._id }

    @IsNotEmpty()
    get firstName(): string { return this.data.firstName }
    set firstName(name: string) { this.data.firstName = name }

    @IsNotEmpty()
    get lastName(): string { return this.data.lastName }
    set lastName(name: string) { this.data.lastName = name }

    @IsNotEmpty()
    get street(): string { return this.data.street }
    set street(street: string) { this.data.street = street }

    @IsNotEmpty()
    get localNumber(): string { return this.data.localNumber }
    set localNumber(localNumber: string) { this.data.localNumber = localNumber }

    @IsNotEmpty()
    get city(): string { return this.data.city }
    set city(city: string) { this.data.city = city }

    @IsNotEmpty()
    get postalCode(): string { return this.data.postalCode }
    set postalCode(postalCode: string) { this.data.postalCode = postalCode }

    @IsNotEmpty()
    get email(): string { return this.data.email }
    set email(email: string) { this.data.email = email }

    @IsNotEmpty()
    get phone(): string { return this.data.phone }
    set phone(phone: string) { this.data.phone = phone }

    @IsNotEmpty()
    get products(): {
        item: mongoose.Schema.Types.ObjectId;
        count: number;
    }[] { return this.data.products }

    set products(products: {
        item: mongoose.Schema.Types.ObjectId;
        count: number;
    }[]) { this.data.products = products }

    get discountCode(): string { return this.data.discountCode }
    set discountCode(code: string) { this.data.discountCode = code }

    get discountValue(): number { return this.data.discountValue }
    set discountValue(value: number) { this.data.discountValue = value }

    get orderValue(): number { return this.data.orderValue }
    set orderValue(value: number) { this.data.orderValue = value }

    get orderStatus(): string { return this.data.orderStatus }
    set orderStatus(status: string) { this.data.orderStatus = status }

    static get factory() { return new Order() }

    constructor (data?: IOrder) {
        super(OrderModel);

        if (isNullOrUndefined(data)) {
            this.data = {};
        } else {
            this.data = data;
            if (isNullOrUndefined(data.orderStatus)) {
               this.data.orderStatus = "in_progress";
            }
        }
    }

    public persist(callback: (err: any, res: IOrderModel) => void = null) {

        let model = new OrderModel(this.data);

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
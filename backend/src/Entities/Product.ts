import {IsNotEmpty} from "class-validator";
import {isNullOrUndefined} from "util";

import {Entity} from "../Classes/Entity";
import {IProduct} from "../Interfaces/IProduct";
import {IProductModel, ProductModel} from "../Models/ProductModel";

export class Product extends Entity<IProductModel> implements IProduct {

    protected data: any;

    get id(): any { return this.data._id }

    @IsNotEmpty()
    get name(): string { return this.data.name }

    @IsNotEmpty()
    get description(): string { return this.data.description }

    @IsNotEmpty()
    get price(): number { return this.data.price }

    @IsNotEmpty()
    get currency(): string { return this.data.currency }

    @IsNotEmpty()
    get amount(): number { return this.data.amount }

    @IsNotEmpty()
    get picture(): string { return this.data.picture }
    set picture(pic: string) { this.data.picture = pic }

    @IsNotEmpty()
    get thumbnail(): string { return this.data.thumbnail }
    set thumbnail(pic: string) { this.data.thumbnail = pic }

    static get factory() { return new Product() }

    constructor (data?: IProduct) {
        super(ProductModel);

        if (isNullOrUndefined(data)) {
            this.data = {};
        } else {
            this.data = data;
        }
    }

    public persist(callback: (err: any, res: IProductModel) => void = null) {

        let model = new ProductModel(this.data);

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
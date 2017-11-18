import {IsNotEmpty} from "class-validator";
import {isNull, isNullOrUndefined} from "util";

import {UserType} from "../Commons/Enums";
import {IUserModel, UserModel} from "../Models/UserModel";
import {IUser} from "../Interfaces/IUser";
import {Entity} from "../Classes/Entity";

export class User extends Entity<IUserModel> implements IUser {

    protected data: any;

    get id(): any { return this.data._id }

    @IsNotEmpty()
    get email(): string { return this.data.email }

    @IsNotEmpty()
    get password(): string { return this.data.password }
    set password(pass: string) { this.data.password = pass }

    @IsNotEmpty()
    get username(): string { return this.data.username }

    @IsNotEmpty()
    get firstName(): string { return this.data.firstName }

    @IsNotEmpty()
    get lastName(): string { return this.data.lastName }

    @IsNotEmpty()
    get street(): string { return this.data.street }

    get localNumber(): string { return this.data.localNumber }

    @IsNotEmpty()
    get postalCode(): string { return this.data.postalCode }

    @IsNotEmpty()
    get city(): string { return this.data.city }

    @IsNotEmpty()
    get country(): string { return this.data.country }

    @IsNotEmpty()
    get type(): UserType { return this.data.type }
    set type(type: UserType) { this.data.type = type }

    @IsNotEmpty()
    get accountConfirmed(): boolean { return this.data.accountConfirmed }
    set accountConfirmed(confirmed: boolean) { this.data.accountConfirmed = confirmed }

    static get factory() { return new User() }

    constructor (data?: IUser) {
        super(UserModel);

        if (isNullOrUndefined(data)) {
            this.data = {};
        } else {
            this.data = data;
            if (isNullOrUndefined(this.data.accountConfirmed)) {
                this.data.accountConfirmed = true;
            }
            if (isNullOrUndefined(this.data.type)) {
                this.data.type = UserType.Customer;
            }
        }
    }

    public persist(callback: (err: any, res: IUserModel) => void = null) {

        let model = new UserModel(this.data);

        model.save((err, product) => {
            if (err != null) {
                return callback (err, null);
            }

            if (callback != null) {
                return callback(err, product);
            }
        });
    }

    public findOne(criteria: Object, callback: (err: any, res: any) => void) {
        super.findOne(User, criteria, callback);
    }

    public find(criteria: Object, callback: (err: any, res: any[]) => void) {
        super.find(User, criteria, callback);
    }
}
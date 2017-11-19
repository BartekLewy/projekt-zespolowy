import * as mongoose from "mongoose";
import {isArray, isNull, isNullOrUndefined} from "util";

export class Entity<T extends mongoose.Document> {

    protected data: any;

    constructor(protected modelObject: mongoose.Model<T>) {
        this.data = {};
    }

    public findOne(entityClass: any, criteria: Object, callback: (err: any, res: any) => void) {
        this._callResultingFunction(entityClass, criteria, this.modelObject.findOne, callback);
    }

    public find(entityClass: any, criteria: Object, callback: (err: any, res: any[]) => void) {
        this._callResultingFunction(entityClass, criteria, this.modelObject.find, callback);
    }

    public populate(path: string, callback: (err: any, res: any) => void) {
        this.modelObject.populate(this.data, {path: path}, callback);
    }

    public remove(criteria?: Object, callback?: (err: any) => void) {
        if (isNullOrUndefined(criteria)) {
            if (Object.getOwnPropertyNames(this.data).length === 0) {
                console.error("[!!!] Zatrzymano usuwanie");
                return console.log("Usuwanie zatrzymane - najprawdopodobniej wcale nie chcesz tego zrobić");
            }
            criteria = {_id: this.data._id};
        }
        if (isNullOrUndefined(callback)){callback = (err) => {};}
        this._callNonresultingFunction(criteria, this.modelObject.remove, callback);
    }

    protected _callResultingFunction
    (entityClass: any, criteria: Object,
     modelClassFunc: (criteria: Object, callback: (err: any, res: any) => void) => void,
     callback: (err: any, res: any[] | null) => void) {

        modelClassFunc.call(this.modelObject, criteria, function (err: any, res: T | Array<T> | null) {
            if (err) {
                return callback(err, null);
            }
            if (!isNullOrUndefined(res)) {
                if (isArray(res)) {
                    let results: Array<any> = [];
                    for (let el of res) {
                        results.push(new entityClass(el));
                    }
                    return callback(null, results);
                }
                let entity = new entityClass(res);
                return callback(null, entity);
            }

            return callback(null, null);
        });
    }

    protected _callNonresultingFunction
    (criteria: Object,
     modelClassFunc: (criteria: Object, callback?: (err: any) => void) => void,
     callback?: (err: any) => void) {

        modelClassFunc.call(this.modelObject, criteria, function (err: any) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    }
}

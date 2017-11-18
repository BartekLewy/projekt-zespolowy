
export function retrieveDuplicateFieldFromMongoError(err: any):string {
    if (err.code == 11000) {
        return err.message.split('index: ')[1].split('_')[0];
    }
    return null;
}
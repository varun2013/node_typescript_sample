import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    first_name: String,
    last_name: String,
    email: {type: String, index: {unique: true, dropDups: true}},
    password: String,
    resetPasswordToken: {type:String, required:false}
});

export default mongoose.model('users', schema);

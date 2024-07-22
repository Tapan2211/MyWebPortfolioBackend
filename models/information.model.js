const mongoose = require('mongoose');
const validator = require('validator');

const informationSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

const informationModel = mongoose.model('information', informationSchema);
module.exports = informationModel;

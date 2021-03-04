const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    links: [
        {
            type: Types.ObjectId,
            ref: 'Link'
        }
    ],
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = model('User', schema)
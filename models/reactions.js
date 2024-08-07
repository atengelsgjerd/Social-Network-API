const {Types, Schema} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => new Date(createdAtVal).toLocaleString()
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    })

    module.exports = reactionSchema;
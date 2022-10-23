const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    // Map out Log attributes
    text: {
        type: String,
        trim: true,
        required: [true, 'Log text is required']
    },

    priority: {
        type: String,
        default: 'low',
        enum: ['low', 'moderate', 'high']
    },

    user: {
        type: String,
        trim: true,
        required: [true, 'User is required']
    },

    created: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('Log', LogSchema)
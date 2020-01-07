const mongoose = require("mongoose");
const Schema = mongoose.Schema;

leadersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps:true
})

var Leaders = mongoose.model("Leaders", leadersSchema);
module.exports = Leaders;
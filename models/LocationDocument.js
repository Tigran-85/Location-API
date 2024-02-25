const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema(
    {
        location_id: {
            type: Schema.Types.ObjectId,
            default: function () {
                return this._id;
            }
        },
        name: {
            type: String,
        },
        description: {
            type: String
        },
        category: {
            type: String
        },
        rating: {
            type: Number
        },
        review_count: {
            type: Number
        },
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);

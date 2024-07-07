const {Schema, model} = require("mongoose");    
const sessionSchema = Schema(
    {
        title:{
            type: String,
            required: true,
            unique: true,
        },
        description:{
            type: String,
            required: true,
        },
        trainer:{
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        date:{
            type: Date,
            required: true,
        },
        time:{
            type: String,
            required: true,
        },
        duration:{
            type: Number,
            required: true,
        },
        slots:{
            type: Number,
            required: true,
        },
        location:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: { createdAt: "created", updatedAt: "updated" },
    }
)

const Session = model("Session", sessionSchema)

module.exports = Session
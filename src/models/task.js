const { model, Schema } = require("mongoose");

const TaskSchema = new Schema({
        taskName: {
                type: String,
                required: true
        },
        taskDescription: {
                type: String,
                default: this.taskName
        },
        isDone: {
                type:Boolean,
                default: false
        },
        isActive: {
                type: Boolean,
                default: true
        },
        userId: {
                type: Schema.Types.ObjectId, ref: "User",
                default: "withoutUser"
        }
}, {
        timestamps: true,
        versionKey: false
});

module.exports = model("Task", TaskSchema)
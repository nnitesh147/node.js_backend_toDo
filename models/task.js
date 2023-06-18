import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: String,
    description:{
        type : String,
        required:true,
    },
    isCompleted:{
        type: Boolean,
        default:false,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }

});

export const Task = mongoose.model("Task", schema);
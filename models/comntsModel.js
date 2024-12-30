import mongoose, { Schema, SchemaType } from "mongoose";

const commentsSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  createdBy : {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  blog : {
    type: Schema.Types.ObjectId,
    ref: 'Blogs'
  }
},{
    timestamps: true,
});

const comments =  mongoose.model("Comments",commentsSchema)
export default comments;
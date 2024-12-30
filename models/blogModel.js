import mongoose, { Schema, SchemaType } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  blogImg :{
    type: String,

  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdBy : {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    },
},{
    timestamps: true,
});

const blogs =  mongoose.model("Blogs",blogSchema)
export default blogs;
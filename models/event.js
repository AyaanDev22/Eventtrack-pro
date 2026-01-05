const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imgUrl:{
      type:String,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
    },
    maxCapacity: {
      type: Number,
      default: 50,
    },

    // Registered users
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

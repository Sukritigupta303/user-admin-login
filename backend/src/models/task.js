const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    // Task ka title (required)
    title: { type: String, required: true, trim: true },

    // Optional description
    description: { type: String, default: "" },

    // Kis user ko assign kiya (required)
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Kisne assign kiya (Admin)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
  },
  { timestamps: true } // create/update ka time automatic
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

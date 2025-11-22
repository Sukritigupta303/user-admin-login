const Task = require("../models/task");

// 📍 GET - User ke tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// 📍 POST - Admin assigns task
exports.addTask = async (req, res) => {
  const mongoose = require("mongoose");
  
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can assign tasks" });
    }

    const { title, description, assignedTo } = req.body;

    if (!title || !assignedTo) {
      return res.status(400).json({ message: "Title and assignedTo required" });
    }

    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
  return res.status(400).json({ message: "Invalid user ID" });
}

    const newTask = new Task({
      title,
      description: description || "",
      assignedTo,       // user id to whom task assigned
      createdBy: req.user.id,  // admin id
    });

    await newTask.save();

    res.status(201).json({ message: "Task assigned successfully", task: newTask });
  } catch (error) {
    console.error("Add Task Error:", error);
    res.status(500).json({ message: "Error adding task", error });
  }
};

// 📍 DELETE - Admin only
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Error deleting task", error });
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware se milta hai
    const tasks = await Task.find({ assignedTo: userId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

exports.deleteTaskByUser = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // 🔒 Sirf apna task delete kar sakta hai
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this task" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
import Task from "../models/task.model.js";

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({
      user: req.userId,
    });
    return res.status(200).json({
      message: "Tasks found successfully",
      tasks: tasks.map((task) => {
        return {
          id: task._id,
          title: task.title,
          description: task.description,
          date: task.date,
          status: task.status,
        };
      }),
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Invalid task id" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getTask(req, res) {
  try {
    const taskFound = await Task.findById(req.params.id);

    if (!taskFound) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task found successfully",
      task: {
        id: taskFound._id,
        title: taskFound.title,
        description: taskFound.description,
        date: taskFound.date,
        status: taskFound.status,
      },
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Invalid task id" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createTask(req, res) {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({ title, description, date, user: req.userId });
    const taskSaved = await newTask
      .save()
      .then((task) => {
        task.populate("user");
        return res.status(201).json({
          message: "Task created successfully",
          task: {
            title: task.title,
            description: task.description,
            date: task.date,
          },
        });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user id" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateTask(req, res) {
  try {
    const { title, description, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status
      },
      {
        new: true, // Return the updated task.
      }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid task id" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteTask(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete({ _id: id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(204).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid task id" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function changeTaskStatus(req, res) {
  try {
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true, // To return the updated task
      }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task status changed successfully",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Invalid task id" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// For test purposes
export async function deleteAllTasks(req, res) {
  try {
    const tasks = await Task.deleteMany({});

    return res.status(204).json({
      message: "All tasks were deleted successfully",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Invalid task id" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// src/pages/user/UserDashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, ListTodo, Settings } from "lucide-react";
import axios from "axios";
import { Link, Outlet, useLocation } from "react-router-dom";
interface Task {
  _id: string;
  title: string;
  description: string;
  completed?: boolean;
}

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Fetch user's tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks/my-tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTasks(res.data);

      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    };
    fetchTasks();
  }, []);

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`/api/tasks/my-tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Delete karne ke baad list update karo
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

      alert("Task deleted successfully!");
    } catch (err) {
      console.error("Error deleting task", err);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-blue-600">User Panel</h2>

        <nav className="space-y-3">
          <Link
            to="/user/dashboard/tasks"
            className={`flex items-center w-full p-2 rounded-md ${location.pathname.includes("tasks")
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-gray-200"
              }`}
          >
            <ListTodo size={20} className="mr-2" /> My Tasks
          </Link>

          <Link
            to="/user/dashboard/profile"
            className={`flex items-center w-full p-2 rounded-md ${location.pathname.includes("profile")
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-gray-200"
              }`}
          >
            <User size={20} className="mr-2" /> Profile
          </Link>

          <Link
            to="/user/dashboard/settings"
            className={`flex items-center w-full p-2 rounded-md ${location.pathname.includes("settings")
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-gray-200"
              }`}
          >
            <Settings size={20} className="mr-2" /> Settings
          </Link>
        </nav>


        <button
          onClick={handleLogout}
          className="mt-auto flex items-center w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          <LogOut size={20} className="mr-2" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, <span className="text-blue-600">User 👋</span>
        </h1>

        <Outlet />

        {window.location.pathname === "/user/dashboard/tasks" && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-medium mb-4">My Tasks</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {tasks.length === 0 && <li>No tasks assigned yet.</li>}
              {tasks.map((task) => (
                <li key={task._id} className="flex justify-between items-center">
                  <div>
                    <strong>{task.title}</strong>: {task.description}{" "}
                    {task.completed && (
                      <span className="text-green-600">(Completed)</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ❌ Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;

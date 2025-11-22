"use client";
import React, { useState } from "react";
import axios from "axios";

const AdminDashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const currentUserId = localStorage.getItem("userId");
  
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [users, setUsers] = useState<{ _id: string; name: string; role?: string }[]>([]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

    React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  const handleTaskSubmit = async () => {
  try {
    await axios.post("/api/tasks", taskData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔥 Fix
      },
    });

    alert("Task assigned successfully!");
    setShowModal(false);
    setTaskData({ title: "", description: "", assignedTo: "" });
  } catch (error) {
    alert("Error assigning task");
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Card */}
      <div className="w-full max-w-5xl bg-white shadow-lg p-8 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome, <span className="text-blue-600 font-bold">Admin</span> 👋
        </h2>
        <p className="text-gray-500 mt-2">
          You can assign tasks to users from here.
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          + Assign Task
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Assign Task</h3>

            <input
              type="text"
              placeholder="Task Title"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />

            <textarea
              placeholder="Description"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />

<select
  value={taskData.assignedTo}
  onChange={(e) =>
    setTaskData({ ...taskData, assignedTo: e.target.value })
  }
  className="w-full p-2 mb-3 border rounded"
>
  <option value="">Select User</option>
 {users
  .filter((user) => user._id !== currentUserId) 
  .map((user) => (
    <option key={user._id} value={user._id}>
      {user.name}
    </option>
  ))}
</select>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                onClick={handleTaskSubmit}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

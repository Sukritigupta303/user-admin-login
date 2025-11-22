// src/pages/user/SettingsPage.tsx
import React, { useState } from "react";

const SettingsPage: React.FC = () => {


  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4">Settings ⚙️</h2>

      {/* Account Settings */}
      <div className="p-4 bg-white shadow rounded-md">
        <h3 className="text-lg font-medium mb-2">Account Settings</h3>
        <input
          type="text"
          placeholder="Update your name"
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="email"
          placeholder="Update your email"
          className="border p-2 rounded w-full mb-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600">
          Save Changes
        </button>
      </div>

      {/* Password Settings */}
      <div className="p-4 bg-white shadow rounded-md">
        <h3 className="text-lg font-medium mb-2">Security</h3>
        <input
          type="password"
          placeholder="Current Password"
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 rounded w-full mb-2"
        />
        <button className="bg-green-500 text-white px-4 py-2 text-sm rounded-md hover:bg-green-600">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;

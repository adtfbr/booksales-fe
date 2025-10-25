import { useState } from "react";
import { createGenre } from "../../../_services/genres";
import { useNavigate } from "react-router-dom";

export default function GenreCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGenre(form);
    navigate("/admin/genres");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">Add New Genre</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}

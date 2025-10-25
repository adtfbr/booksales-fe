import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateGenre, getGenres } from "../../../_services/genres";

export default function GenreEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    const fetchGenre = async () => {
      const data = await getGenres();
      const genre = data.find((g) => g.id === parseInt(id));
      if (genre) setForm(genre);
    };
    fetchGenre();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGenre(id, form);
    navigate("/admin/genres");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">Edit Genre</h2>
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
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-800"
        >
          Update
        </button>
      </form>
    </div>
  );
}

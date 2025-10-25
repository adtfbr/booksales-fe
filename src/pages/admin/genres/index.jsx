import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres, deleteGenre } from "../../../_services/genres";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const data = await getGenres();
    setGenres(data);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus genre ini?")) {
      await deleteGenre(id);
      fetchGenres();
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Genres</h2>
          <Link
            to="/admin/genres/create"
            className="px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-800"
          >
            + Add Genre
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <tr key={genre.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">{genre.name}</td>
                    <td className="px-4 py-3">{genre.description || "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/admin/genres/edit/${genre.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(genre.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-3 text-center text-gray-500">
                    No genres found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthors } from "../../../_services/authors";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await getAuthors();
      setAuthors(data);
    };
    fetchAuthors();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Authors</h2>
          <Link
            to="/admin/authors/create"
            className="px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-800"
          >
            + Add Author
          </Link>
        </div>

        <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Photo
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Bio
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
              {authors.length > 0 ? (
                authors.map((author) => (
                  <tr key={author.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">
                      {author.photo ? (
                        <img src={author.photo} alt={author.name} className="w-12 h-12 object-cover rounded-full" />
                      ) : (
                        <span className="text-gray-400 italic">No photo</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{author.name}</td>
                    <td className="px-4 py-3">{author.bio || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-3 text-center text-gray-500">
                    No authors found.
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

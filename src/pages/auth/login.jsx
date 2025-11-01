import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../_api";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      const response = await API.post("/login", formData);

      console.log("Respons server:", response.data);

      const { access_token, user } = response.data;

      if (access_token && user) {
        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("Login berhasil:", user.name);

        if (user.role === 'admin') {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      } else {
        throw new Error(response.data.message || "Data login tidak lengkap dari server.");
      }

    } catch (error) {
      console.error("Login gagal:", error.message);
      setErrors(error.response?.data?.message || error.message || "Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Masuk ke Akun Anda
              </h1>
              {errors && (
                <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                  {errors}
                </div>
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email Anda
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="nama@domain.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Memproses...' : 'Masuk'}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Belum punya akun?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Daftar di sini
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

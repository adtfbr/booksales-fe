import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../_api";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Nama lengkap tidak boleh kosong";
    if (!formData.email) {
      formErrors.email = "Email tidak boleh kosong";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Format email tidak valid";
    }
    if (!formData.username) formErrors.username = "Username tidak boleh kosong";
    if (!formData.password) {
      formErrors.password = "Password tidak boleh kosong";
    } else if (formData.password.length < 8) {
      formErrors.password = "Password minimal 8 karakter";
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
    if (name === "password" && errors.confirmPassword) {
       setErrors({
        ...errors,
        confirmPassword: null,
      });
    }
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          setLoading(true); 
          try {
            const response = await API.post("/register", {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            });
            console.log("Registrasi berhasil:", response.data);
            alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      } catch (error) {
        console.error("Registrasi gagal:", error.response?.data || error.message);

        setErrors({ api: error.response?.data?.message || "Terjadi kesalahan saat registrasi." });
        alert("Registrasi gagal: " + (error.response?.data?.message || "Silakan coba lagi."));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Buat Akun Baru
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} noValidate>
                 {/* Nama Lengkap */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="Nama Lengkap Anda"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* Email */}
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
                    className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="nama@domain.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                   {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                 {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                     className={`bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="Pilih Username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                   {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
                </div>

                {/* Password */}
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
                    className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                </div>

                {/* Konfirmasi Password */}
                 <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className={`bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                   {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>

                {/* API Error */}
                {errors.api && <p className="text-sm text-red-500">{errors.api}</p>}


                <button
                  type="submit"
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Mendaftar...' : 'Buat Akun'}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Sudah punya akun?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Masuk di sini
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
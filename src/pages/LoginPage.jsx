import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const LoginForm = () => {
  const navigate = useNavigate();
  const { session, loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login({ email, password });

    if (result.success) {
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } else {
      setError(result.error); //
    }
  };
  if (loading) return <Loader />;
  if (session) return navigate("/dashboard");
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Login
          </h2>

          {/*Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 block">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-40 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors pt-2"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;

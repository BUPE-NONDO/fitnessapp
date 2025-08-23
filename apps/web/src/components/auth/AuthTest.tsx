import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthTest() {
  const { currentUser, signUp, signIn, signOutUser } = useAuth();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password, "Test User");
      setMessage("Sign up successful!");
    } catch (error) {
      setMessage(`Sign up failed: ${error}`);
      console.error("Sign up error:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      setMessage("Sign in successful!");
    } catch (error) {
      setMessage(`Sign in failed: ${error}`);
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setMessage("Sign out successful!");
    } catch (error) {
      setMessage(`Sign out failed: ${error}`);
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Authentication Test</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Current User: {currentUser ? currentUser.email : "None"}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleSignUp}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
          <button
            onClick={handleSignIn}
            className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign In
          </button>
          <button
            onClick={handleSignOut}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>

        {message && (
          <div className="mt-4 rounded-md bg-gray-100 p-3">
            <p className="text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

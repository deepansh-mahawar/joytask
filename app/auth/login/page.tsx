"use client";
import { useState } from "react";
import { validateEmail, validatePassword } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) return setError("Invalid email");
    if (!validatePassword(password))
      return setError("Password must be 6+ chars");

    login({ email }, remember);
    router.push("/auth/dashboard");
  };

  return (
    <div className="p-6 w-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-500 text-sm m-0">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="cursor-pointer"
          />
          Remember Me
        </label>

        <button
          className="bg-blue-600 text-white p-2 rounded active:scale-95 active:bg-blue-700 transition-all duration-150 cursor-pointer"
        >
          Login
        </button>

        <p>
          dont have an account{" "}
          <Link href="/auth/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

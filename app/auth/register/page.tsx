"use client";
import { useState } from "react";
import { validateEmail, validatePassword } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const { login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) return setError("Name is required");
    if (!validateEmail(email)) return setError("Invalid email");
    if (!validatePassword(password))
      return setError("Password must be 6+ chars");

    login({ name, email }, true);
    router.push("/dashboard");
  };

  return (
    <div className="p-6 w-100">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>

      {error && <p className="text-red-500 text-red-500 text-sm m-0">{error}</p>}

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white p-2 rounded active:scale-95 active:bg-blue-700 transition-all duration-150 cursor-pointer">Register</button>

        <p>
          already have an account{" "}
          <Link href="/auth/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

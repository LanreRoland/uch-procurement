"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/admin");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-uch-green px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Top brand bar */}
          <div className="bg-uch-green px-8 pt-8 pb-6 flex flex-col items-center">
            <Image
              src="/logo.jpg"
              alt="UCH Procurement"
              width={200}
              height={200}
              className="h-16 w-auto"
            />
            <p className="text-white/70 text-xs mt-3 uppercase tracking-widest">
              Staff Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="px-8 py-8 space-y-5">
            <div>
              <h1 className="text-xl font-display font-bold text-gray-900 mb-1">
                Sign in to Admin
              </h1>
              <p className="text-sm text-gray-500">
                Authorised procurement officers only.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-uch-green focus:border-transparent
                           transition"
                placeholder="officer@uch-ibadan.org.ng"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm pr-10
                             focus:outline-none focus:ring-2 focus:ring-uch-green focus:border-transparent
                             transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : <><LogIn size={16} /> Sign In</>}
            </button>
          </form>
        </div>

        <p className="text-center text-white/50 text-xs mt-6">
          UCH Procurement · University College Hospital, Ibadan
        </p>
      </div>
    </div>
  );
}

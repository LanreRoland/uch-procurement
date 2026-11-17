"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { AlertCircle, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { loginAdminAction } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, loading] = useActionState(loginAdminAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-uch-green px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-uch-green px-8 pt-8 pb-6 flex flex-col items-center">
            <Image
              src="/logo.jpg"
              alt="UCH Procurement"
              width={200}
              height={200}
              className="h-16 w-auto"
              priority
            />
            <p className="text-white/70 text-xs mt-3 uppercase tracking-widest">
              Staff Content Portal
            </p>
          </div>

          <form action={formAction} className="px-8 py-8 space-y-5">
            <div>
              <h1 className="text-xl font-display font-bold text-gray-900 mb-1">
                Sign in to Admin
              </h1>
              <p className="text-sm text-gray-500">
                Manage public notices and homepage notifications.
              </p>
            </div>

            {state?.error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{state.error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-uch-green focus:border-transparent transition"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-uch-green focus:border-transparent transition"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/50 text-xs mt-6">
          UCH Procurement - University College Hospital, Ibadan
        </p>
      </div>
    </div>
  );
}

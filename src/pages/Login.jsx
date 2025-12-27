import React, { useState } from "react";
import { ArrowRight, User, Lock, ShieldCheck, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../api/useLogin";

export default function Login() {
  // const [isLoading, setIsLoading] = useState(false);
  const { login, error, isLoading } = useLogin();
  const onSubmit = (data) => {
    //API call
    login(data);
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden font-sans selection:bg-orange-100">
      {/* GRID BACKGROUND 
        Matches the subtle grid seen in the Lokswar hero section 
      */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-lg p-8 md:p-10 bg-white/95 backdrop-blur-md border border-neutral-100 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
        {/* BRANDING TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-8 bg-neutral-900" />
            <span className="text-[10px] font-black tracking-[0.25em] text-neutral-400 uppercase">
              Project <span className="text-orange-500">Lokswar</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <Globe size={14} />
            <span className="text-[9px] font-bold tracking-widest uppercase">
              Global Access
            </span>
          </div>
        </div>

        {/* HEADER SECTION */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-neutral-900 leading-[0.9] tracking-tighter">
            Access the <br />
            <span className="text-orange-600 italic font-serif font-medium tracking-tight">
              Archive
            </span>
          </h1>
          <p className="mt-4 text-neutral-500 max-w-[280px] leading-relaxed font-medium text-sm">
            Please provide your authorized credentials to enter the digital
            repository.
          </p>
        </header>

        {/* FORM SECTION */}
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative group">
            <label className="text-[10px] font-black text-neutral-900 tracking-widest uppercase block mb-1 opacity-40 group-focus-within:opacity-100 transition-opacity">
              Identification / Email
            </label>
            <div className="flex items-center relative">
              <input
                type="email"
                name="email"
                placeholder="archivist@lokswar.org"
                className="w-full pb-3 bg-transparent border-b-2 border-neutral-100 outline-none focus:border-orange-600 transition-all text-lg font-medium placeholder:text-neutral-200"
                required
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <User className="absolute right-0 bottom-3 w-4 h-4 text-neutral-200 group-focus-within:text-orange-500 transition-colors" />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="relative group">
            <label className="text-[10px] font-black text-neutral-900 tracking-widest uppercase block mb-1 opacity-40 group-focus-within:opacity-100 transition-opacity">
              Secure Key / Password
            </label>
            <div className="flex items-center relative">
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••••••"
                className="w-full pb-3 bg-transparent border-b-2 border-neutral-100 outline-none focus:border-orange-600 transition-all text-lg font-medium placeholder:text-neutral-200"
                {...register("password", {
                  required: "password is Required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              <Lock className="absolute right-0 bottom-3 w-4 h-4 text-neutral-200 group-focus-within:text-orange-500 transition-colors" />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          {error && (
            <div className="flex items-center gap-3 rounded-md border border-red-200 bg-orange-100/50 px-2 py-3 text-neutral-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-red-600 flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm font-medium">
                {error.response?.data?.message ||
                  "Login failed. Please check your credentials."}
              </p>
            </div>
          )}
          <div className="pt-2 flex flex-col gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neutral-900 text-white py-5 font-bold text-xs tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Authorize & Enter
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full bg-transparent border border-neutral-100 text-neutral-900 py-5 font-bold text-xs tracking-[0.2em] uppercase hover:bg-neutral-50 hover:border-neutral-200 transition-all flex items-center justify-center gap-2 group"
            >
              No Account? Sign Up
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        {/* FOOTER STATUS BAR */}
        <div className="mt-1 pt-8 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <div className="absolute inset-0 w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-60" />
            </div>
            <span className="text-[10px] font-black text-neutral-900 tracking-widest uppercase">
              System Online
            </span>
          </div>

          <div className="text-[9px] font-bold text-neutral-300 tracking-[0.15em] uppercase text-right leading-relaxed">
            Preserving Voices <br />
            Since 2025
          </div>
        </div>
      </div>

      {/* BACKGROUND LARGE TEXT (DECORATIVE) */}
      <div className="absolute bottom-[-70px] right-12 hidden lg:block opacity-[0.07] rotate-90 origin-right pointer-events-none">
        <span className="text-[140px] font-black text-neutral-900 select-none">
          LOKSWAR
        </span>
      </div>

      {/* MOBILE DECORATION */}
      <div className="absolute top-10 left-10 lg:hidden opacity-5 pointer-events-none">
        <span className="text-6xl font-black text-neutral-900 italic">LS</span>
      </div>
    </div>
  );
}

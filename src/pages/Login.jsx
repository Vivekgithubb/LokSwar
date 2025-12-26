import React, { useState } from "react";
import { ArrowRight, User, Lock, ShieldCheck, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

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
        <form className="space-y-10" onSubmit={handleSubmit}>
          {/* EMAIL INPUT */}
          <div className="relative group">
            <label className="text-[10px] font-black text-neutral-900 tracking-widest uppercase block mb-1 opacity-40 group-focus-within:opacity-100 transition-opacity">
              Identification / Email
            </label>
            <div className="flex items-center relative">
              <input
                type="email"
                name="email"
                required
                placeholder="archivist@lokswar.org"
                className="w-full pb-3 bg-transparent border-b-2 border-neutral-100 outline-none focus:border-orange-600 transition-all text-lg font-medium placeholder:text-neutral-200"
                onChange={handleChange}
              />
              <User className="absolute right-0 bottom-3 w-4 h-4 text-neutral-200 group-focus-within:text-orange-500 transition-colors" />
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
                onChange={handleChange}
              />
              <Lock className="absolute right-0 bottom-3 w-4 h-4 text-neutral-200 group-focus-within:text-orange-500 transition-colors" />
            </div>
            {/* <button
              type="button"
              className="absolute right-0 -bottom-7 text-[10px] font-bold text-neutral-400 hover:text-orange-600 transition-colors uppercase tracking-widest"
            >
              Recover Access?
            </button> */}
          </div>

          {/* ACTIONS */}
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

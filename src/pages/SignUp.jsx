import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  User,
  Lock,
  Globe,
  Zap,
  Camera,
  MapPin,
  ChevronLeft,
  CheckCircle2,
  AtSign,
  Type,
  Map as MapIcon,
  Image as ImageIcon,
  ShieldCheck,
} from "lucide-react";

const InputField = ({
  label,
  icon: Icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="relative group w-full transition-all duration-300 text-left">
    <div className="flex justify-between items-center mb-3">
      <label className="text-[10px] font-black text-neutral-900 tracking-widest uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">
        {label}
      </label>
      {error ? (
        <span className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">
          Required
        </span>
      ) : (
        <Zap
          size={10}
          className="text-neutral-200 group-focus-within:text-orange-400 transition-colors"
        />
      )}
    </div>
    <div className="flex items-center relative">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`w-full pb-3 bg-transparent border-b ${
          error ? "border-red-200" : "border-neutral-200"
        } outline-none focus:border-neutral-900 transition-all text-base sm:text-lg font-medium placeholder:text-neutral-200`}
        onChange={onChange}
      />
      {Icon && (
        <Icon
          className={`absolute right-0 bottom-3 w-4 h-4 ${
            error ? "text-red-300" : "text-neutral-200"
          } group-focus-within:text-neutral-900 transition-colors`}
        />
      )}
    </div>
  </div>
);

const StepIndicator = ({ current, total }) => (
  <div className="absolute top-0 left-0 w-full h-1.5 bg-neutral-100 overflow-hidden">
    <div
      className="h-full bg-orange-600 transition-all duration-1000 ease-out"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

/**
 * MAIN SIGNUP COMPONENT
 */
export default function SignUp() {
  const [step, setStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Data Model following your schema
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
    profilePicture: null,
    bio: "",
    location: {
      city: "",
      state: "",
      country: "India",
      coordinates: [75.7873, 26.9124], // Default coordinates (Jaipur)
    },
  });

  useEffect(() => setIsMounted(true), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["city", "state", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep((s) => s + 1);
    else {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000); // Simulate completion
    }
  };

  const stepsInfo = [
    { title: "Vault", subtitle: "Credential encryption" },
    { title: "Persona", subtitle: "Archivist identification" },
    { title: "Origins", subtitle: "Geospatial indexing" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden font-sans selection:bg-orange-100">
      {/* LUXURY BACKGROUND GRID */}
      <div
        className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)`,
          backgroundSize: "clamp(30px, 4vw, 50px) clamp(30px, 4vw, 50px)",
        }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.9)_100%)]" />

      {/* SIGNUP CARD */}
      <div
        className={`
        relative z-10 w-full max-w-[640px] 
        bg-white/80 backdrop-blur-2xl border border-white
        shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] 
        transition-all duration-1000 ease-out overflow-hidden
        ${isMounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
      `}
      >
        <StepIndicator current={step} total={3} />

        <div className="p-8 sm:p-12 md:p-10">
          {/* HEADER SECTION */}
          <header className="mb-14">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-neutral-900" />
                <span className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase">
                  Sequence 0{step}
                </span>
              </div>
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 hover:text-neutral-900 uppercase tracking-widest transition-colors"
                >
                  <ChevronLeft size={14} /> Previous
                </button>
              )}
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-neutral-900 leading-[0.85] tracking-tighter">
              The Boarding <br />
              <span className="text-orange-600 italic font-serif font-medium tracking-tight relative inline-block">
                {stepsInfo[step - 1].title}
              </span>
            </h1>
            <p className="mt-6 text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em]">
              /// {stepsInfo[step - 1].subtitle}
            </p>
          </header>

          {/* DYNAMIC FORM STEPS */}
          <form onSubmit={handleNext} className="space-y-12">
            {step === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                <InputField
                  label="Registry Email"
                  icon={AtSign}
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="archivist@lokswar.org"
                  onChange={handleChange}
                />
                <InputField
                  label="Access Key / Password"
                  icon={Lock}
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="••••••••••••"
                  onChange={handleChange}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-neutral-50/50 border border-neutral-100">
                  <div className="w-24 h-24 bg-white border border-neutral-200 flex items-center justify-center text-neutral-300 relative group cursor-pointer overflow-hidden">
                    <ImageIcon
                      size={24}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-900 block mb-2">
                      Visual ID / Profile Picture
                    </span>
                    <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-tight leading-relaxed max-w-[200px]">
                      Represent your presence in the global directory.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <InputField
                    label="Legal Name"
                    icon={Type}
                    name="name"
                    value={formData.name}
                    placeholder="Siddharth Sharma"
                    onChange={handleChange}
                  />
                  <InputField
                    label="Public Username"
                    icon={User}
                    name="username"
                    value={formData.username}
                    placeholder="sid_archive"
                    onChange={handleChange}
                  />
                </div>

                <div className="relative group text-left">
                  <label className="text-[10px] font-black text-neutral-900 tracking-widest uppercase opacity-40 mb-3 block">
                    Personal Narrative / Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    maxLength={500}
                    rows={2}
                    placeholder="Briefly describe your connection to Indian heritage..."
                    className="w-full bg-transparent border-b border-neutral-200 outline-none focus:border-neutral-900 transition-all text-base font-medium resize-none pb-2"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[9px] text-neutral-300 font-black uppercase tracking-widest">
                      Digital Signature Required
                    </span>
                    <span className="text-[10px] text-neutral-300 font-bold">
                      {formData.bio.length}/500
                    </span>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="grid grid-cols-2 gap-8">
                  <InputField
                    label="Current City"
                    name="city"
                    value={formData.location.city}
                    placeholder="Jaipur"
                    onChange={handleChange}
                  />
                  <InputField
                    label="State / Region"
                    name="state"
                    value={formData.location.state}
                    placeholder="Rajasthan"
                    onChange={handleChange}
                  />
                </div>
                <InputField
                  label="Origin Country"
                  name="country"
                  value={formData.location.country}
                  placeholder="India"
                  onChange={handleChange}
                />

                <div className="p-6 bg-neutral-900 text-white flex items-start gap-5 relative overflow-hidden group">
                  <div className="p-3 bg-white/10 backdrop-blur-md relative z-10">
                    <MapIcon size={20} className="text-orange-500" />
                  </div>
                  <div className="relative z-10 text-left">
                    <span className="text-[10px] font-black block tracking-[0.2em] uppercase mb-1">
                      Geospatial Tagging
                    </span>
                    <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-tight leading-relaxed">
                      Coordinates: {formData.location.coordinates[1]}° N,{" "}
                      {formData.location.coordinates[0]}° E
                    </p>
                    <p className="mt-2 text-[10px] text-neutral-500 font-medium">
                      Auto-synced for precise archive placement.
                    </p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Globe size={120} />
                  </div>
                </div>
              </div>
            )}

            {/* ACTION BUTTON */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-neutral-900 text-white py-6 font-black text-[11px] tracking-[0.3em] uppercase hover:bg-black transition-all active:scale-[0.99] flex items-center justify-center gap-4 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-4">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {step === 3 ? (
                        <CheckCircle2 size={18} className="text-orange-500" />
                      ) : (
                        <ShieldCheck size={18} />
                      )}
                      {step === 3 ? "Complete Boarding" : "Next Protocol"}
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out opacity-10" />
              </button>
            </div>
          </form>

          {/* FOOTER STATUS */}
          <footer className="mt-2 pt-10 border-t border-neutral-50 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-orange-600 rounded-full animate-ping opacity-40" />
              </div>
              <span className="text-[10px] font-black text-neutral-900 tracking-[0.25em] uppercase">
                Secure Link Established
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-neutral-300 tracking-[0.2em] uppercase">
                /// Archiving Heritage
              </span>
              <div className="h-6 w-[1px] bg-neutral-100" />
              <Globe
                size={14}
                className="text-neutral-300 hover:text-orange-600 transition-colors cursor-pointer"
              />
            </div>
          </footer>
        </div>
      </div>

      {/* LARGE BACKGROUND DECORATION */}
      <div className="absolute bottom-10 right-10 hidden xl:block opacity-[0.03] rotate-90 origin-right pointer-events-none select-none">
        <span className="text-[200px] font-black text-neutral-900 tracking-tighter">
          REGISTER
        </span>
      </div>
    </div>
  );
}

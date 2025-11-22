import MetricCard from "./MetricCard";

export default function MidSection() {
  return (
    <section className="w-full">
      <div className="max-w-auto mx-auto p-0 grid grid-cols-1 md:grid-cols-3 mt-8 border-t border-stone-200">
        <div className="border-r border-stone-100">
          <MetricCard
            icon={
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            }
            value="1,240+"
            label="Dialects Preserved"
          />
        </div>
        <div className="border-r border-stone-100">
          <MetricCard
            icon={
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            }
            value="342"
            label="Villages Mapped"
          />
        </div>
        <div>
          <MetricCard
            icon={
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            }
            value="156"
            label="Active Guardians"
          />
        </div>
      </div>
    </section>
  );
}

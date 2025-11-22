export default function MetricCard({ icon, value, label }) {
  return (
    <div className="flex-1 p-8 text-center">
      <div className="flex items-center justify-center mb-3 text-orange-600">
        {icon}
      </div>
      <div className="text-3xl font-semibold text-neutral-900">{value}</div>
      <div className="mt-2 text-sm text-neutral-600">{label}</div>
    </div>
  );
}

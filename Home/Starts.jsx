import { BookOpen, Users, ClipboardCheck, Clock } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      label: "Books Available",
      value: "3,200+",
      icon: <BookOpen size={32} className="text-indigo-600" />,
    },
    {
      label: "Registered Readers",
      value: "850+",
      icon: <Users size={32} className="text-indigo-600" />,
    },
    {
      label: "Books Borrowed",
      value: "12,000+",
      icon: <ClipboardCheck size={32} className="text-indigo-600" />,
    },
    {
      label: "On-Time Returns",
      value: "92%",
      icon: <Clock size={32} className="text-indigo-600" />,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#F9FAFB] to-white py-20 px-6 text-[#1E2A38]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Book Lab by the Numbers</h2>
        <p className="text-[#4B5563] mb-12 max-w-2xl mx-auto">
          Real impact from real readers. See how Book Lab is powering a reading revolution.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <p className="text-2xl font-semibold text-[#111827]">{stat.value}</p>
              <p className="text-[#6B7280] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

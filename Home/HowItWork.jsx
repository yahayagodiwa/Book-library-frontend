const HowItWorks = () => {
  const steps = [
    {
      title: "1. Register Your Account",
      desc: "Create a free account to access our entire library of books.",
      icon: "📝",
    },
    {
      title: "2. Borrow Your Favorite Books",
      desc: "Browse the library and borrow any book you want to read — instantly.",
      icon: "📚",
    },
    {
      title: "3. Return After Reading",
      desc: "Return the book when you're done so others can enjoy it too.",
      icon: "📦",
    },
    {
      title: "4. Avoid Late Fees",
      desc: "Return on time to avoid a small late return fee. Respect the reading community!",
      icon: "⏰",
    },
  ];

  return (
    <section className="bg-[#F3F4F6] py-5 md:py-20 px-4 text-[#1E2A38]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">How Book Lab Works</h2>
        <p className="text-[#374151] mb-12 max-w-2xl mx-auto">
          A simple system that helps you enjoy reading responsibly. Borrow, enjoy, and return — easy!
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-[#374151] mt-2 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

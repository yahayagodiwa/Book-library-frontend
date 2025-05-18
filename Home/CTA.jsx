import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="bg-[#1E2A38] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FBBF24]">
          Ready to Read Smarter?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-[#F3F4F6]">
          Join Book Lab and unlock access to thousands of books. Borrow, read, return — it’s that simple.
        </p>
        <Link href="/register">
          <button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-[#1E2A38] font-semibold px-6 py-3 rounded-xl shadow transition">
            Get Started Free
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;

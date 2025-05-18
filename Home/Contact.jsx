const Contact = () => {
  return (
    <section className="bg-[#F3F4F6] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1E2A38] mb-4">Need Help?</h2>
        <p className="text-[#4B5563] text-lg mb-10">
          Our support team is here for you. Whether it’s about borrowing, returns, or anything else — we’ve got your back!
        </p>

        <form className="bg-white p-8 rounded-xl shadow-md space-y-6 text-left">
          <div>
            <label className="block text-[#111827] mb-1 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-[#111827] mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-[#111827] mb-1 font-medium">Message</label>
            <textarea
              rows="5"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            className="bg-[#60A5FA] hover:bg-[#3B82F6] text-[#1E2A38] font-semibold px-6 py-3 rounded-xl shadow transition w-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

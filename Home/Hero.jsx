import Image from "next/image";
const Hero = () => {
  return (
    <section className="bg-[#F3F4F6] text-[#1E2A38] py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-5 md:gap-10">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Discover. Review. <span className="text-[#FBBF24]">Transform</span> Your Reading
          </h1>
          <p className="text-lg text-[#374151] mb-6">
            Book Lab is your trusted space to explore books, write reviews, and dive deeper into your favorite reads. Join a community of curious minds.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <a href="#books" className="bg-[#1E2A38] text-white px-6 py-3 rounded-xl hover:bg-[#374151] transition">
              Browse Books
            </a>
            <a href="/" className="border border-[#1E2A38] px-6 py-3 rounded-xl hover:bg-[#1E2A38] hover:text-white transition">
              Join Community
            </a>
          </div>
        </div>

        {/* Image or Illustration */}
        <div className="flex-1">
            <Image
            src="/images/lab.png"
            alt="Book Lab Illustration"
            className="w-full max-w-md mx-auto mt-[-20px]"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

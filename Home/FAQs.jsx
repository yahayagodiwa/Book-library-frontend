"use client"
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I borrow a book?",
    answer: "Once you register, you can browse the catalog and click 'Borrow' on any book you want.",
  },
  {
    question: "What happens if I return a book late?",
    answer: "A small late fee will be added to your account. Make sure to return on time to avoid charges.",
  },
  {
    question: "How long can I keep a book?",
    answer: "You can borrow a book for up to 14 days. You’ll get reminders before the due date.",
  },
  {
    question: "Is it free to join?",
    answer: "Yes! Creating an account is completely free. You only pay if you return a book late.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#F3F4F6] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1E2A38] text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left text-[#111827] font-medium focus:outline-none"
              >
                {faq.question}
                <ChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-[#4B5563]">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

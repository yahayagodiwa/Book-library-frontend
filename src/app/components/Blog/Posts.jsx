const blogPosts = [
  {
    id: 1,
    title: "5 Tips to Get the Most Out of Your Library",
    excerpt:
      "Discover how to make your library visits more productive with these easy tips for students and book lovers.",
    url: "#",
  },
  {
    id: 2,
    title: "Upcoming Book Fair: What to Expect",
    excerpt:
      "Join us next month for the annual book fair featuring local authors, workshops, and book signings.",
    url: "#",
  },
  {
    id: 3,
    title: "How to Choose Your Next Read",
    excerpt:
      "Feeling overwhelmed by choices? Here’s a guide to picking books that match your interests and goals.",
    url: "#",
  },
];

export default function BlogSnippet() {
  return (
    <section className="my-16 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-[#1E2A38]">Library News & Updates</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map(({ id, title, excerpt, url }) => (
          <article key={id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4">{excerpt}</p>
            <a
              href={url}
              className="text-blue-600 hover:text-blue-800 font-semibold"
              aria-label={`Read more about ${title}`}
            >
              Read More &rarr;
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

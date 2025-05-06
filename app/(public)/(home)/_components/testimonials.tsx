import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  message: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Amina Yusuf",
    role: "Computer Science - 300L",
    message:
      "This site has saved me so many times before exams. The materials are always up-to-date and easy to access!",
    image: "/images/test.jpg",
  },
  {
    name: "Emeka Obi",
    role: "Mechanical Engineering - 400L",
    message:
      "I love how I can find notes from past students and share mine too. It’s like a knowledge bank for the whole school.",
    image: "/images/test.jpg",
  },
  {
    name: "Adaeze Nwankwo",
    role: "Law - 200L",
    message:
      "The layout is clean, modern, and fast. I always check the ‘Top Downloads’ before tests.",
    image: "/images/test.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-40 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
          What Students Are Saying
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200"
            >
              <p className="text-gray-700 text-sm mb-4 italic">
                &#34;{t.message}&#34;
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  className="h-12 w-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

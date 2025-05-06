import { FaCheckCircle } from "react-icons/fa";

const features = [
  "No more WhatsApp group scrolls",
  "Materials organized by level and faculty",
  "Fast, secure downloads",
  "Built by students, for students",
  "Easy to search and find exactly what you need",
  "Access materials anytime, anywhere",
  // "User-friendly and simple to navigate",
  // "Collaborate with peers on shared notes",
  // "Stay up-to-date with new uploads",
  // "Safe and anonymous document sharing",
  // "Free to use for all university students",
  // "Get materials directly from trusted sources",
  // "Connect with fellow students through comments",
];

export default function WhyUsePlatform() {
  return (
    <section className="bg-white px-6 py-40 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Why Use This Platform?
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          We’re solving the biggest pain points around finding lecture notes,
          assignments, and past questions.
        </p>

        <ul className="grid gap-6 sm:grid-cols-2 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-primary mt-1" size={20} />
              <span className="text-base text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Image from "next/image";

const steps = [
  {
    title: "Search Your Course",
    description:
      "Find materials by course title, code, or faculty using the powerful search bar.",
    icon: "/images/icons8-search-100.png",
  },
  {
    title: "Preview the Material",
    description:
      "View summaries or sample pages before downloading to ensure it’s what you need.",
    icon: "/images/icons8-document-100.png",
  },
  {
    title: "Download Instantly",
    description:
      "Save PDFs, slides, or images straight to your device — no sign-up required.",
    icon: "/images/icons8-download-100.png",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-32 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          How It Works
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-20">
          Find, preview, and download materials in just a few clicks. It’s fast,
          free, and built for students like you.
        </p>

        <div className="grid gap-12 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="text-4xl mb-4">
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={50}
                  height={50}
                  className="size-16"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

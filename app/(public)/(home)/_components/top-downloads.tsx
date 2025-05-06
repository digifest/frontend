type Material = {
  id: number;
  title: string;
  courseCode: string;
  downloads: number;
  department: string;
};

const topMaterials: Material[] = [
  {
    id: 1,
    title: "Introduction to Algorithms - Lecture Notes",
    courseCode: "CSC246",
    downloads: 2150,
    department: "Computer Science",
  },
  {
    id: 2,
    title: "Engineering Mathematics PDF",
    courseCode: "MTS102",
    downloads: 1740,
    department: "Engineering",
  },
  {
    id: 3,
    title: "Biology 101 - Lecture Slides",
    courseCode: "BIO101",
    downloads: 1425,
    department: "Biological Sciences",
  },
];

export default function TopDownloads() {
  return (
    <section className="bg-gray-50 py-40 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
          Top Downloads This Month
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topMaterials.map((material) => (
            <div
              key={material.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {material.title}
              </h3>
              <p className="text-sm text-gray-500">
                <span className="font-medium">{material.courseCode}</span> ·{" "}
                {material.department}
              </p>
              <p className="mt-4 text-sm text-primary font-medium">
                {material.downloads.toLocaleString()} downloads
              </p>
              <button className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary/80 duration-300 cursor-pointer">
                View & Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

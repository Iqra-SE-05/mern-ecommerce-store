const palette = [
  "from-purple-600 to-pink-500",
  "from-pink-500 to-orange-400",
  "from-orange-400 to-yellow-400",
  "from-teal-500 to-emerald-400",
  "from-blue-500 to-indigo-500",
  "from-fuchsia-500 to-purple-600",
];

function Categories({ categories, active, onSelect }) {
  const list = categories.filter((c) => c !== "All");

  if (list.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-8 pt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {list.map((c, index) => (
          <button
            key={c}
            onClick={() => onSelect(active === c ? "All" : c)}
            className={`rounded-2xl p-5 text-white font-semibold text-center bg-gradient-to-br ${
              palette[index % palette.length]
            } hover:scale-105 transition shadow-md ${
              active === c ? "ring-4 ring-gray-900/20" : ""
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
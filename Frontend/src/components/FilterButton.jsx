const filters = [
  "All",
  "React",
  "Node",
  "MongoDB",
  "Express",
  "JavaScript",
  "CSS",
];

const FilterButtons = () => {
  return (
    <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
      {filters.map((item, index) => (
        <button
          key={item}
          className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition
            ${
              index === 0
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
            }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
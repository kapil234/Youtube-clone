import { useVideo } from "../context/VideoContext";

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
  const { category, setCategory } = useVideo();

  return (
    <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-200 ${
            category === item
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
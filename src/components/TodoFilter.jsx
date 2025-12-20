import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";

const TodoFilter = ({ filter, setFilter }) => {
  const buttonClasses = (currentFilter) =>
    `flex items-center gap-2 px-4 py-2 rounded transition-colors duration-200 cursor-pointer ${
      filter === currentFilter
        ? `bg-blue-500 text-white`
        : `bg-blue-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600`
    }`;

  return (
    <div className="flex flex-row gap-2 mb-4 justify-center">
      <button
        onClick={() => setFilter("all")}
        className={buttonClasses("all")}
        title="Все задачи"
        aria-label="Все задачи"
      >
        <MdOutlineFilterList size={18} />
      </button>
      <button
        onClick={() => setFilter("active")}
        className={buttonClasses("active")}
        title="Не выполненные задачи"
        aria-label="Не выполненные задачи"
      >
        <FaRegCircle size={16} />
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={buttonClasses("completed")}
        title="Выполненные задачи"
        aria-label="Выполненные задачи"
      >
        <FaCheckCircle size={16} />
      </button>
    </div>
  );
};

export default TodoFilter;

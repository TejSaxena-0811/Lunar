import { format } from "date-fns";
import { motion } from "framer-motion";

export default function DayCell({
  day,
  startDate,
  endDate,
  isInRange,
  notes,
  onMouseDown,
  onMouseEnter,
  onClickDay,
}) {
  const isStart =
    startDate && day.toDateString() === startDate.toDateString();

  const isEnd =
    endDate && day.toDateString() === endDate.toDateString();

  const hasNote = notes?.some((note) => {
    const dayTime = day.getTime();
    const start = new Date(note.start).getTime();
    const end = note.end ? new Date(note.end).getTime() : start;

    return dayTime >= start && dayTime <= end;
  });

  return (
    <motion.div
      onMouseDown={() => onMouseDown(day)}
      onMouseEnter={() => onMouseEnter(day)}
      onClick={() => onClickDay(day)} 
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className={`
        relative
        p-3 text-center rounded-lg cursor-pointer select-none
        ${isStart || isEnd ? "bg-blue-500 text-white" : ""}
        ${isInRange ? "bg-blue-200" : ""}
        hover:bg-blue-100
      `}
    >
      {format(day, "d")}

      {hasNote && (
        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
      )}
    </motion.div>
  );
}
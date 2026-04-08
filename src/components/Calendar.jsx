import { useState } from "react";
import { addMonths, subMonths, format } from "date-fns";
import { generateCalendar } from "../utils/dateUtils";
import DayCell from "./DayCell";
import useDateRange from "../hooks/useDateRange";
import useLocalStorage from "../hooks/useLocalStorage";
import NotesPanel from "./NotesPanel";
import { motion, AnimatePresence } from "framer-motion";

export default function Calendar({ currentDate, setCurrentDate }) {
//   const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const days = generateCalendar(currentDate);

  const {
    startDate,
    endDate,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    isInRange,
  } = useDateRange();

  const [notes, setNotes] = useLocalStorage("notes", []);

  const saveNote = (note) => {
    setNotes((prev) => [...prev, note]);
  };

  // seeing notes for a particular day
  const selectedNotes = notes.filter((note) => {
    if (!selectedDay) return false;

    const dayTime = selectedDay.getTime();
    const start = new Date(note.start).getTime();
    const end = note.end ? new Date(note.end).getTime() : start;

    return dayTime >= start && dayTime <= end;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-3xl">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="px-2 py-1 rounded hover:bg-gray-200"
        >
          ◀
        </button>

        <h2 className="text-lg font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>

        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="px-2 py-1 rounded hover:bg-gray-200"
        >
          ▶
        </button>
      </div>

      {/* calendar griid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDate.toISOString()}
          onMouseUp={handleMouseUp}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-7 grid-rows-6 gap-2"
          style={{ willChange: "opacity, transform" }}
        >
          {days.map((day, idx) => (
            <DayCell
              key={idx}
              day={day}
              startDate={startDate}
              endDate={endDate}
              isInRange={isInRange(day)}
              notes={notes}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onClickDay={setSelectedDay}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <NotesPanel
        startDate={startDate}
        endDate={endDate}
        saveNote={saveNote}
      />

      {selectedDay && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl w-full max-w-md">
          <h4 className="font-semibold mb-2">
            Notes for {format(selectedDay, "EEE, MMM d, yyyy")}
          </h4>

          {selectedNotes.length === 0 ? (
            <p className="text-gray-500">No notes</p>
          ) : (
            selectedNotes.map((note, idx) => (
              <div
                key={idx}
                className="mb-2 p-2 bg-white rounded shadow"
              >
                {note.text}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
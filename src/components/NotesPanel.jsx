import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function NotesPanel({ startDate, endDate, saveNote }) {
  const [text, setText] = useState("");

  const handleSave = () => {
    if (!startDate || !text.trim()) return;

    saveNote({
      start: startDate,
      end: endDate,
      text: text.trim(),
    });

    setText("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-md mt-4"
    >
      <h3 className="font-semibold mb-2">Add Note</h3>

      {startDate && (
        <p className="text-sm text-gray-500 mb-2">
          Selected:{" "}
          {format(startDate, "dd MMM")}
          {endDate && ` → ${format(endDate, "dd MMM")}`}
        </p>
      )}

      <textarea
        className="w-full border rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="3"
        placeholder="Write your note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSave}
        disabled={!startDate || !text.trim()}
        className={`
          px-4 py-2 rounded-lg text-white transition-all
          ${
            !startDate || !text.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }
        `}
      >
        Save Note
      </button>
    </motion.div>
  );
}
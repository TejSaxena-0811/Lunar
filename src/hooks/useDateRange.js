import { useState } from "react";
import { isBefore } from "date-fns";

export default function useDateRange() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (date) => {
    setStartDate(date);
    setEndDate(null);
    setIsDragging(true);
  };

  const handleMouseEnter = (date) => {
    if (!isDragging || !startDate) return;

    if (isBefore(date, startDate)) {
      setEndDate(startDate);
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  return {
    startDate,
    endDate,
    isDragging,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    isInRange,
  };
}
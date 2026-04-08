import { useState } from "react";
import Calendar from "./components/Calendar";

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // different image for every month
  const images = {
    January: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    February: "https://images.unsplash.com/photo-1457269449834-928af64c684d",
    March: "https://images.unsplash.com/photo-1490750967868-88aa4486c946",
    April: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    May: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    June: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    July: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    August: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    September: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    October: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    November: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    December: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
  };

  const month = currentDate.toLocaleString("default", { month: "long" });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row p-4 gap-4">
      
      <div className="md:w-1/2 h-64 md:h-[800px] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={images[month]}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
          alt="calendar visual"
        />
      </div>

      <div className="md:w-1/2 flex flex-col items-center justify-center">
        <Calendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </div>
    </div>
  );
}
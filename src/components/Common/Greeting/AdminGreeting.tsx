import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "tailwindcss/tailwind.css";

const Greeting: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const currentDateTime = new Date();
      const formattedTime = format(currentDateTime, "hh:mm a");
      setCurrentTime(formattedTime);

      const hour = currentDateTime.getHours();
      setGreeting(getGreeting(hour));
    };

    const getGreeting = (hour: number) => {
      if (hour >= 5 && hour < 12) {
        return "Good Morning";
      } else if (hour >= 12 && hour < 17) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000 * 60); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-blue-50 p-4 rounded-md ml-60 w-full  shadow-md">
      <p className="text-6xl font-semibold text-blue-900">Welcome, Admin !</p>
      <p className="text-4xl mt-4 "></p>
      <p className="text-4xl mb-4">{greeting}</p>
      <p className="text-sm">{currentTime}</p>

      <p className="text-sm">{format(new Date(), "EEEE, MMMM do, yyyy")} </p>
    </div>
  );
};

export default Greeting;

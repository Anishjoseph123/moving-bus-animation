import React, { useState } from "react";
import { BsSpeedometer } from "react-icons/bs";
import { FaRegSnowflake, FaRegStopCircle, FaTrafficLight } from "react-icons/fa";
import { IoMdRainy } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { WiDayCloudy } from "react-icons/wi";
const BusMovement = () => {
  const [speed, setSpeed] = useState(8); // lower = faster
  const [running, setRunning] = useState(true);
  const [light, setLight] = useState("green");
  const [isNight, setIsNight] = useState(false);
  const [weather, setWeather] = useState("sunny");

  const handleAccelerate = () => {
    setRunning(true);
    setSpeed((prev) => Math.max(2, prev - 1));
  };

  const handleBrake = () => {
    setSpeed((prev) => {
      const newSpeed = prev + 1;
      if (newSpeed > 15) setRunning(false);
      return newSpeed;
    });
  };
  const toggleLight = () => {
    setLight((prev) =>
      prev === "green" ? "red" : prev === "red" ? "yellow" : "green",
    );
  };

  return (
    <>
      <div
        className={`relative w-full h-full overflow-hidden ${
          weather === "snow"
            ? "bg-gray-300"
            : isNight
              ? "bg-gray-900"
              : "bg-blue-100"
        }`}
      >
        {isNight ? (
          <div className="absolute top-10 right-10 w-10 h-10 bg-yellow-200 rounded-full"></div>
        ) : (
          <div className="absolute top-10 right-10 w-12 h-12 bg-yellow-400 rounded-full"></div>
        )}
        {weather === "rain" && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="absolute w-[2px] h-6 bg-blue-400 opacity-70 animate-rain"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random()}s`,
                }}
              ></div>
            ))}
          </div>
        )}
        {weather === "snow" && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-snow"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              ></div>
            ))}
          </div>
        )}
        {/* ☁️ Clouds */}
        <div className="absolute top-10 left-0 w-20 h-10 bg-white rounded-full opacity-80 animate-cloudMove"></div>
        <div className="absolute top-20 left-40 w-24 h-12 bg-white rounded-full opacity-80 animate-cloudMove"></div>

        {/* 🏢 Buildings */}
        <div className="absolute bottom-16 left-0 flex gap-4">
          <div className="w-16 h-24 bg-gray-500"></div>
          <div className="w-20 h-32 bg-gray-600"></div>
          <div className="w-12 h-20 bg-gray-400"></div>
        </div>
        {/* Road */}
        <div className="absolute bottom-0 w-full h-16 bg-gray-700"></div>

        <div className="absolute right-10 bottom-20 flex flex-col gap-2 bg-black p-2 rounded">
          <div
            className={`w-4 h-4 rounded-full ${light === "red" ? "bg-red-500" : "bg-gray-500"}`}
          ></div>
          <div
            className={`w-4 h-4 rounded-full ${light === "yellow" ? "bg-yellow-400" : "bg-gray-500"}`}
          ></div>
          <div
            className={`w-4 h-4 rounded-full ${light === "green" ? "bg-green-500" : "bg-gray-500"}`}
          ></div>
        </div>
        <button
          onClick={toggleLight}
          className="flex items-center justify-center mt-2 ml-2 bg-[#0c3c60] rounded-xl h-[35px] w-[150px] text-white"
        >
          <FaTrafficLight /> Change Signal
        </button>

        {/* Bus */}
        <div
          className="absolute bottom-16 animate-busMove flex items-center"
          style={{
            animation:
              running && light !== "red"
                ? `busMove ${speed}s linear infinite`
                : "none",
          }}
        >
          <div className="absolute top-0 left-2 w-36 h-2 bg-white rounded-full opacity-70"></div>
          {/* Bus Body */}
          <div className="w-40 h-16 bg-yellow-400 rounded-md flex relative shadow-lg animate-bounceSlow">
            {/* Windows */}

            <div className="flex gap-1 p-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 bg-blue-300 rounded-sm flex items-end justify-center overflow-hidden"
                >
                  {/* Head */}
                  <div className="w-3 h-3 bg-pink-300 rounded-full animate-passengerBounce"></div>
                </div>
              ))}
            </div>

            {/* Front */}
            <div className="absolute right-0 top-2 w-6 h-10 bg-blue-100 rounded-r-md"></div>
          </div>

          {/* Wheels */}
          {/* <div className="absolute -bottom-3 left-4 w-6 h-6 bg-black rounded-full"></div>
          <div className="absolute -bottom-3 right-4 w-6 h-6 bg-black rounded-full"></div> */}
          <div className="absolute -bottom-3 left-4 w-6 h-6 bg-black rounded-full animate-wheelSpin"></div>
          <div className="absolute -bottom-3 right-4 w-6 h-6 bg-black rounded-full animate-wheelSpin"></div>
        </div>
        {running && (
          <div className="absolute left-[-20px] bottom-6 flex flex-col gap-1">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-smoke"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-smoke delay-200"></div>
          </div>
        )}
        <div className="flex justify-evenly items-center">
          <button
            onClick={handleAccelerate}
            className="flex items-center justify-center mt-2 bg-[#0c3c60] rounded-xl h-[35px] w-[150px] text-white"
          >
            <BsSpeedometer /> Accelerate
          </button>
          <button
            onClick={handleBrake}
            className="flex items-center justify-center bg-[#0c3c60] rounded-xl h-[35px] w-[150px] text-white"
          >
            <FaRegStopCircle />Brake
          </button>
          <button
            onClick={() => setIsNight(!isNight)}
            className="flex items-center justify-center bg-[#0c3c60] rounded-xl h-[35px] w-[150px] text-white"
          >
            <WiDayCloudy /> Toggle Day/Night
          </button>
          <button
            onClick={() => setWeather("sunny")}
            className="flex items-center justify-center bg-[#0c3c60] rounded-xl h-[35px] w-[150px] text-white"
          >
            <IoSunnyOutline /> Sunny
          </button>
          <button
            onClick={() => setWeather("rain")}
            className="flex items-center justify-center bg-[#0c3c60] rounded-xl h-[35px] w-[150px] text-white"
          >
            <IoMdRainy /> Rain
          </button>
          <button
            onClick={() => setWeather("snow")}
            className="flex items-center justify-center bg-[#0c3c60] rounded-xl h-[35px] w-[150px] text-white"
          >
            <FaRegSnowflake /> Snow
          </button>
        </div>
      </div>
    </>
  );
};
export default BusMovement;

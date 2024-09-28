"use client";
/*useState =react function store data or value
useRef =helping making a reference
useEffect = repeat work
changeEvent=change in input field through event*/

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown(){
    const[duration, setDuration] =useState <number |string>("");
    const[timeLeft, setTimeLeft] =useState <number >(0);
    const[isActive, setIsActive]=useState <boolean >(false);
    const[isPause, setIsPause]=useState <boolean >(false);
    const timerRef =useRef<NodeJS.Timeout |null>(null);

    const handleSetDuration=():void =>{
        if(typeof duration ==="number" && duration >0){
            setTimeLeft(duration);
            setIsActive(false)
            setIsPause(false)
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    };

    const handleStart=():void =>{
        if(timeLeft > 0){
        setIsActive(true);
        setIsPause(false);
    }
};
const handlePause =():void =>{
    if(isActive){
        setIsPause(true);
        setIsActive(false)
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    }
};
const handleReset =():void=>{
    setIsActive(false);
    setIsPause(false);
    setTimeLeft(typeof duration ==="number"? duration:0)
    if(timerRef.current){
        clearInterval(timerRef.current)
    }
};
useEffect(()=>{
    if(isActive && !isPause){
        timerRef.current =setInterval(()=>{
            setTimeLeft((prevTime) =>{
                if(prevTime <=1){
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prevTime -1;
            })
        },1000);
    }
    return ()=>{
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    };
},[isActive, isPause]);

const formatTime =(time: number):string =>{
    const  minutes =Math.floor(time/60);
    const seconds =time % 60;
    return`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`
};
const handleDurationChange =(e: ChangeEvent<HTMLInputElement>):void=>{
    setDuration(Number(e.target.value) || "");
};
return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-black to-gray-900 relative">
      {/* Logo */}
      <img
        src="https://i.pinimg.com/564x/cf/8a/70/cf8a70264efe1c12522359db0501c99f.jpg"
        alt="logo"
        className="absolute top-10 right-4 h-30 w-40"
      />

      {/* Input field for time */}
      <div className="flex items-center justify-center mb-6">
        <input
          type="number"
          className="border-2 border-gray-400 bg-transparent p-3 text-sky-400 text-xl rounded"
          placeholder="Enter Time In Seconds"
          value={timeLeft > 0 ? timeLeft : ""}
          onChange={(e) => setTimeLeft(Number(e.target.value))}
        />
      </div>

      {/* Display remaining time */}
      <div className="text-3xl font-semibold uppercase mb-6 text-white">
      {/* {timeLeft > 0 ? timeLeft : 0} Seconds remaining */}
      {timeLeft > 0 ? formatTime(timeLeft) : "00:00"} Seconds remaining
      </div>

      {/* Buttons */}
      <div className="flex space-x-6">
        <button
          onClick={handleStart}
          className="text-white px-8 py-4 rounded-lg font-normal bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
        >
          Start
        </button>

        <button
          onClick={handlePause}
          className="text-white px-8 py-4 rounded-lg font-normal bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
        >
          Pause
        </button>

        <button
          onClick={handleReset}
          className="text-white px-8 py-4 rounded-lg font-normal bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};


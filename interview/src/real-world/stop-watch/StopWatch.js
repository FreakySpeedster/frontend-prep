function timer(inputTimeInSecs) {
    let newTime = inputTimeInSecs;
    let timerRun = setInterval(() => {
        newTime--;
        console.log(newTime);
        if (newTime === 0) {
            clearInterval(timerRun);
        }
    }, 1000);
}
// timer(10);

import { useState, useEffect } from "react";

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const startStopwatch = () => setIsRunning(true);
    const stopStopwatch = () => setIsRunning(false);
    const resetStopwatch = () => {
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Stopwatch</h1>
            <h2>{time} sec</h2>
            <button onClick={startStopwatch}>Start</button>
            <button onClick={stopStopwatch}>Stop</button>
            <button onClick={resetStopwatch}>Reset</button>
        </div>
    );
}

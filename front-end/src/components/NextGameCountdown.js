import { useState} from "react";
import React from "react";
import {Link} from "react-router-dom"

function NextGameCountdown() {
    const [countdown, setCountdown] = useState(null);
    let nextDay = new Date();
    nextDay.setHours(24, 0, 0, 0);
    const midnight = nextDay.getTime();
    let currentTime = new Date().getTime();

    const countdownTimer = setInterval( () => {
        setCountdown(midnight - currentTime)
        clearInterval(countdownTimer)
    }, 1000)

    if (countdown === null) return (
    <>
        <h5>Next SpeedTriv</h5>
        <h6>Hours: </h6>
        <h6>Minutes: </h6>
        <h6>Seconds: </h6>
    </>
    );

    return(
        <>
            {countdown >  0 ? (
            <>
                <h5>Next SpeedTriv</h5>
                <h6>Hours: {Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}</h6>
                <h6>Minutes: {Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60))}</h6>
                <h6>Seconds: {Math.floor((countdown % (1000 * 60)) / 1000)}</h6>
            </>
            ) :
            <>
                <h5>Next SpeedTriv</h5>
                <Link to="/">Play next game!</Link>
            </>
        }
        </>
    )

}
export default NextGameCountdown;
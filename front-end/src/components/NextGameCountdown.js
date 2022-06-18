import { useState} from "react";
import React from "react";

function NextGameCountdown() {
    const [timeDifferenceHour, setTimeDifferenceHour] = useState("");
    const [timeDifferenceMinute, setTimeDifferenceMinute] = useState("");
    const [timeDifferenceSecond, setTimeDifferenceSecond] = useState("");
    let nextDay = new Date();
    nextDay.setHours(24, 0, 0, 0);
    const midnight = nextDay.getTime() / 1000;
    let currentTime = new Date().getTime() / 1000;

    const countdown = setInterval( () => {
        let timeDifferenceMS = midnight - currentTime;
        setTimeDifferenceHour(Math.floor(timeDifferenceMS / 3600));
        timeDifferenceMS = timeDifferenceMS - timeDifferenceHour * 3600;
        setTimeDifferenceMinute(Math.floor(timeDifferenceMS / 60));
        timeDifferenceMS = timeDifferenceMS - timeDifferenceMinute * 60;
        setTimeDifferenceSecond(Math.floor(timeDifferenceMS));
        clearInterval(countdown);
    }, 1000)

    return(
        <>
            <h5>Next SpeedTriv</h5>
            <h6>Hours: {timeDifferenceHour}</h6>
            <h6>Minutes: {timeDifferenceMinute}</h6>
            <h6>Seconds: {timeDifferenceSecond}</h6>
        </>
    )

}

export default NextGameCountdown;
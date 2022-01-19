import { useState, useEffect } from "react";

const calculateTimeLeft = (date) => {
  let difference = +new Date(date) - +new Date();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      dni: Math.floor(difference / (1000 * 60 * 60 * 24)),
      godzin: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minut: Math.floor((difference / 1000 / 60) % 60),
      sekund: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const CountdownTimer = (props) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(props.date));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} style={{ color: "red" }}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      <h2>Pozostały czas</h2>
      {timerComponents.length ? timerComponents : <span>Czas</span>}
    </div>
  );
};

export default CountdownTimer;

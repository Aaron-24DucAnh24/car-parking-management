import axios from "axios";
import { useEffect } from "react";

import style from "../App.module.scss";

export default function CurrentStatusBlock({ carNumbers, setCarNumbers }) {
  useEffect(() => {
    const preSetCarNumbers = async () => {
      const response = await axios.get("http://localhost:3001/current-state");
      setCarNumbers(response.data.message);
    };

    preSetCarNumbers();
  }, []);

  return (
    <div className={style.section}>
      <div className={style.realtimeStatusContainer}>
        <div>
          <p>Four-seater car: </p>
          <p className={style.number}>{carNumbers.fourSeaterNo}</p>
        </div>
        <div>
          <p>Seven-seater car: </p>
          <p className={style.number}>{carNumbers.sevenSeaterNo}</p>
        </div>
        <div>
          <p>Truck: </p>
          <p className={style.number}>{carNumbers.truckNo}</p>
        </div>
      </div>
    </div>
  );
}

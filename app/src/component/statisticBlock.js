import axios from "axios";
import { ButtonGroup, Button } from "@mui/material";
import { useState } from "react";
import style from "../App.module.scss";

export default function StatisticBlock() {
  const [ message, setMessage ] = useState("");

  const handleOnClick = async (action) => {
    const url = "http://localhost:3001/" + action;
    const res = await axios.get(url);
    setMessage(JSON.stringify(res.data.message));
  };

  return (
    <div className={style.section}>
      <p className={style.sectionTitle}>Statistic</p>

      <p className={style.textPlace}>{message}</p>

      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button variant="contained" onClick={() => handleOnClick("today")}>
          Today
        </Button>
        <Button variant="contained" onClick={() => handleOnClick("this-month")}>
          This month
        </Button>
        <Button variant="contained" onClick={() => handleOnClick("this-year")}>
          This year
        </Button>
      </ButtonGroup>
    </div>
  );
}

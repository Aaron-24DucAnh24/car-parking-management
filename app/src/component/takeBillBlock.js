import axios from "axios";
import { useState } from "react";
import { ButtonGroup, Button, Collapse, Alert } from "@mui/material";

import style from "../App.module.scss";

export default function TakeBillBlock({ carNumbers, setCarNumbers }) {
  const [disabledFind, setDisabledFind] = useState(true);
  const [disabledTake, setDisabledTake] = useState(true);
  const [disabledHide, setDisabledHide] = useState(true);
  const [number, setNumber] = useState("");
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [enabledMessage, setEnabledMessage] = useState(false);

  const handleNumberInput = (e) => {
    let value = e.target.value;
    setNumber(value);
    if (value) setDisabledFind(false);
    else setDisabledFind(true);

    setWarning(false);
    setSuccess(false);
    setDisabledTake(true);
    setEnabledMessage(false);
  };

  const updateCarNumbers = (type) => {
    let newCarNumbers = Object.assign({}, carNumbers);
    newCarNumbers[type + "No"] = newCarNumbers[type + "No"] - 1;
    setCarNumbers(newCarNumbers);
  };

  const handleFindCar = async (action) => {
    const prefix = "http://localhost:3001/find-car/";
    const res = await axios.get(prefix + number);
    if (res.data.error) {
      setWarning(true);
    } else {
      setMessage(res.data.message);
      setDisabledTake(false);
      setDisabledHide(false);
      setEnabledMessage(true);
    }
  };

  const handleTakeBill = async () => {
    const prefix = "http://localhost:3001/take-bill/";
    const res = await axios.get(prefix + number);
    setSuccess(true);
    setNumber("");
    setMessage("");
    setDisabledFind(true);
    setDisabledTake(true);
    updateCarNumbers(res.data.message.type);
    setEnabledMessage(false);
  };

  const optionsToString = (options) => {
    if (options) {
      let optionNames = options.map((opt) => {
        if (opt.name === "washing") return " washing";
        if (opt.name === "wheelChecking") return " wheel checking";
        return " oil changing";
      });
      return optionNames.toString();
    }
    return "";
  };

  const typeToString = (type) => {
    if (type === "sevenSeater") return "SEVEN-SEATER CAR";
    if (type === "fourSeater") return "FOUR-SEATER CAR";
    return "TRUCK";
  };

  return (
    <div className={style.section}>
      <p className={style.sectionTitle}>Find car & Take bill</p>

      <div className={style.inputContainer}>
        <label>License Number</label>
        <input
          type="text"
          placeholder="License number"
          value={number}
          onChange={(e) => handleNumberInput(e)}
        />
      </div>

      <Collapse in={enabledMessage}>
        <div className={style.textPlace}>
          <div className={style.row}>
            License number:{" "}
            <span className={style.value}>{message.number}</span>
          </div>
          <div className={style.row}>
            Type:{" "}
            <span className={style.value}>{typeToString(message.type)}</span>
          </div>
          <div className={style.row}>
            In-time:{" "}
            <span className={style.value}>
              {new Date(message.inTime).toUTCString()}
            </span>
          </div>
          <div className={style.row}>
            Number of parking days:{" "}
            <span className={style.value}>{message.dayNumber}</span>
          </div>
          <div className={style.row}>
            Options:{" "}
            <span className={style.value}>
              {optionsToString(message.options)}
            </span>
          </div>
          <div className={style.row}>
            Total fee: <span className={style.value}>{message.totalFee}$</span>
          </div>
        </div>
      </Collapse>

      <Collapse in={warning}>
        <Alert
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setWarning(false)}
            >
              x
            </Button>
          }
        >
          <strong>Car not found</strong>, check license number again
        </Alert>
      </Collapse>

      <Collapse in={success}>
        <Alert
          severity="success"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setSuccess(false)}
            >
              x
            </Button>
          }
        >
          Take bill successfully, the car is setted to be out
        </Alert>
      </Collapse>

      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          variant="contained"
          disabled={disabledFind}
          onClick={handleFindCar}
        >
          Find car
        </Button>
        <Button
          variant="contained"
          disabled={disabledTake}
          onClick={handleTakeBill}
        >
          Take bill
        </Button>
        <Button
          variant="outlined"
          disabled={disabledHide}
          onClick={() => {
            setEnabledMessage(false);
            setDisabledHide(true);
          }}
        >
          Hide
        </Button>
      </ButtonGroup>
    </div>
  );
}

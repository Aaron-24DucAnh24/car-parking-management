import axios from "axios";
import { Button, Alert, Collapse } from "@mui/material";
import { useState, useRef } from "react";
import style from "../App.module.scss";

export default function AddBlock({ carNumbers, setCarNumbers }) {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("fourSeater");
  const [options, setOptions] = useState([]);
  const [disabledAdd, setDisabledAdd] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const checkboxesRef = useRef([]);

  const handleOptionCheckbox = (event) => {
    if (event.target.checked)
      setOptions((options) => [...options, { name: event.target.value }]);
    else {
      let newOptions = [...options];
      for (let index in newOptions) {
        if (newOptions[index].name === event.target.value)
          newOptions.splice(index, 1);
      }
      setOptions(newOptions);
    }
  };

  const handleNumberInput = (event) => {
    let value = event.target.value;
    setNumber(value);
    setError(false);
    setSuccess(false);
    if (!/[^a-zA-Z0-9\-]/i.test(value)) {
      setDisabledAdd(value === "");
      setWarning(false);
    } else {
      setWarning(true);
      setDisabledAdd(true);
    }
  };

  const updateCarNumbers = () => {
    let newCarNumbers = Object.assign({}, carNumbers);
    newCarNumbers[type + "No"] = newCarNumbers[type + "No"] + 1;
    setCarNumbers(newCarNumbers);
  };

  const handleAddCar = async () => {
    let res = await axios.post("http://localhost:3001/add-car", {
      number,
      type,
      options,
    });

    if (res.data.error) {
      setError(true);
      setSuccess(false);
    } else {
      updateCarNumbers();
      setSuccess(true);
      setError(false);
      setNumber("");
      checkboxesRef.current.forEach((v) => {
        v.checked = false;
      });
    }
  };

  return (
    <div className={style.section}>
      <p className={style.sectionTitle}>Add car</p>

      <div className={style.inputContainer}>
        <label html>License Number</label>
        <input
          type="text"
          placeholder="License number"
          value={number}
          onChange={(e) => handleNumberInput(e)}
          maxLength={15}
        />
      </div>

      <div className={style.inputContainer}>
        <label>Type of car</label>
        <select onChange={(e) => setType(e.target.value)}>
          <option value="fourSeater" selected>
            4-seater car
          </option>
          <option value="sevenSeater">7-seater car</option>
          <option value="truck">Truck</option>
        </select>
      </div>

      <div className={style.inputContainer}>
        <label>Options</label>
        <div className={style.checkboxContainer}>
          <p>Washing</p>
          <input
            type="checkbox"
            ref={(e) => {
              checkboxesRef.current[0] = e;
            }}
            value="washing"
            onClick={(e) => handleOptionCheckbox(e)}
          />
        </div>
        <div className={style.checkboxContainer}>
          <p>Oil changing</p>
          <input
            type="checkbox"
            ref={(e) => {
              checkboxesRef.current[1] = e;
            }}
            value="oilChanging"
            onClick={(e) => handleOptionCheckbox(e)}
          />
        </div>
        <div className={style.checkboxContainer}>
          <p>Wheels checking</p>
          <input
            type="checkbox"
            ref={(e) => {
              checkboxesRef.current[2] = e;
            }}
            value="wheelChecking"
            onClick={(e) => handleOptionCheckbox(e)}
          />
        </div>
      </div>

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
          Add car successfully
        </Alert>
      </Collapse>

      <Collapse in={error}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setError(false)}
            >
              x
            </Button>
          }
        >
          The car is already in packing place
        </Alert>
      </Collapse>

      <Collapse in={warning}>
        <Alert severity="warning">
          {"License contains only"}{" "}
          <strong>{" numbers, alphabets and dash (–)"}</strong>
        </Alert>
      </Collapse>

      <Button variant="contained" onClick={handleAddCar} disabled={disabledAdd}>
        Add car
      </Button>
    </div>
  );
}

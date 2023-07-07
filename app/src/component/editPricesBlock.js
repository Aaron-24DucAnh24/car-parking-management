import axios from "axios";
import { Button, Collapse, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import style from "../App.module.scss";

export default function EditPricesBlock() {
  const [disable, setDisable] = useState(true);
  const [fees, setFees] = useState({});
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleSubmit = async () => {
    let payload = {};
    for (let attr in fees) payload[attr] = parseFloat(fees[attr]);
    await axios.put("http://localhost:3001/edit-fees", payload);
    console.log(payload, fees);
    setSuccess(true);
    setDisable(true);
  };

  const setInputValue = (name, event) => {
    let newFees = Object.assign({}, fees);
    newFees[name] = event.target.value;
    setFees(newFees);
  };

  const checkValidInput = (input) => {
    if (!input || !parseFloat(input) || isNaN(input)) {
      setWarning(true);
      setDisable(true);
    } else {
      setWarning(false);
      setDisable(false);
    }
  };

  useEffect(() => {
    const getFees = async () => {
      const res = await axios.get("http://localhost:3001/get-fees");
      setFees((pre) => Object.assign(pre, res.data.message));
    };

    getFees();
  }, []);

  return (
    <div className={style.section}>
      <p className={style.sectionTitle}>Edit prices ($)</p>

      <div className={style.inputContainer}>
        <label>Truck</label>
        <input
          type="text"
          value={fees.truck}
          onChange={(e) => {
            checkValidInput(e.target.value);
            setInputValue("truck", e);
          }}
        ></input>
      </div>
      <div className={style.inputContainer}>
        <label>4-seater car</label>
        <input
          type="text"
          value={fees.fourSeater}
          onChange={(e) => {
            checkValidInput(e.target.value);
            setInputValue("fourSeater", e);
          }}
        ></input>
      </div>
      <div className={style.inputContainer}>
        <label>7-seater car</label>
        <input
          type="text"
          value={fees.sevenSeater}
          onChange={(e) => {
            checkValidInput(e.target.value);
            setInputValue("sevenSeater", e);
          }}
        ></input>
      </div>
      <div className={style.inputContainer}>
        <label>Oil changing</label>
        <input
          type="text"
          value={fees.oilChanging}
          onChange={(e) => {
            checkValidInput(e.target.value);
            setInputValue("oilChanging", e);
          }}
        ></input>
      </div>
      <div className={style.inputContainer}>
        <label>Washing</label>
        <input
          type="text"
          value={fees.washing}
          onChange={(e) => {
            setInputValue("washing", e);
            checkValidInput(e.target.value);
          }}
        ></input>
      </div>
      <div className={style.inputContainer}>
        <label>Wheel checking</label>
        <input
          type="text"
          value={fees.wheelChecking}
          onChange={(e) => {
            setInputValue("wheelChecking", e);
            checkValidInput(e.target.value);
          }}
        ></input>
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
          Edit fees successfully
        </Alert>
      </Collapse>

      <Collapse in={warning}>
        <Alert severity="warning">
          <strong>Invalid input</strong>, fees must be a non-zero number
        </Alert>
      </Collapse>

      <Button variant="contained" disabled={disable} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

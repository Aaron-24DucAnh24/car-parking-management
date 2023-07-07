import axios from "axios";
import {
  ButtonGroup,
  Button,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import style from "../App.module.scss";

export default function StatisticBlock() {
  const [message, setMessage] = useState(null);
  const [enableTable, setEnableTable] = useState(false);
  const [disableHideBtn, setDisableHideBtn] = useState(true);

  const handleOnClick = async (action) => {
    const url = "http://localhost:3001/" + action;
    const res = await axios.get(url);
    setMessage(res.data.message);
    setDisableHideBtn(false);
    setEnableTable(true);
  };

  return (
    <div className={style.section}>
      <p className={style.sectionTitle}>Statistic</p>

      <Collapse in={enableTable}>
        {message ? (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">{"      "}</TableCell>
                  <TableCell align="center">Truck</TableCell>
                  <TableCell align="center">7-seater car</TableCell>
                  <TableCell align="center">4-seater car</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">Come/Leave</TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#249862", fontWeight: 600 }}
                  >
                    {message.car.come.truckIn}/{message.car.go.truckOut}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#249862", fontWeight: 600 }}
                  >
                    {message.car.come.sevenIn}/{message.car.go.sevenOut}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#249862", fontWeight: 600 }}
                  >
                    {message.car.come.fourIn}/{message.car.go.fourOut}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#249862", fontWeight: 600 }}
                  >
                    {message.car.come.totalIn}/{message.car.go.totalOut}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">{"      "}</TableCell>
                  <TableCell align="center">Washing</TableCell>
                  <TableCell align="center">Wheel checking</TableCell>
                  <TableCell align="center">Oil Changing</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">Registered/Paid</TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#249862", fontWeight: 600 }}
                  >
                    {message.option.come.washingIn}/
                    {message.option.go.washingOut}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#249862", fontWeight: 600 }}
                  >
                    {message.option.come.oilChangingIn}/
                    {message.option.go.oilChangingOut}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#249862", fontWeight: 600 }}
                  >
                    {message.option.come.wheelCheckingIn}/
                    {message.option.go.wheelCheckingOut}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#249862", fontWeight: 600 }}
                  >
                    {message.option.come.total}/{message.option.go.total}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: 600,
                      color: "#2d7bec",
                      fontSize: "18px",
                    }}
                  >
                    Revenue: {message.car.revenue}$
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        ) : (
          <></>
        )}
      </Collapse>

      <ButtonGroup
        style={{ marginTop: "12px" }}
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
        <Button
          variant="outlined"
          disabled={disableHideBtn}
          onClick={() => {
            setEnableTable(false);
            setDisableHideBtn(true);
          }}
        >
          Hide table
        </Button>
      </ButtonGroup>
    </div>
  );
}

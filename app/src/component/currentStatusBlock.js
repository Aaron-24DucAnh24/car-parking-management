import axios from "axios";
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
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
      <p className={style.sectionTitle}>Current number of cars</p>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{ fontWeight: 500,fontSize: "18px" }}
              >
                Truck
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: 500, fontSize: "18px" }}
              >
                7-seater
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: 500, fontSize: "18px" }}
              >
                4-seater
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                align="center"
                style={{ color: "#2d7bec", fontWeight: 600, fontSize: "20px" }}
              >
                {carNumbers.truckNo}
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "#2d7bec", fontWeight: 600, fontSize: "20px" }}
              >
                {carNumbers.sevenSeaterNo}
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "#2d7bec", fontWeight: 600, fontSize: "20px" }}
              >
                {carNumbers.fourSeaterNo}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

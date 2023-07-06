import { FaCopyright } from "react-icons/fa";
import { useState } from "react";

import CurrentStatusBlock from "./component/currentStatusBlock";
import AddBlock from "./component/addBLock";
import TakeBillBlock from "./component/takeBillBlock";
import EditPricesBlock from "./component/editPricesBlock";
import StatisticBlock from "./component/statisticBlock";
import style from "./App.module.scss";

function App() {
  const [carNumbers, setCarNumbers] = useState({
    fourSeaterNo: 0,
    sevenSeaterNo: 0,
    truckNo: 0,
  });

  return (
    <div className={style.App}>
      <header>
        <a href="/">{"Car Parking Management Page"}</a>
      </header>

      <div className={style.body}>
        <CurrentStatusBlock
          carNumbers={carNumbers}
          setCarNumbers={setCarNumbers}
        />
        <AddBlock 
          carNumbers={carNumbers} 
          setCarNumbers={setCarNumbers} 
        />
        <TakeBillBlock 
          carNumbers={carNumbers} 
          setCarNumbers={setCarNumbers} 
        />
        <StatisticBlock />
        <EditPricesBlock />
      </div>

      <footer>
        <FaCopyright />
        <p>{" Đức Anh Bùi. All Rights Reserved."}</p>
      </footer>
    </div>
  );
}

export default App;

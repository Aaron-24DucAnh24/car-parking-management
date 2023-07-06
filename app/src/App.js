import axios from "axios";
import clsx from "clsx";
import { FaCopyright } from "react-icons/fa";
import style from "./App.module.scss";

function App() {
  return (
    <div className={style.App}>
      <header>
        <a href="/">Car Parking Management Page</a>
      </header>

      <div className={style.body}>

        <div className={style.section}>
          <p className={style.sectionTitle}>Current status</p>
          <></>
        </div>

        <div className={style.section}>
          <p className={style.sectionTitle}>Add car</p>

          <div className={style.inputContainer}>
            <label html>License Number</label>
            <input type="text" placeholder="License number"></input>
          </div>

          <div className={style.inputContainer}>
            <label>Type of car</label>
            <select>
              <option type="checkbox">4-seater car</option>
              <option type="checkbox">7-seater car</option>
              <option type="checkbox">Truck</option>
            </select>
          </div>

          <div className={style.inputContainer}>
            <label>Options</label>
            <div className={style.checkboxContainer}>
              <p>Washing</p>
              <input type="checkbox" />
            </div>
            <div className={style.checkboxContainer}>
              <p>Oil changing</p>
              <input type="checkbox" />
            </div>
            <div className={style.checkboxContainer}>
              <p>Wheels checking</p>
              <input type="checkbox" />
            </div>
          </div>

          <button>Add car</button>
        </div>

        <div className={style.section}>
          <p className={style.sectionTitle}>Find car & Take bill</p>

          <div className={style.inputContainer}>
            <label>License Number</label>
            <input type="text" placeholder="License number"></input>
          </div>

          <p className={style.textPlace}>This is something in here</p>

          <button>Find car</button>
          <button>Take bill</button>
        </div>

        <div className={style.section}>
          <p className={style.sectionTitle}>Statistic</p>

          <p className={style.textPlace}>This is something in here</p>

          <button>Today</button>
          <button>This month</button>
          <button>This year</button>
        </div>

        <div className={style.section}>
          <p className={style.sectionTitle}>Edit prices</p>

          <div className={style.inputContainer}>
            <label>Truck</label>
            <input type="text" placeholder="$9"></input>
          </div>
          <div className={style.inputContainer}>
            <label>4-seater car</label>
            <input type="text" placeholder="$7"></input>
          </div>
          <div className={style.inputContainer}>
            <label>7-seater car</label>
            <input type="text" placeholder="$3"></input>
          </div>
          <div className={style.inputContainer}>
            <label>Oil changing</label>
            <input type="text" placeholder="$9"></input>
          </div>
          <div className={style.inputContainer}>
            <label>Washing</label>
            <input type="text" placeholder="$9"></input>
          </div>
          <div className={style.inputContainer}>
            <label>Wheel checking</label>
            <input type="text" placeholder="$9"></input>
          </div>

          <button>Submit</button>
        </div>
      </div>

      <footer>
        <FaCopyright />
        <p> Đức Anh Bùi. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;

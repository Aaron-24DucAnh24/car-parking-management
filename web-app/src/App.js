import clsx from 'clsx'
import { FaCopyright } from 'react-icons/fa'

import style from'./App.module.scss';

function App() {
  return (
    <div className={style.App}>

      <header><a href='/'>Car Parking Management Page</a></header>

      <div className={style.body}>

        <div className={clsx(style.addSection, style.section)}>

          <p className={style.sectionTittle}>Add car</p>

          <div className={style.inputContainer}>
            <label html>License Number</label>
            <input type='text' placeholder='License number'></input>
          </div>

          <div className={style.inputContainer}>
            <label>Type if car</label>
            <select>
              <option type='checkbox'>4-seater car</option>
              <option type='checkbox'>7-seater car</option>
              <option type='checkbox'>Truck</option>
            </select>
          </div> 

          <div className={style.inputContainer}>
            <label>Options</label>
            <input type='checkbox'/>
            <input type='checkbox'/>
            <input type='checkbox'/>
          </div> 

          <button>Add car</button>

        </div>

        <div className={clsx(style.billSection, style.section)}>

          <p className={style.sectionTittle}>Get bill</p>

          <div className={style.inputContainer}>
            <label>License Number</label>
            <input type='text' placeholder='License number'></input>
          </div> 

          <p>This is something in here</p>

          <button>Get bill</button>

        </div>

        <div className={clsx(style.statisticSection, style.section)}>

          <p className={style.sectionTittle}>Statistic</p>

          <p>This is something in here</p>

          <button>This month</button>
          <button>This year</button>
          <button>Today</button>

        </div>

        <div className={clsx(style.editSection, style.section)}>

          <p className={style.sectionTittle}>Edit prices</p>

          <div className={style.inputContainer}>
            <label>Truck</label>
            <input type='text' placeholder='$9'></input>
          </div>
          <div className={style.inputContainer}>
            <label>4-Seater car</label>
            <input type='text' placeholder='$7'></input>
          </div>
          <div className={style.inputContainer}>
            <label>7-seater car</label>
            <input type='text' placeholder='$3'></input>
          </div>
          <div className={style.inputContainer}>
            <label>Oil changing</label>
            <input type='text' placeholder='$9'></input>
          </div>
          <div className={style.inputContainer}>
            <label>Washing</label>
            <input type='text' placeholder='$9'></input>
          </div>
          <div className={style.inputContainer}>
            <label>Wheel checking</label>
            <input type='text' placeholder='$9'></input>
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

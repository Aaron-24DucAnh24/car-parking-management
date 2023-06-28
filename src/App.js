
import style from'./App.module.scss';
import Footer from './component/footer'

function App() {
  return (
    <div className={style.App}>
      <header><a href='/'>Car Parking Management Page</a></header>
      <div className={style.body}></div>
      <Footer/>
    </div>
  );
}

export default App;

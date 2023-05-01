import s from './HomeSec1.module.css';
import desktopBg from '../../assets/ramp-banner-devices.png';

export default function HomeSec1() {
  return (
    <div className={s.ctn}>
      <div className={s.text}>
        <h1>Buy Vith USD, EUR, & GBP </h1>
        <p>
          On ramp to 25+ cryptocurrencies using your 
          credit/debit card, bank account or Apple Pay within Exodus mobile
        </p>
      </div>
      <img src={desktopBg} alt="desktop background" className={s.desktopBg}/>
      <button className="heroBtn">LEARN MORE ABOUT FIAT ON-RAMP</button>
    </div>
  )
}

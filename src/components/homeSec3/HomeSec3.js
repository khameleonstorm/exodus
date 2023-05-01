import s from './HomeSec3.module.css';
import walletsIcons from '../../assets/walletsIcons.png';
import BTC from '../../assets/BTC.svg';

export default function HomeSec3() {
  return (
    <div className={s.ctn}>
      <img src={walletsIcons} alt="icons"/>
      <button className="heroBtn">SEE THE FULL LIST</button>
      <div className={s.content}>
        <img src={BTC} alt="BTC"/>
        <div>
          <h1>Best Bitcoin Wallet for Beginners!</h1>
          <p>Send, Receive & Swap Bitcoin and over 100 different cryptocurrencies...</p>
        </div>
          <button className='heroBtn'>LEARN MORE ABOUT BITCOIN</button>
      </div>
    </div>
  )
}

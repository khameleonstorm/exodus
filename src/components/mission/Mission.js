import s from './Mission.module.css'
import missionBg from '../../assets/mission-bg.jpg'

export default function Mission() {
  return (
    <div className={s.ctn}>
      <div className={s.content1}>
        <h2>EXODUS GIVES YOU THE POWER TO</h2>
        <h1>Secure, Manage, and Swap cryptocurrency on desktop, mobile and hardware wallets.</h1>
        <div>
          <p>
          At Exodus we pour our hearts into every detail, from pixel-perfect 
          icons to subtle sounds, creating a cryptocurrency experience that works for everyone.
          </p>
          <p>
          Our goal is to remove the geek requirement and make it fun and easy to learn and use 
          cryptocurrency. No technical talk. No confusing steps - we think it shows.
          </p>
        </div>
      </div>

      <div className={s.content2}>
        <div>
          <h2><span>01</span><br />SAFE</h2>
          <h2><span>02</span><br />RELIABLE</h2>
          <h2><span>03</span><br />TRUSTED</h2>
        </div>

        <img src={missionBg} alt="mission"/>
      </div>
    </div>
  )
}

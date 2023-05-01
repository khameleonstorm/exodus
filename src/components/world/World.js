import s from './World.module.css'
import worldBg from '../../assets/worldBg.png'

export default function World() {
  return (
    <div className={s.ctn}>
      <div className={s.wrapper}>
        <div>
          <h2>FOUNDED IN</h2>
          <h1>2015</h1>
          <p>By JP Richardson and Daniel Castagnoli</p>
        </div>

        <div>
          <h2>PRODUCT UPDATES</h2>
          <h1>200+</h1>
          <p>New releases across desktop, mobile and hardware</p>
        </div>

        <div>
          <h2>NEW RELEASE EVERY</h2>
          <h1>2 Weeks</h1>
          <p>Released software every two weeks since 2015</p>
        </div>

        <div>
          <h2>DIGITAL ASSETS</h2>
          <h1>260+</h1>
          <p>Supported cryptocurrencies inside Exodus products</p>
        </div>
      </div>
      <img src={worldBg} alt="world map" />
    </div>
  )
}

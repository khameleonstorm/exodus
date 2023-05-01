import s from './Leadership.module.css'
import { BsGithub } from 'react-icons/bs'
import jp from '../../assets/JP-Richardson.jpg'
import daniel from '../../assets/Daniel-Castagnoli.jpg'
import laptop from '../../assets/laptop.jpg'

export default function Leadership() {
  return (
    <div className={s.ctn}>
      <div className={s.content1}>
        <h1>Leadership</h1>
        <p>
          Exodus was founded in 2015 by JP Richardson and Daniel Castagnoli. JP brings the technical magic behind the scenes to Exodus. JP has published <span>over 200 open source libraries</span> and has written code in use by most Bitcoin and cryptocurrency software on the web today. On the creative side, from subtle sounds to smooth animations, Daniel oversees each detail of the Exodus creative process. Daniel is a master of emotional design and has designed experiences for Apple, BMW, Disney, Louis Vuitton and Nike.
        </p>
      </div>

      <div className={s.content2}>
        <div className={s.card}>
          <div className={s.imgCtn}>
            <img src={jp} alt="JP Richardson"/>
            <div>
              <h3>Co-Founder & CEO</h3>
              <p>
                From subtle sounds to smooth animations Daniel takes care of each detail. 
                He is a master of emotional design and has designed experiences for Apple, 
                BMW, Disney, Louis Vuitton and Nike.
              </p>
            </div>
          </div>
          <h2>JP Richardson <BsGithub /></h2>
        </div>

        <div className={s.card}>
          <div className={s.imgCtn}>
            <img src={daniel} alt="Daniel Castagnoli"/>
            <div>
              <h3>Co-Founder & President</h3>
              <p>
              From subtle sounds to smooth animations Daniel takes 
              care of each detail. He is a master of emotional design and has 
              designed experiences for Apple, BMW, Disney, Louis Vuitton and Nike.
              </p>
            </div>
          </div>
          <h2>Daniel Castagnoli <BsGithub /></h2>
        </div>
      </div>

      <div className={s.content3}>
        <div className={s.wrapper}>
          <img src={laptop} alt="laptop"/>
          <div>
            <h3>CAREER</h3>
            <h1>Working at Exodus</h1>
            <p>Is cryptocurrency your passion? Join Exodus and work from anywhere - all positions are 100% remote.</p>
            <button className='heroBtn'>VIEW OPEN POSITIONS </button>
          </div>
        </div>
      </div>
    </div>
  )
}

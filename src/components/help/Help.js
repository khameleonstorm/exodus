import { RiChat1Line } from 'react-icons/ri'
import s from './Help.module.css'
import supportPhotos from '../../assets/support-photos.png'

export default function Help({list}) {

  return (
    <>
    <div className={s.ctn}>
      <h1 className={s.title}>How can we help you?</h1>
      <p className={s.subtitle}>
        We are here to help! Please, find answers to the
       frequently asked questions below or reach out to us.
      </p>
      <div className={s.content1}>
        {list.map((item, i) => 
        <div key={i} className={s.card}>
          <img src={item.image} alt={item.title}/>
          <h3>{item.title}</h3>
        </div>
        )}
      </div>
    </div>

    <div className={s.content2}>
        <h2>Didn’t find what you were looking for?</h2>
        <p>Please reach out to us, we will be glad to answer any of your 
          questions or hop on a call with Exodus Support+ team member.
        </p>

        <div className={s.wrapper}>
        <div className={s.left}>
          <RiChat1Line />
          <h2>Basic Support</h2>
          <p>We will help you as soon as possible via our chat.</p>
          <button className='heroBtn'>SEND US A MESSAGE</button>
        </div>

        <div className={s.left}>
          <img src={supportPhotos} alt='support'/>
          <h2>Exodus Support Live</h2>
          <p>Book a live call with one of our crypto concierge experts.</p>
          <button className='heroBtn pink'>BOOK A CALL</button>
        </div>
        </div>
      </div>
    </>
  )
}

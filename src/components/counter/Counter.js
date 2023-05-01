import CountUp from 'react-countup';
import s from './Counter.module.css'


export default function Counter() {
  return (
    <div className={s.ctn}>
      <h1>
      <CountUp duration={10} start={0} end={260} className={s.count}/>+
      </h1>
      <p>260+ Assets supported</p>
    </div>
  )
}

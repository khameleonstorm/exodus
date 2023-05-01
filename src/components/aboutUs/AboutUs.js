import styles from './AboutUs.module.css';
import { aboutText1 } from '../../utils/aboutText';

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <h1>{aboutText1.title2}</h1>
        {aboutText1.text.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  )
}

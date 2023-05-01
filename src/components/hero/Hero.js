import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import useAuth from '../../hooks/useAuth';

export default function Hero({ title, subtitle, bg, white }) {
  const { user } = useAuth();


  return (
    <div className={styles.container} style={{background: `url(${bg})`}}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className={styles.buttons}>
          {!user && <Link className="heroBtn transparent" to="/login" style={white ? {display: "none"} : {}}>Login</Link>}
          {user && <Link className="heroBtn transparent" to="/dashboard" style={white ? {display: "none"} : {}}>Dashboard</Link>}
          {!user && <Link className="heroBtn" to="/signUp">Get Started</Link>}
          {user && <Link className="heroBtn" to="/Pricing">Invest</Link>}
        </div>
      </div>
    </div>
  )
}

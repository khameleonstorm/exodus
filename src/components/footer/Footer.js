import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';


export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.address}>
        <h2>Email</h2>
        <p>help@exodusexperts.com</p>
      </div>
      <div className={styles.links}>
        <h2>Useful Links</h2>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <div className={styles.services}>
        <h2>Services</h2>
        <Link to="/plans">Pricing</Link>
        <Link to="/plans">Investment</Link>
      </div>
      <div className={styles.socials}>
        <h2>Our Social Networks</h2>
        <p>connect with us on our social network.</p>
        <div className={styles.icons}>
          <Link to="#"><FaFacebookF /></Link>
          <Link to="#"><FaTwitter /></Link>
          <Link to="#"><FaLinkedinIn /></Link>
          <Link to="#"><FaTelegramPlane /></Link>
          <Link to="#"><AiFillInstagram /></Link>    
        </div>
      </div>
    </div>
  )
}

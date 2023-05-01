// css import
import styles from './About.module.css';
import useAuth from '../../hooks/useAuth';

// component
import Nav from '../../components/nav/Nav';
import Hero from '../../components/hero/Hero';
import Footer from '../../components/footer/Footer';

// about page text
import { aboutHero } from '../../utils/aboutText';
import Copyright from '../../components/copyright/Copyright';
import Mission from '../../components/mission/Mission';
import World from '../../components/world/World';
import Leadership from '../../components/leadership/Leadership';

export default function About() {
  const { authIsReady } = useAuth();


  return (authIsReady &&
    <div className={styles.container}>
      <Nav />
      <Hero title={aboutHero.title} subtitle={aboutHero.subtitle} link={aboutHero.link} bg={aboutHero.image}/>
      <Mission />
      <World />
      <Leadership />
      <Footer />
      <Copyright />
    </div>
  )
}

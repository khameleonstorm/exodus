// Import css modules stylesheet as styles
import styles from './Home.module.css';
import useAuth from '../../hooks/useAuth';
import { MoonLoader } from 'react-spinners';
import { plans } from '../../utils/investText';

// Import components
import Nav from '../../components/nav/Nav';
import Hero from '../../components/hero/Hero';
import Footer from '../../components/footer/Footer';
import { heroText } from '../../utils/homeText'; 
import HomeSec1 from '../../components/homeSec1/HomeSec1';
import HomeSec2 from '../../components/homeSec2/HomeSec2';
import { bigSec1, bigSec2, bigSec3, bigSec4 } from '../../utils/secText';
import Counter from '../../components/counter/Counter';
import HomeSec3 from '../../components/homeSec3/HomeSec3';
import Copyright from '../../components/copyright/Copyright';
import InvestmentCard from '../../components/investmentCard/InvestmentCard';
import AboutUs from '../../components/aboutUs/AboutUs';




export default function Home() {
  const { authIsReady } = useAuth();

  if(!authIsReady){
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <MoonLoader color="#1649ff" />
        </div>
      </div>
    )
  }


  if(authIsReady){
    return (
      <>
        <Nav />
        <Hero title={heroText.title} subtitle={heroText.subtitle} bg={heroText.image} link={heroText.link}/>
        <HomeSec1 />
        <HomeSec2 list={bigSec1.list} text={bigSec1.text}/>
        <HomeSec2 list={bigSec2.list} text={bigSec2.text} reverse={true}/>
        <Counter />
        <HomeSec3 />
        <InvestmentCard title={plans.title2} subtitle={plans.subtitle2} plans={plans.plans} showHeader={true}/>
        <AboutUs />
        <HomeSec2 list={bigSec3.list} text={bigSec3.text}/>
        <HomeSec2 list={bigSec4.list} text={bigSec4.text}/>
        <Footer />
        <Copyright />
      </>
    )

  }
}

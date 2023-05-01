import styles from './Dashboard.module.css';
import useAuth from '../../hooks/useAuth';
import useCollection from '../../hooks/useCollection';

// importing components
import SideNav from '../../components/sideNav/SideNav';
import BalCard from '../../components/balCard/BalCard';
import Funding from '../../components/funding/Funding';
import InvestmentCard from '../../components/investmentCard/InvestmentCard';
import BuiltWith from '../../components/builtWith/BuiltWith';
import Profile from '../../components/profile/Profile';
import MiningOverview from '../../components/miningOverview/MiningOverview';
import CryptoChart from '../../components/cryptoChart/CryptoChart';
import DashboardNav from '../../components/dashboardNav/DashboardNav';

// importing router functions
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

// importing plans
import { plans } from '../../utils/investText';



export default function Dashboard() {
  const { document: doc, isPending } = useCollection('profile', false, true);
  const { authIsReady, user } = useAuth()
  const { page } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const chatDiv = document.getElementById('tidio-chat')
    const wsDiv = document.querySelector('[id^="gb-widget"]')
    if(chatDiv) chatDiv.style.display = 'none'
    if(wsDiv) wsDiv.style.display = 'none'

    if(authIsReady){
      if(user?.email === "help@exodusexperts.com") navigate('/admin')
      if(!user) navigate('/login') 
    }

    return () => {
      if(chatDiv) chatDiv.style.display = 'block'
      if(wsDiv) wsDiv.style.display = 'block'
    }

  }, [authIsReady, user, navigate])



  if(isPending || !authIsReady){
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <MoonLoader color="#1649ff" />
        </div>
      </div>
    )
  }




  return ((authIsReady && user?.email !== "help@exodusexperts.com" && doc) &&
    <div className={styles.container}>
      <div className={styles.side}>
        <SideNav />
      </div>
      {(page === undefined || page === 'home') &&
      <div className={styles.main}>
        <DashboardNav />
        <BalCard />
        <MiningOverview />
        <BuiltWith />
        <CryptoChart />
      </div>
      }


      {page === 'fund' &&
      <div className={styles.main}>
        <Funding />
      </div>
      }


      {page === 'invest' &&
      <div className={styles.main}>
        <InvestmentCard title={plans.title2} subtitle={plans.subtitle2} plans={plans.plans} dashboard={true}/>
      </div>
      }


      {page === 'profile' &&
      <div className={styles.main}>
        <Profile document={doc}/>
      </div>
      }

      {page === 'withdraw' &&
      <div className={styles.main}>
        <DashboardNav />
        <BalCard />
        <MiningOverview />
        <BuiltWith />
        <CryptoChart />
      </div>
      }
      
    </div>
  )
}

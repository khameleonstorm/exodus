import styles from './Profile.module.css'
import useAuth from '../../hooks/useAuth'
import { useEffect, useState } from 'react'

export default function Profile({ document }) {
  const { user,  authIsReady} = useAuth()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if(document){
      console.log("hello", document)
      // filter and set profile
      let filteredDoc = document.filter((doc) => doc.email === user?.email)
      setProfile(filteredDoc[0])
    }
  }, [document, user])

  return ((authIsReady && user) &&
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.cover}>
          <img className={styles.img} src={`https://robohash.org/${user?.uid}`} alt="avatar"/>
          <img className={styles.avatar} src={`https://robohash.org/${user?.uid}`} alt="avatar"/>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.name}>
          <h1>@{profile?.displayName}</h1>
          <p>{user.email}</p>
          <div className={styles.equity}>
            <p>Total Assets</p>
            <h1>${(profile?.bal.balance + profile?.bal.investment + profile?.bal.profit).toFixed(2)}</h1>
          </div>
        </div>
        <div className={styles.referral}>
          <div className={styles.referralCode}>
            <p>Referral Code</p>
            <h1>{profile?.uid}</h1>
          </div>
        </div>
        <div className={styles.moreDetails}>
          <h1>Personal Info</h1>
          <div className={styles.details}>
            <p>Full Name: <span>{profile?.fullName}</span></p>
            <p>Email: <span>{profile?.email}</span></p>
            <p>Phone Number: <span>{profile?.phoneNumber}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

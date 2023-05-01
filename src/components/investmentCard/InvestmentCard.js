import styles from './InvestmentCard.module.css';
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiArrowSmRight } from "react-icons/hi";
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { TextField } from '@mui/material';
import { useState } from 'react';
import useCollection from '../../hooks/useCollection';
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import dateFormat from "dateformat";

export default function InvestmentCard({ title, plans, showHeader, dashboard }) {
  const { user, authIsReady } = useAuth()
  const [amount, setAmount] = useState(null);
  const [minPlan, setMinPlan] = useState(null);
  const [maxPlan, setMaxPlan] = useState(null);
  const [percent, setPercent] = useState(null);
  const [day, setDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { document } = useCollection('profile', false, true);
  const [filteredDoc, setFilteredDoc] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if(user){
      if(document){
        setFilteredDoc(document.filter((doc) => doc.email === user.email))
      }
    }
  }, [document, user])

  const resetInput = () => {
    setModalSuccess('Investment successful')
    setTimeout(() => {
      setShowModal(false)
      setAmount(null)
      setMinPlan(null)
      setMaxPlan(null)
      setModalError(null)
      setModalSuccess(null)
    }, 3000)
  }

  const errorManager = (error) => {
    setModalError(error)
    setTimeout(() => {
      setModalError(null)
    }, 3000)
  }
  

  const handleInvest = (min, max, percent) => {
    setMinPlan(min)
    setMaxPlan(max)
    setPercent(percent)
    if(percent === 8) setDay(1)
    if(percent === 15) setDay(2)
    if(percent === 17) setDay(5)
    if(percent === 20) setDay(7)
    if(percent === 9) setDay(30)
    setShowModal(true)
  }

  
  const sendMessage = (amount, name) => {
    var templateParams = {
      amount,
      name,
      email: user.email,
      date: dateFormat(new Date(), "m/d/yy h:MM tt"),
      type: "Investment"
    };
 
    emailjs.send('service_59y7cje', 'template_7cbv4oo', templateParams, 'C63TNm0TKb40AESPQ')
    .then((result) => {
        console.log("result", result.text);
    }, (error) => {
        console.log("error", error.text);
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setPending(true)

    const ref = doc(db, "profile", user.email);
    if(filteredDoc && amount && minPlan && maxPlan){
      const amountNumber = Number(amount);
      const { bal, fullName } = filteredDoc[0];

      // balance check
      if(bal.balance < amountNumber){
        errorManager("Insufficient balance")
        setPending(false)
        return
      }
        
      // min n max limit check
      if(amountNumber < minPlan || amountNumber > maxPlan){
        errorManager("Amount must be within the Min & Max limits")
        setPending(false)
        return
      }

      // updading balance
      if(amountNumber >= minPlan || amountNumber <= maxPlan || amountNumber >= 10000){
        const newBal = bal.balance - amountNumber;
        const newInvest = bal.investment + amountNumber;
        const newBalances = {
          ...bal,
          balance: newBal,
          investment: newInvest,
        }
        await updateDoc(ref, {"bal": newBalances});

        await addDoc(collection(db, "transactions"), {
          date: new Date(),
          amount,
          status: "pending",
          email: user.email,
          type: "investment",
          profit: amountNumber * (percent / 100),
          day,
        });
        setPending(false)
        resetInput();
      }
      sendMessage(amountNumber, fullName)
    }

    setPending(false)
  }




  return (authIsReady &&
    <>
    {showHeader && 
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    }

    {showModal &&
      <div className={styles.modal}>
        <div className={styles.modalcontent}>
          <form onSubmit={handleSubmit}>
            {!modalSuccess && <h1>Enter Amount</h1>}
            {modalSuccess && <h1 style={{color: "#29ce00"}}>{modalSuccess}</h1>}
            <TextField 
              id="Amount" 
              label="Amount" 
              variant="outlined" 
              fullWidth
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className={styles.btns}>
              {!pending &&<button onClick={() => handleSubmit} className='heroBtn small pink'>Invest</button>}
              {pending && <button className='heroBtn small pink' disabled>Loading...</button>}
              <p className={styles.cancel} onClick={() => setShowModal(false)}>Cancel</p>
            </div>
            {modalError && <p className={styles.error}>{modalError}</p>}
          </form>
        </div>
      </div>
    }
    <div className={styles.container} id="pricing">
      {plans.map(plan  =>
        <div className={styles.card} key={plan.id} style={dashboard ? {background: "white"} : {}}>
          <div className={styles.content3} style={{ background: plan.background}}>
          </div>
          <div className={styles.content1}>
            <h1 style={dashboard ? {color: "black"} : {}}>{plan.percent}%</h1>
            <h2 style={dashboard ? {color: "black"} : {}}>{plan.title}</h2>
            <h3 style={dashboard ? {color: "black"} : {}}>Min Investment → ${plan.min}</h3>
            <h3 style={dashboard ? {color: "black"} : {}}>Max Investment → ${plan.max}</h3>
            <span></span>
          </div>
          <div className={styles.content2}>
          {plan.falsepoints.map(falsepoint => <div key={falsepoint} className={styles.fact1}><span><FaRegTimesCircle /><p style={dashboard ? {color: "black"} : {}}>{falsepoint}</p></span></div>) }
          {plan.truepoints.map(truepoint => <div key={truepoint} className={styles.fact2}><span><FaRegCheckCircle /><p style={dashboard ? {color: "black"} : {}}>{truepoint}</p></span></div>) }
          </div>
          <div className={styles.buttons}>
            {!user &&
            <>
              <Link to="/login" className={styles.button1}>Get Started</Link>
              <Link to="/plans" className={styles.button2}>
                Learn More <HiArrowSmRight color={`${plan.background}`}/>
              </Link>
            </>
            }
            {user &&
              <Link to="#" className={styles.button1} onClick={() => handleInvest(plan.min, plan.max, plan.percent)}>Invest</Link>
            }
          </div>
        </div>
      )}
    </div>
    </>
  )
}

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Users from '../../components/allUsers/Users';
import s from './Admin.module.css';
import useAuth from '../../hooks/useAuth';
import useCollection from '../../hooks/useCollection';
import { TextField } from '@mui/material';
import { db } from '../../firebase/config';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import DashboardNav from '../../components/dashboardNav/DashboardNav';
import emailjs from '@emailjs/browser';
import dateFormat from "dateformat";
import { MdDeleteForever } from "react-icons/md"
import AdminCard from '../../components/adminCard/AdminCard';
import AdminMenu from '../../components/adminMenu/AdminMenu';
import Transactions from '../../components/transaction/Transactions';

export default function Admin() {
  const { page } = useParams();
  const { document: Document, error, isPending } = useCollection('profile', true, false);
  const { document: transactions } = useCollection('transactions', true, false);
  const { user, authIsReady } = useAuth();
  const [balance, setBalance] = useState(null);
  const [profit, setProfit] = useState(null);
  const [investment, setInvestment] = useState(null);
  const [withdrawal, setWithdrawal] = useState(null);
  const [savings, setSavings] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    if(user?.email !== 'help@exodusexperts.com') navigate('/dashboard')

    const chatDiv = document.getElementById('tidio-chat')
    const wsDiv = document.querySelector('[id^="gb-widget"]')

    if(wsDiv) wsDiv.style.display = 'none'
    if(chatDiv) chatDiv.style.display = 'none'

    return () => {
      if(chatDiv) chatDiv.style.display = 'block';
      if(wsDiv) wsDiv.style.display = 'block';
    }
  }, [user, navigate]);

  
  const sendMessage = (amount, name, email) => {
    var templateParams = {
      amount,
      name,
      email,
      date: dateFormat(new Date(), "m/d/yy h:MM:ss tt"),
      title: "Deposit",
      additional: ""
    };
 
    emailjs.send('service_59y7cje', 'template_7cbv4oo', templateParams, 'C63TNm0TKb40AESPQ')
    .then(result => console.log("result", result.text))
    .catch(err => console.log("error", err.text))
  }


  
const filter = (email) => {
  navigate('/admin/user')
  let filteredDoc = Document.find((doc) => doc.email === email)
  setBalance(filteredDoc.bal.balance)
  setProfit(filteredDoc.bal.profit)
  setInvestment(filteredDoc.bal.investment)
  setWithdrawal(filteredDoc.bal.withdrawal)
  setSavings(filteredDoc.bal.savings)
  setDisplayName(filteredDoc.displayName)
  setEmail(filteredDoc.email)
}

const handleSubmit = async(e) => {
  const ref = doc(db, "profile", email);
  setPending(true)
  e.preventDefault()

  const newBalances = {
    balance: Number(balance),
    investment: Number(investment),
    profit: Number(profit),
    savings: Number(savings),
    withdrawal: Number(withdrawal),
  }

  await updateDoc(ref, {
    "bal": newBalances
  });

  let filteredDoc = Document.filter((doc) => doc.email === email)

  if(filteredDoc[0].bal.balance !== balance){
    sendMessage(balance, filteredDoc[0].fullName, filteredDoc[0].email)
  }

  setMessage("Updated successfully")
  setPending(false)
  setTimeout(() => setMessage(null), 2000)
}

const deleteUserDocument = async () => {
  await deleteDoc(doc(db, "profile", email));
  console.log("Done deleting")
}

const handleMenu = () => setShowMenu(!showMenu)


  return ((authIsReady && user?.email === "help@exodusexperts.com") && 
    <div className={s.container}>
      <div className={showMenu? s.side : s.side2}> <AdminMenu handleMenu={handleMenu}/> </div>
      <div className={s.main}>
      <DashboardNav admin={true} handleMenu={handleMenu}/>
        {(page === "home" || page === undefined) && <AdminCard profiles={Document} transactions={transactions}/>}
        {page === "users" && <Users document={Document} error={error} isPending={isPending} filter={filter}/>}
        {page === "transactions" && <Transactions transactions={transactions}/>}

        {page === "referral" &&
        <div className={s.referral}>
          {Document?.map((user) => 
          <div className={s.users} key={user.uid} onClick={() => filter(user.email)}>
              <img src={`https://robohash.org/${user.uid}`} width={40} height={40} alt="avatar" style={{borderRadius: "50%"}}/>
              <div className={s.referral_info}>
                <p>{user.email}</p>
                <p>
                  Referred {Document.filter((doc) => doc.referral === user.uid).length}
                  {Document.filter((doc) => doc.referral === user.uid).length > 1 ? " users" : " user"}
                </p>
              </div>
          </div>)
          }
        </div>
        }

        {page === "user" &&
        <div className={s.singleUser}>
          <form onSubmit={handleSubmit} className={s.card}>
            <h1>{displayName}</h1>
            <p>{email}</p>
            <TextField className={s.input} type="number" label="Balance" value={balance} onChange={(e) => setBalance(e.target.value)}/>
            <TextField className={s.input} type="number" label="Profit"value={profit} onChange={(e) => setProfit(e.target.value)}/>
            <TextField className={s.input} type="number" label="Investment" value={investment} onChange={(e) => setInvestment(e.target.value)}/>
            <TextField className={s.input} type="number" label="Withdrawal" value={withdrawal} onChange={(e) => setWithdrawal(e.target.value)}/>
            <TextField className={s.input} type="number" label="Savings" value={savings} onChange={(e) => setSavings(e.target.value)}/>
            <div className={s.btns}>
            <button className={s.btn1} type='submit'> {pending? "Updating...": message? `${message}`: "Update"} </button>
            <button className={s.btn2} color="error" onClick={deleteUserDocument}><MdDeleteForever /> Delete User</button>
            </div>
          </form>
        </div>}

      </div>
    </div>
  )
}

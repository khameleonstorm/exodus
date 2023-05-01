import { doc, increment, updateDoc } from 'firebase/firestore';
import s from './Transactions.module.css';
import { db } from '../../firebase/config';
import emailjs from '@emailjs/browser';
import dateFormat from "dateformat";

export default function Transactions({transactions}) {

    
  const sendMessage = (amount, name, email, address, coin, network, title) => {
    let templateParams = {
      amount,
      name,
      email,
      date: dateFormat(new Date(), "m/d/yy h:MM:ss tt"),
      title,
      additional: `address: ${address} coin: ${coin} network: ${network}`
    };

    if(title === "Withdrawal") templateParams = `hash: ${address} coin: ${coin} network: ${network}`
 
    emailjs.send('service_59y7cje', 'template_7cbv4oo', templateParams, 'C63TNm0TKb40AESPQ')
    .then(result => console.log("result", result.text))
    .catch(err => console.log("error", err.text))
  }



  const handleTransaction = (transaction) => {
    if(transaction.status !== 'pending') return

    // handling withdrawal
    if(transaction.type === 'withdrawal'){
      const res = prompt('Do you want to approve this withdrawal? (yes/no). Enter "copy" to copy the wallet address').toLowerCase()
      const { amount, name, email, address, type } = transaction;

      if(res === 'yes'){
        updateDoc(doc(db, 'transactions', transaction.id), { status: 'approved'})
        .then(() => updateDoc(doc(db, 'profile', transaction.email), { "bal.balance": increment(-amount), "bal.withdrawal": increment(amount)}))
        .then(() => sendMessage(amount, name, email, address, "USDT", "erc20", type))
        .catch(err => console.log(err.message))
      }

      if(res === 'copy'){
        navigator.clipboard.writeText(address)
        alert('address copied to clipboard')
      }
    }

    // handling deposit
    if(transaction.type === 'deposit'){
      const res = prompt(`Do you want to approve this deposit? (yes/no), You can also comfirm the deposit using the transaction hash(${transaction.hash}) on the blockchain. Enter "copy" to copy the hash code`).toLowerCase()
      const { amount, name, email, hash, coin, network, type } = transaction;

      if(res === 'yes'){
        updateDoc(doc(db, 'transactions', transaction.id), { status: 'approved'})
        .then(() => updateDoc(doc(db, 'profile', transaction.email), { "bal.balance": increment(amount)}))
        .then(() => sendMessage(amount, name, email, hash, coin, network, type))
        .catch(err => console.log(err.message))
      }

      if(res === 'copy'){
        navigator.clipboard.writeText(hash)
        alert('hash copied to clipboard')
      }
    }
  }


  return (
    <div className={s.ctn}>
      {transactions?.map((transaction, i) => {
        return (
          <div key={i} className={s.card} onClick={() => handleTransaction(transaction)}>
            <div className={s.info_left}>
              <p>{transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}</p>
              <p>{transaction.date}</p>
              <p>{transaction.email}</p>
            </div>

            <div className={s.info_right}>
              <p className={`amount ${transaction.type}`}>{transaction.type === 'deposit' ? '+' : '-'}{transaction.amount}</p>
              {<p className={s[transaction.status]}>{transaction.status}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

import { useState } from 'react'
import s from './AdminCard.module.css'
import { HiUsers } from "react-icons/hi"
import { GiCash } from "react-icons/gi"
import { useEffect } from 'react'
import { MdOutlineTransferWithinAStation } from 'react-icons/md'
import { IoStatsChart } from 'react-icons/io5'
import { AiFillMoneyCollect } from 'react-icons/ai'
import { FaUserLock } from 'react-icons/fa'


export default function AdminCard({profiles, transactions}) {
  const [total, setTotal] = useState({
    totalUsers: 0,
    totalDeposit: 0,
    totalWithdrawal: 0,
    totalInvestment: 0,
    totalTransactions: 0,
    blockedUsers: 0,
  })

  useEffect(() => {
    console.log(profiles, transactions)
    if(profiles && transactions){
      let totalUsers = profiles.length
      let totalDeposit = 0
      let totalWithdrawal = 0
      let totalInvestment = 0
      let totalTransactions = 0
      let blockedUsers = 0

      transactions.forEach((transaction) => {
        if(transaction.type === "deposit") totalDeposit += Number(transaction.amount)

        if(transaction.type === "withdrawal") totalWithdrawal += Number(transaction.amount)

        if(transaction.type === "investment") totalInvestment += Number(transaction.amount)
        totalTransactions++
      })

      setTotal({ totalUsers, totalDeposit, totalWithdrawal, totalInvestment, totalTransactions, blockedUsers})
    }
  }, [profiles, transactions])


  return (
    <div className={s.ctn}>
      <div className={s.card}>
        <div className={s.icons}>
          <HiUsers />
          <h1 className={s.amount}>{total.totalUsers}</h1>
        </div>
        <h2>Total users</h2>
      </div>
      
      <div className={s.card}>
        <div className={s.icons}>
          <GiCash />
          <h1 className={s.amount}>{total.totalDeposit}</h1>
        </div>
        <h2>Total Deposit</h2>
      </div>

      <div className={s.card}>
        <div className={s.icons}>
          <MdOutlineTransferWithinAStation />
          <h1 className={s.amount}>{total.totalWithdrawal}</h1>
        </div>
        <h2>Total Withdrawal</h2>
      </div>

      <div className={s.card}>
        <div className={s.icons}>
          <IoStatsChart />
          <h1 className={s.amount}>{total.totalInvestment}</h1>
        </div>
        <h2>Total Investment</h2>
      </div>

      <div className={s.card}>
        <div className={s.icons}>
          <AiFillMoneyCollect />
          <h1 className={s.amount}>{total.totalTransactions}</h1>
        </div>
        <h2>Total Transactions</h2>
      </div>

      <div className={s.card}>
        <div className={s.icons}>
          <FaUserLock />
          <h1 className={s.amount}>{total.blockedUsers}</h1>
        </div>
        <h2>Blocked Users</h2>
      </div>
    </div>
  )
}

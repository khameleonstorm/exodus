import { Link } from 'react-router-dom'
import s from './AdminMenu.module.css'
import { MdSpaceDashboard } from 'react-icons/md'
import { FaUsersCog } from 'react-icons/fa'
import { HiGift } from 'react-icons/hi'
import { RiFolderTransferFill } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import useAuth  from '../../hooks/useAuth'
import { CgClose } from 'react-icons/cg'

export default function AdminMenu({handleMenu}) {
  const { user } = useAuth()
  const { page } = useParams()

  return (
    <div className={s.ctn} onClick={handleMenu}>
      <img src={`https://robohash.org/${user?.uid}`} width={50} height={50} alt="avatar" style={{borderRadius: "50%"}}/>
      <CgClose className={s.close}/>
      <div className={s.wrapper}>
        <Link to="/admin/home" className={(page === "home" || page === undefined) ? s.active : ""}><MdSpaceDashboard /> Dashboard</Link>
        <Link to="/admin/users" className={(page === "users" || page === "user") ? s.active : ""}><FaUsersCog /> All Users</Link>
        <Link to="/admin/referral" className={page === "referral" ? s.active : ""}><HiGift /> Referral</Link>
        <Link to="/admin/transactions" className={page === "transactions" ? s.active : ""}><RiFolderTransferFill /> Transactions</Link>
      </div>
    </div>
  )
}

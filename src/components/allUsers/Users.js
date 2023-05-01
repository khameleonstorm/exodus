import styles from './Users.module.css'
import { PulseLoader } from 'react-spinners';


export default function Users({document, error, isPending, filter}) {


  return (
    <div className={styles.ctn}>
      {isPending && <PulseLoader color='#00000080' size={7}/> }
      {error && <div>{error}</div>}

      {document?.map((user) => 
        <div className={styles.users} key={user.uid} onClick={() => filter(user.email)}>
            <img src={`https://robohash.org/${user.uid}`} width={40} height={40} alt="avatar" style={{borderRadius: "50%"}}/>
            <p>{user.email}</p>
        </div>
      )
      }
    </div>
  )
}
import { useState, useEffect } from "react"
import { Auth, db } from "../firebase/config"
import { createUserWithEmailAndPassword} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import useAuth from "./useAuth"
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuth()
    const navigate = useNavigate()

    // 
    const signUp = async({email, phoneNumber, password, username, referral, country, fullName}) => {

        setError(null)
        setIsPending(true)

        try {
          // sign up user
          const res = await createUserWithEmailAndPassword(Auth, email, password)

          if (!res) {
              setError("Sorry, can't create an account")
              setIsPending(false)
              return
          }

          // usetting profile doc
          const docRef = doc(db, "profile", res.user.email)
          setDoc(docRef, {
            online: true, 
            displayName: username, 
            uid: res.user.uid,
            email: res.user.email,
            phoneNumber,
            fullName,
            country,
            referral,
            bal: { balance: 0, investment: 0, profit: 0, savings: 0, withdrawal: 0,
            }
          })

          // dispatch login case
          dispatch({type: "LOGIN", payload: res.user})


          if(!isCancelled){
              setIsPending(false)
              setError(null)
          }
        
          if(res.user.email === 'help@exodusexperts.com')navigate('/admin')
          else navigate('/dashboard')

        } catch (err) {
            if(err){
              console.log(err.message)
              setError(err.message)
              setIsPending(false)
              setTimeout(() => {
                  setError(null)
              }, 3000);
            }
        }

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])


    return { error, isPending, signUp }
}

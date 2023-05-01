import { useState, useRef } from "react";
import s from "./Funding.module.css";
import qr1 from "../../assets/qr1.jpeg";
import qr2 from "../../assets/qr2.jpeg";
import qr3 from "../../assets/qr3.jpeg";
import qr4 from "../../assets/qr4.jpeg";
import qr5 from "../../assets/qr5.jpeg";
import qr6 from "../../assets/qr6.jpeg";
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { MdCircle } from "react-icons/md";
import dateFormat from "dateformat";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';



let coin = [
  {
    title: "USDT",
    image: qr1,
    network: "Trc20",
    address: "TY31xUqyQwUZ9wziZNwjaXvqpdjRGrwvxh",
  },

  {
    title: "Bitcoin",
    image: qr2,
    network: "BTC",
    address: "bc1qfwcjv437klqmu5muzfmxyg59meqm9rsgd5clav",
  },

  {
    title: "Tron",
    image: qr3,
    network: "Trc20",
    address: "TY31xUqyQwUZ9wziZNwjaXvqpdjRGrwvxh",
  },

  {
    title: "BNB",
    image: qr4,
    network: "BNB",
    address: "bc1qxf9rtsjg6dpdapqex7k76dp53ufcvhwcckt8s3",
  },

  {
    title: "LTC",
    image: qr5,
    network: "LTC",
    address: "ltc1qzf9egjyd396lq3z33smjjh0tgz45h4weatq764",
  },

  {
    title: "Ethereum",
    image: qr6,
    network: "Erc20",
    address: "0x82bDF60C2Cc77ae623dA1a744FEaA13adEbd784F",
  }
];


export default function Funding() {
  const [selected, setSelected] = useState(0);
  const [amount, setAmount] = useState(50);
  const [coinSelected, setCoinSelected] = useState("USDT");
  const [network, setNetwork] = useState("");
  const [hash, setHash] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [page, setPage] = useState(1);
  const textAreaRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth()


  const btnClick =  (e) => {
    if (e === "back") navigate("/dashboard")
    if (e === "qr") setPage(2)
    if (e === "hash") setPage(3)
  }

    
  const sendMessage = (amount, name, coin, network, hash) => {
    var templateParams = {
      amount,
      name,
      email: "help@exodusexperts.com",
      date: dateFormat(new Date(), "m/d/yy h:MM:ss tt"),
      title: `Deposit from ${user.email} `,
      additional: `Wallet: null  Network: ${network} Coin: ${coin} Hash: ${hash}`,
    };
 
    emailjs.send('service_59y7cje', 'template_7cbv4oo', templateParams, 'C63TNm0TKb40AESPQ')
    .then(result => console.log("result", result.text))
    .catch(err => console.log("error", err.text))
  }

  const submitHash = async() => {
    setPending(true)
    if (hash.length < 3 || coinSelected.length < 3 || network.length < 3) {
      setError("Invalid input fields")
      setTimeout(() => setError(null), 3000);
      setPending(false)
      return
    }

    if (hash || coin || network !== "") {
      
      await addDoc(collection(db, "transactions"), {
        date: dateFormat(new Date(), "m/d/yy h:MM:ss tt"),
        amount,
        status: "pending",
        email: user.email,
        type: "deposit",
        coin: coinSelected,
        network,
        hash,
      });
      sendMessage(amount, user.displayName, coinSelected, network, hash)
      setPending(false)
      setAmount(50)
      setHash("")
      setNetwork("")
      setCoinSelected("")
      alert("Your payment proof has been submitted. Your account will be funded when we confirm your payment.")
    }
  }

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Text copied to clipboard');
    } catch (err) {
      console.log('Failed to copy text: ', err);
    }
  };


  const pageNavigation = (e) => {
    if (e === "deposit") setPage(1)
    if (e === "qr") setPage(2)
    if (e === "hash") setPage(3)
  }

  const handleCoin = (e) => {
    if(e.target.value === "USDT") setSelected(0)
    if(e.target.value === "Bitcoin") setSelected(1)
    if(e.target.value === "Tron") setSelected(2)
    if(e.target.value === "BNB") setSelected(3)
    if(e.target.value === "LTC") setSelected(4)
    if(e.target.value === "Ethereum") setSelected(5)
  }

  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <div className={s.current}>
          <MdCircle onClick={() => pageNavigation("deposit")} size="1.2rem" style={page === 1 ? {color: "#05C169"} : {}}/>
          <MdCircle onClick={() => pageNavigation("qr")} size="1.2rem" style={page === 2 ? {color: "#05C169"} : {}}/>
          <MdCircle onClick={() => pageNavigation("hash")} size="1.2rem" style={page === 3 ? {color: "#05C169"} : {}}/>
        </div>
      </div>
      {page === 1 &&
      <div className={s.amount}>
        <h2>Deposit</h2>
        <TextField label="Amount" InputLabelProps={{ shrink: true }} onChange={(e) => setAmount(e.target.value)} value={amount} type="number"/>
        <button className='bigBtn full' style={{...overwrite}} onClick={() => btnClick("qr")}>Deposit  <span style={{...span}}>&rarr;</span></button>
        <button className="bigBtn full" style={{...overwrite}} onClick={() => btnClick("back")}>
          <span style={{...span2}}>&larr;</span> Back To Dashboard
        </button>
      </div>
      }
      {page === 2 &&
        <div className={s.CryptoFund}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="coin">Coin</InputLabel>
            <Select value={coin[selected].title} label="Coin" onChange={handleCoin}>
              {coin.map((item, i) => <MenuItem key={i} value={item.title}>{item.title}</MenuItem>)}
            </Select>
          </FormControl>
          <div className={s.qr}>
              <div id="qr" className={s.imgCtn}>
                <img src={coin[selected].image} alt="QR CODE" loading="eager" width="400" height="400"/>
              </div>
              <div className={s.address}>
                  <p
                  type="text"
                  ref={textAreaRef}
                  onClick={() => handleCopy(coin[selected].address)}
                  >
                    {coin[selected].address}
                  </p>
              </div>
          </div>

          <div className={s.text}>
            <p>Send only <span>{coin[selected].title}({coin[selected].network}) </span>to this address, sending any other coin may result to permanent loss</p>
          </div>

          <button className="bigBtn full" style={{...overwrite}} onClick={() => btnClick("back")}>
            <span style={{...span2}}>&larr;</span> Back To Dashboard
          </button>
          <button className="bigBtn full" style={{...overwrite}} onClick={() => btnClick("hash")}>
            Upload Transaction Hash <span style={{...span}}>&rarr;</span>
          </button>
        </div>
      }

      {page === 3 &&
        <div className={s.hash}>
          <h2>Upload Hash</h2>
          <TextField label="Amount" onChange={(e) => setAmount(e.target.value)} value={amount} type="text"/>
          <TextField label="Transaction Hash" onChange={(e) => setHash(e.target.value)} value={hash} type="text"/>
          <TextField label="Coin" onChange={(e) => setCoinSelected(e.target.value)} value={coinSelected} type="text"/>
          <TextField label="Network" onChange={(e) => setNetwork(e.target.value)} value={network} type="text"/>
          <button className="bigBtn full" style={{...overwrite}} onClick={submitHash}>
            {pending ? "uploading..." : "Upload"}
          </button>
          {error && <p style={{color: "red"}}>{error}</p>}
        </div>
      }

    </div>
  )
  }



  const overwrite = {
    background: "none",
    border: "1px solid #000000",
  }

  const span = {
    fontSize: "1.5em",
    paddingLeft: "1em",
  }

  const span2 = {
    fontSize: "1.5em",
    paddingRight: "1em",
  }
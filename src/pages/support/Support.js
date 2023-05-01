import Nav from '../../components/nav/Nav'
import Copyright from '../../components/copyright/Copyright'
import help1 from '../../assets/help1.png'
import help2 from '../../assets/help2.png'
import help3 from '../../assets/help3.png'
import help4 from '../../assets/help4.png'
import help5 from '../../assets/help5.png'
import help6 from '../../assets/help6.png'
import help7 from '../../assets/help7.png'
import help8 from '../../assets/help8.png'
import Help from '../../components/help/Help'

const helpList = [
  {
    title: 'Getting Started',
    image: help1,
  },
  {
    title: 'Transaction Not Sent',
    image: help2,
  },
  {
    title: 'Buy Crypto With Fiat',
    image: help3,
  },
  {
    title: 'widthdrawal To Bank Account',
    image: help4,
  },
  {
    title: 'Transaction Pending',
    image: help5,
  },
  {
    title: 'Cannot Swap Crypto',
    image: help6,
  },
  {
    title: 'Lost Access To Wallet',
    image: help7,
  },
  {
    title: 'Exodus Public Offering',
    image: help8,
  },
]

export default function Support() {
  return (
    <>
    <Nav />
    <Help list={helpList} />
    <Copyright />
    </>
  )
}

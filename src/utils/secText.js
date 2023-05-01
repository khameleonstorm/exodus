import desktopApp from '../assets/hp-browser-extension-lsize.png';
import mobileDevices from '../assets/mobileDevices.png';
import appsList from '../assets/appsList.svg';
import desktopDevices from '../assets/hp-desktop-crypto-wallet-lsize.png';
import { RiAppsFill, RiSwapFill } from 'react-icons/ri';
import { IoBarChart, IoWallet } from 'react-icons/io5';
import { HiPresentationChartBar } from 'react-icons/hi';
import { TiArrowSyncOutline } from 'react-icons/ti';
import { MdContactSupport } from "react-icons/md"
import { ImPower } from "react-icons/im"

export const bigSec1 = {
  list : [
    {
      id: "01",
      desc: 'Explore Web3 apps',
      icon: RiAppsFill
    },
    {
      id: "02",
      desc: 'Buy crypto with USD and other local currencies',
      icon: IoWallet
    },
    {
      id: "03",
      desc: 'Manage your NFTs across multiple networks',
      icon: HiPresentationChartBar,
    },
  ],
  
  text: {
    image: desktopApp,
    title: "Multichain Web3 Wallet",
    subtitle: "Connect to Ethereum, Solana, BSC, and more networks with one beautiful browser extension",
    cardDesc: "Access DeFi apps, buy NFTs, and explore Web3 without leaving your browser…",
    cardLink: "#",
    cardLinkText: "Web3 Wallet"
  }
}

export const bigSec2 = {
  list : [
    {
      id: "01",
      desc: 'Sync with your Exodus Desktop app',
      icon: TiArrowSyncOutline
    },
    {
      id: "02",
      desc: 'Swap crypto in just two taps',
      icon: RiSwapFill
    },
    {
      id: "03",
      desc: 'Monitor market movements on the go',
      icon: IoBarChart,
    },
  ],

  text: {
    image: mobileDevices,
    title: "Crypto & Web3 on Mobile",
    subtitle: "Manage multiple portfolios, stake and buy crypto, view your NFTs, and explore Web3 on Android and iOS",
    cardDesc: "Experience the world's best cryptocurrency wallet from any location...",
    cardLink: "#",
    cardLinkText: "Mobile Wallet"
  }
}

export const bigSec3 = {
  list : [],

  text: {
    image: desktopDevices,
    title: "Manage Crypto on Desktop",
    subtitle: "Grow your crypto portfolio with the built-in swap feature and Rewards app",
    cardDesc: "Pro-level control to manage your cryptocurrency in one beautiful application…",
    cardLink: "#",
    cardLinkText: "Desktop Wallet"
  }
}

export const bigSec4 = {
  list : [
    {
      id: "01",
      desc: 'Live Chats & Portfolio',
      icon: ImPower
    },
    {
      id: "02",
      desc: 'Built-in Swap',
      icon: RiSwapFill
    },
    {
      id: "03",
      desc: '24/7 Human Support',
      icon: MdContactSupport,
    },
  ],

  text: {
    image: appsList,
    title: "A New World of Crypto Apps",
    subtitle: "Apps transform Exodus to give you more control over your wealth. Discover how to easily earn interest and more...",
    cardDesc: null,
    cardLink: "#",
    cardLinkText: ""
  }
}

export const bigSec5 = {
  list : [],
}
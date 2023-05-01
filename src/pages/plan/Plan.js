import React from 'react'
import Copyright from '../../components/copyright/Copyright'
import Footer from '../../components/footer/Footer'
import Hero from '../../components/hero/Hero'
import InvestmentCard from '../../components/investmentCard/InvestmentCard'
import Nav from '../../components/nav/Nav'
import { plans } from '../../utils/investText'

export default function Plan() {
  return (
    <>
    <Nav />
    <Hero title={plans.subtitle2} subtitle={plans.subtitle} link={"#"}/>
    <InvestmentCard title={plans.title2} subtitle={plans.subtitle2} plans={plans.plans} showHeader={true}/>
    <Footer />
    <Copyright />
    </>
  )
}

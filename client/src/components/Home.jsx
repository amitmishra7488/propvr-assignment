import React from 'react'
import Footer from './Footer'
import BannerSection from './BannerSection'
import Capsules from './Capsules'
import Navbar from './Navbar'

export default function Hme() {
  return (
    <div>
      <Navbar/>
      <BannerSection/>
      <Capsules/>
      <Footer/>
    </div>
  )
}

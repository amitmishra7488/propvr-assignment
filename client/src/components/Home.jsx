import React from 'react'
import Footer from './Footer'
import BannerSection from './BannerSection'
import Movies from './Movies'
import Navbar from './Navbar'

export default function Hme() {
  return (
    <div>
      <Navbar/>
      <BannerSection/>
      <Movies/>
      <Footer/>
    </div>
  )
}

import React from 'react'
import Navbar from '../../../Home/Navbar'
import Hero from '../../../Home/Hero'
import HowItWorks from '../../../Home/HowItWork'
import ExploreLibrary from '../../../Home/Library'
import Stats from '../../../Home/Starts'
import CallToAction from '../../../Home/CTA'
import FAQ from '../../../Home/FAQs'
import Footer from '../../../Home/Footer'

const page = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <HowItWorks />
        <ExploreLibrary />
        {/* <Testimonials /> */}
        <Stats />
        <CallToAction />
        <FAQ />
        {/* <Contact /> */}
        <Footer />
    </div>
  )
}

export default page
import React from 'react'
import Sectionone from '../components/home/Sectionone'
import Newmovies from '../components/home/Newmovies'
import NewSeries from '../components/home/NewSeries'
import Recommend from '../components/home/Recommend'
import RecentlySection from '../components/home/RecentlySection'
import HeroSectionSlider from '../components/home/HeroSectionSlider'

function Home() {
  return (
    <div>
        <HeroSectionSlider />
        <RecentlySection />
        <Sectionone />
        <Newmovies />
        <NewSeries />
        <Recommend />
    </div>
  )
}

export default Home
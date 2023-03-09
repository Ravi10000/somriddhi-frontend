import React from 'react'
import './App.scss'
import Deals from './components/deals/deals'
import Download from './components/download/download'
import Form from './components/form/form'
import Header from './components/header/header'
import Offers from './components/offers/offers'
import PopulatCategories from './components/popular-categories/popular-categories'
import PopularMembership from './components/popular-membership/popular-membership'
import Process from './components/process/process'

export default function App() {
  return (
    <div className='App'>
      <Header />
      <Offers />
      <Deals />
      <PopularMembership />
      <Form />
      <Process />
      <Download />
      <PopulatCategories />
    </div>
  )
}

import React from 'react'
import './App.scss'
import Deals from './components/deals/deals'
import Header from './components/header/header'
import Offers from './components/offers/offers'
import Process from './components/process/process'

export default function App() {
  return (
    <div className='App'>
      <Header />
      <Offers />
      <Deals />
      <Process />
    </div>
  )
}

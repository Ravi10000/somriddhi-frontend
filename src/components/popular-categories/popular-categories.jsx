import './popular-categories.styles.scss';

import React from 'react'

export default function PopulatCategories() {
  return (
    <section className='popular-categories-section'>
        <div className="container">
            <div className="left">
                <img src="/table-bg.png" alt="categories table background" />
            </div>
            <div className="right">
                <h2 className='_title'>Popular Categories</h2>
            </div>
        </div>
    </section>
  )
}

import './popular-categories.styles.scss';

import React from 'react'
import categoriesList from './popular-categories-list';

export default function PopulatCategories() {
    return (
        <section className='popular-categories-section' id='popular-category'>
            <div className="container">
                <div className="left">
                    <img src="/table-bg.png" alt="categories table background" />
                </div>
                <div className="right">
                    <h2 className='_title'>Popular Categories</h2>
                    <div className="categories-table">
                        {
                            categoriesList.map((category, index) => (
                                <div className="category-name" key={category}>
                                    {category}
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

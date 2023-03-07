import './search.styles.scss';

import React from 'react'

export default function Search() {
    return (
        <div className="search">
            <img src="/search.png" alt="search" />
            <input type="search" placeholder='Search For brand, category, coupon'/>
        </div>
    )
}

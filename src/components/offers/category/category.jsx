import './category.styles.scss';

import React from 'react'

export default function Category({ name, img, selected, setSelectedCategory }) {
    return (
        <div className={`category ${selected && 'selected'} `} onClick={() => setSelectedCategory(name)}>
            <img src={img} alt={name} />
            <p>{name}</p>
        </div>
    )
}

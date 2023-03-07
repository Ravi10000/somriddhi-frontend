import './button.styles.scss'
import React from 'react'
export default function Button({ children, ...otherProps }) {
    return (
        <button {...otherProps}>{children}</button>
    )
}

import './header.styles.scss';
import React from 'react'
import Search from '../search/search';
import Button from '../button/button';

export default function Header() {
    return (
        <header>
                <img src="/logo.png" alt="logo" />
                <Search />
                <Button>Login / Sign Up</Button>
        </header>
    )
}

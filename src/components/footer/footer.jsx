import './footer.styles.scss'
import React from 'react'
import navList from './nav-list'
import NavMenu from './nav-menu/nav-menu'

export default function Footer() {
    return (
        <footer className='footer-section'>
            <div className="container">
                <div className="logo-and-download-links">
                    <img src="/logo-light.png" alt="somriddihi logo" />
                    <div className="buttons-container">
                        <button>
                            <img src="/playstore.png" alt="download from play sotre" />
                            <div className="store-details">
                                <p>Download From</p>
                                <h4>Play Store</h4>
                            </div>
                        </button>
                        <button>
                            <img src="/applestore.png" alt="download from apple sotre" />
                            <div className="store-details">
                                <p>Download From</p>
                                <h4>Apple Store</h4>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="menu">
                    {
                        navList.map(({ title, navItems }) => <NavMenu navTitle={title} navItems={navItems} key={title} />)
                    }
                </div>
            </div>
        </footer>
    )
}

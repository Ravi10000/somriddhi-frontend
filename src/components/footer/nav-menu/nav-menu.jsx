import './nav-menu.styles.scss';

export default function NavMenu({ navTitle, navItems }) {
    return (
        <div className='footer-nav-menu'>
            <h3 className='nav-title'>{navTitle}</h3>
            <nav className="nav-links-container">
                {navItems.map(({ name, url }) => 
                <div className='nav-link' key={name}>
                    <a href={url}>
                        <img src="/nav-arrow.png" alt={name} />
                        <p>{name}</p>
                    </a>
                </div>)}
            </nav>
        </div>
    )
}

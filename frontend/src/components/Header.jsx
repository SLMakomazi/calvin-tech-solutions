import { useEffect, useRef, useState } from 'preact/hooks'
import PropTypes from 'prop-types'

import logo from '../assets/cts-logo.png'

const Header = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navContainerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!navContainerRef.current?.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isMenuOpen])

  const handleNavigate = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`cts-header ${isScrolled ? 'cts-header--scrolled' : ''}`}>
      <div className="cts-header__background" aria-hidden="true">
        <span className="cts-header__accent cts-header__accent--glow" />
        <span className="cts-header__accent cts-header__accent--grid" />
        <span className="cts-header__accent cts-header__accent--orb" />
      </div>
      <div className="cts-container cts-header__inner">
        <div className="cts-header__slot cts-header__slot--left">
          <a href="#home" className="cts-brand" aria-label="Calvin Tech Solutions home">
            <img src={logo} alt="Calvin Tech Solutions" className="cts-brand__logo" />
          </a>
        </div>

        <div className="cts-header__slot cts-header__slot--right" ref={navContainerRef}>
          <nav className={`cts-nav ${isMenuOpen ? 'cts-nav--open' : ''}`} aria-label="Primary">
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={handleNavigate}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={`cts-nav-toggle ${isMenuOpen ? 'cts-nav-toggle--active' : ''}`}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="cts-nav-toggle__line" />
            <span className="cts-nav-toggle__line" />
            <span className="cts-nav-toggle__line" />
          </button>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default Header

'use client'

import Link from 'next/link'
import { useState } from 'react'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Energieberatung Scola Startseite"
          onClick={closeMenu}
        >
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Energieberatung Scola</span>
        </Link>

        <nav
          className={`site-nav ${open ? 'is-open' : ''}`}
          aria-label="Hauptnavigation"
        >
          <Link href="/leistungen" onClick={closeMenu}>
            Leistungen
          </Link>

          <Link href="/rechner" onClick={closeMenu}>
            Förder-Check
          </Link>

          <Link href="/effizienz-rechner" onClick={closeMenu}>
            Effizienz-Rechner
          </Link>

          <Link href="/kontakt" onClick={closeMenu}>
            Kontakt
          </Link>

          <Link href="/rechtliches" onClick={closeMenu}>
            Rechtliches
          </Link>
        </nav>

        <a className="header-contact" href="mailto:kontakt@example.de">
          E-Mail schreiben
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOpen(value => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

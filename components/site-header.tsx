'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'

const NAV_LINKS = [
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/rechner', label: 'Förder-Check' },
  { href: '/effizienz-rechner', label: 'Effizienz-Rechner' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/rechtliches', label: 'Rechtliches' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  const navClass = open ? 'site-nav is-open' : 'site-nav'

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
          className={navClass}
          id="mobile-navigation"
          aria-label="Hauptnavigation"
        >
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
        </nav>

        <a className="header-contact" href="mailto:info@energieberatung-scola.de">
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

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="section-wrap">
        <div className="footer-top">
          <div>
            <Link className="brand brand-light" href="/">
              Energieberatung Scola
            </Link>
            <p>
              Herstellerneutrale Energieberatung, Förderbegleitung und
              Energieausweise. Keine Produkt-, Anlagen- oder Handwerksverkäufe.
            </p>
          </div>

          <nav className="footer-links" aria-label="Fußnavigation">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div>
            <p>
              Direkter Kontakt:
              <br />
              <a href="mailto:info@energieberatung-scola.de">info@energieberatung-scola.de</a>
              <br />
              <a href="tel:+4915630101033">015630 101033</a>
            </p>
            <p>Unabhängig. Herstellerneutral. Persönlich.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Energieberatung Scola</span>
          <Link href="/rechtliches">Impressum &amp; Datenschutz</Link>
        </div>
      </div>
    </footer>
  )
}

type PageIntroProps = {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
}

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <section className="hero section-wrap" aria-label={eyebrow}>
      <div className="eyebrow">
        <span className="eyebrow-dot" aria-hidden="true" />
        {eyebrow}
      </div>
      <div className="section-heading">
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </section>
  )
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}

'use client'

import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Energieberatung Scola Startseite">
        <span className="brand-mark"><span /><span /><span /></span>
        <span>Energieberatung Scola</span>
      </Link>
      <nav aria-label="Hauptnavigation">
        <Link href="/leistungen">Leistungen</Link>
        <Link href="/rechner">Förder-Check</Link><Link href="/effizienz-rechner">Effizienz-Rechner</Link>
        <Link href="/kontakt">Kontakt</Link>
        <Link href="/rechtliches">Rechtliches</Link>
      </nav>
      <a className="header-contact" href="mailto:kontakt@example.de">E-Mail schreiben</a>
    </header>
  )
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="hero section-wrap"><div className="eyebrow"><span className="eyebrow-dot" /> {eyebrow}</div><div className="hero-grid"><div><h1>{title}</h1><p className="hero-copy">{children}</p></div></div></section>
}

export function SiteFooter() {
  return <footer className="footer"><div className="section-wrap"><div className="footer-top"><Link className="brand brand-light" href="/"><span className="brand-mark"><span /><span /><span /></span><span>Energieberatung Scola</span></Link><p>Unabhängige Energieberatung<br />für klare Entscheidungen.</p><div className="footer-links"><Link href="/rechtliches#impressum">Impressum</Link><Link href="/rechtliches#datenschutz">Datenschutz</Link><Link href="/rechtliches#vsbg">VSBG</Link></div></div><div className="footer-bottom"><span>© 2026 Energieberatung Scola · Konzeptnachweis</span><Link href="/">Zur Startseite</Link></div></div></footer>
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <><SiteHeader />{children}<SiteFooter /></>
}

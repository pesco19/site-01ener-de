import Link from 'next/link'
import { PageShell } from '@/components/site-header'

const Arrow = () => <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
const Phone = () => <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M5.2 3.2 7.7 2.5l1.6 3.8-1.7 1.4a12.3 12.3 0 0 0 4.7 4.7l1.4-1.7 3.8 1.6-.7 2.5c-.3 1.1-1.4 1.8-2.5 1.6A13.8 13.8 0 0 1 3.6 5.7c-.2-1.1.5-2.2 1.6-2.5Z" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" /></svg>

export default function HomePage() {
  return (
    <PageShell>
      <main>
        <section className="hero section-wrap home-hero" id="start">
          <div className="eyebrow"><span className="eyebrow-dot" /> Unabhängige Energieberatung</div>
          <div className="home-hero-grid">
            <div>
              <h1>Klarheit für Ihre<br /><em>Energieentscheidung.</em></h1>
              <p className="hero-copy">Herstellerneutral, persönlich und verlässlich – von der ersten Analyse bis zur Förderantragstellung.</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/leistungen">Orientierung erhalten <Arrow /></Link>
                <Link className="button button-secondary" href="/rechner">Fördercheck starten <Arrow /></Link>
              </div>
              <div className="direct-contact"><a href="tel:+490000000000"><Phone /><span><small>Direkt sprechen</small>Jetzt anrufen</span></a><a href="mailto:kontakt@example.de"><span><small>Schreiben Sie uns</small>E-Mail senden</span></a></div>
            </div>
            <aside className="home-trust-card"><span className="card-number">01 / UNABHÄNGIG</span><h2>Eine gute Entscheidung beginnt mit einer unabhängigen Einschätzung.</h2><p>Für Erstkäufer und Hausbesitzer, die ihr Vorhaben verständlich und ohne Verkaufsdruck einordnen möchten.</p></aside>
          </div>
        </section>

        <section className="home-paths section-wrap" aria-labelledby="wege-title">
          <div className="section-kicker">Ihr nächster Schritt</div>
          <div className="section-heading"><h2 id="wege-title">Was darf heute<br />klarer werden?</h2><p>Wählen Sie den passenden Einstieg. Die ausführlichen Informationen und Rechner finden Sie jeweils auf einer eigenen Seite.</p></div>
          <div className="entry-grid">
            <Link className="entry-card" href="/leistungen"><span className="card-number">A</span><span><strong>Orientierung erhalten</strong><small>Leistungen kennenlernen, Fragen sortieren und den persönlichen nächsten Schritt finden.</small></span><Arrow /></Link>
            <Link className="entry-card entry-card-accent" href="/rechner"><span className="card-number">B</span><span><strong>Fördercheck starten</strong><small>Vorhaben, Gebäudeart und Beratungswunsch auswählen – vorsichtig und unverbindlich.</small></span><Arrow /></Link>
          </div>
        </section>

        <section className="home-overview light-section" aria-labelledby="overview-title"><div className="section-wrap"><div className="section-kicker">Auf einen Blick</div><div className="section-heading"><h2 id="overview-title">Klar gegliedert.<br />Einfach erreichbar.</h2><p>Leistungen, Fördercheck, Effizienz-Rechner, Kontakt und rechtliche Angaben sind übersichtlich auf eigenen Seiten organisiert.</p></div><div className="overview-links"><Link href="/leistungen"><span>Leistungen</span><small>iSFP, Förderbegleitung und Energieausweise</small><Arrow /></Link><Link href="/effizienz-rechner"><span>Effizienz-Rechner</span><small>Erste Orientierung zum energetischen Zustand</small><Arrow /></Link><Link href="/kontakt"><span>Persönlich anfragen</span><small>Auswahl übernehmen und Gespräch vorbereiten</small><Arrow /></Link></div></div></section>

        <section className="home-note section-wrap"><div className="trust-badge"><span>EEE</span><div><strong>Unabhängig und nachvollziehbar</strong><p>Gelistet in der Energieeffizienz-Expertenliste der dena – Angaben und Listennummer werden vor Veröffentlichung ergänzt.</p><Link href="/rechtliches">Nachweise und Rechtliches ansehen <Arrow /></Link></div></div></section>
      </main>
    </PageShell>
  )
}

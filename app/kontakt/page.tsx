'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { PageIntro, PageShell } from '@/components/site-header'

function ContactForm() {
  const params = useSearchParams()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const project = params.get('vorhaben') || ''
  const building = params.get('gebaeude') || ''
  const year = params.get('baujahr') || ''
  const score = params.get('kennwert') || ''
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (!String(data.get('name')).trim()) return setError('Bitte geben Sie Ihren Namen ein.')
    if (!String(data.get('email')).trim() && !String(data.get('phone')).trim()) return setError('Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.')
    setError('')
    setSent(true)
  }
  if (sent) return <div className="success-box"><h2>Danke für Ihre Anfrage.</h2><p>Ihre Angaben wurden in dieser Demo vorbereitet. Die tatsächliche Übermittlung ist noch nicht verbunden.</p></div>
  return <form className="contact-form" onSubmit={submit}><div className="form-section-title">Kontakt</div><label>Name *<input name="name" autoComplete="name" placeholder="Ihr Name" /></label><div className="form-row"><label>E-Mail<input name="email" type="email" autoComplete="email" placeholder="name@beispiel.de" /></label><label>Telefon<input name="phone" autoComplete="tel" placeholder="Optional" /></label></div><div className="form-section-title">Ihr Vorhaben</div><div className="form-row"><label>Vorhaben<input name="project" defaultValue={project} placeholder="Noch nicht gewählt" /></label><label>Gebäudeart<input name="building" defaultValue={building} placeholder="Noch nicht gewählt" /></label></div><div className="form-row"><label>Baujahr / Einordnung<input name="year" defaultValue={year} placeholder="z. B. vor 1977" /></label><label>Ergebnis Effizienz-Rechner<input name="score" defaultValue={score ? `${score} kWh/m²a` : ''} placeholder="Optional" /></label></div><label>Ihre Nachricht<textarea name="message" rows={5} placeholder="Was möchten Sie vorab klären? Welche Unterlagen oder Fragen liegen bereits vor?" /></label><p className="form-help">Hilfreich sind, soweit vorhanden: Baujahr, Wohnfläche, Energieträger, Verbrauch, geplante Maßnahme und aktueller Stand. Bitte senden Sie zunächst keine sensiblen Dokumente.</p><label className="check-label"><input type="checkbox" required /> Ich stimme der Kontaktaufnahme zu. *</label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-dark">Anfrage vorbereiten →</button></form>
}

export default function KontaktPage() { return <PageShell><PageIntro eyebrow="Persönlicher Kontakt" title={<>Je mehr Kontext,<br /><em>desto klarer der Start.</em></>}>Geben Sie nur an, was Sie bereits wissen. Fehlende Angaben können wir im Gespräch klären. Eine echte Übermittlung findet in diesem Konzeptnachweis noch nicht statt.</PageIntro><main className="contact-section"><div className="section-wrap contact-grid"><Suspense fallback={<p>Kontaktformular wird geladen.</p>}><ContactForm /></Suspense><aside className="side-note"><strong>Was danach passiert</strong><p>Wir ordnen Ihr Anliegen, prüfen die nächsten sinnvollen Unterlagen und besprechen offen, welche Beratung wirklich benötigt wird.</p><a href="tel:+490000000000">Rückruf vereinbaren →</a></aside></div></main></PageShell> }

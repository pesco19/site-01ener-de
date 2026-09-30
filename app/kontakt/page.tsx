'use client'

import { useState } from 'react'
import { PageIntro, PageShell } from '@/components/site-header'

function ContactForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [captcha, setCaptcha] = useState(() => {
    const a = 1 + Math.floor(Math.random() * 9)
    const b = 1 + Math.floor(Math.random() * 9)
    return { a, b }
  })
  const [answer, setAnswer] = useState('')

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const message = String(data.get('message') || '').trim()
    const year = String(data.get('year') || '').trim()
    if (!name) return setError('Bitte geben Sie Ihren Namen ein.')
    if (!email && !phone) return setError('Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.')
    if (Number(answer) !== captcha.a + captcha.b) {
      setError('Die Sicherheitsfrage wurde nicht richtig beantwortet.')
      const a = 1 + Math.floor(Math.random() * 9)
      const b = 1 + Math.floor(Math.random() * 9)
      setCaptcha({ a, b })
      setAnswer('')
      return
    }
    setError('')
    const lines = ['Name: ' + name]
    if (email) lines.push('E-Mail: ' + email)
    if (phone) lines.push('Telefon: ' + phone)
    if (year) lines.push('Baujahr: ' + year)
    lines.push('', 'Nachricht:', message || '(keine Nachricht)')
    const subject = 'Anfrage über Website – ' + name
    const mailto = 'mailto:info@energieberatung-scola.de?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'))
    window.location.href = mailto
    setSent(true)
  }

  if (sent) return <div className="success-box"><h2>Danke für Ihre Anfrage.</h2><p>Ihr E-Mail-Programm wurde mit der vorbereiteten Nachricht geöffnet. Bitte senden Sie diese dort ab. Alternativ erreichen Sie uns direkt unter <a href="mailto:info@energieberatung-scola.de">info@energieberatung-scola.de</a> oder <a href="tel:+4915630101033">015630 101033</a>.</p></div>

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-section-title">Kontakt</div>
      <label>Name *<input name="name" autoComplete="name" placeholder="Ihr Name" /></label>
      <div className="form-row">
        <label>E-Mail<input name="email" type="email" autoComplete="email" placeholder="name@beispiel.de" /></label>
        <label>Telefon<input name="phone" autoComplete="tel" placeholder="Optional" /></label>
      </div>
      <div className="form-section-title">Ihr Vorhaben</div>
      <div className="form-row">
        <label>Baujahr<input name="year" placeholder="z. B. vor 1977" /></label>
        <label>Sicherheitsfrage *<span className="form-help">Wie viel ist {captcha.a} + {captcha.b}?</span><input inputMode="numeric" value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Ihre Antwort" /></label>
      </div>
      <label>Ihre Nachricht<textarea name="message" rows={5} placeholder="Was möchten Sie vorab klären? Welche Unterlagen oder Fragen liegen bereits vor?" /></label>
      <p className="form-help">Die Nachricht wird über Ihr eigenes E-Mail-Programm versendet. Es finden keine Datei-Uploads und keine Speicherung auf dieser Seite statt.</p>
      <label className="check-label"><input type="checkbox" required /> Ich stimme der Kontaktaufnahme zu. *</label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-dark">Nachricht vorbereiten und versenden →</button>
    </form>
  )
}

export default function KontaktPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Persönlicher Kontakt" title={<>Je mehr Kontext,<br /><em>desto klarer der Start.</em></>}>Geben Sie nur an, was Sie bereits wissen. Bestätigen Sie die Sicherheitsfrage – Ihr E-Mail-Programm öffnet sich mit der fertigen Nachricht.</PageIntro>
      <main className="contact-section">
        <div className="section-wrap contact-grid">
          <ContactForm />
          <aside className="side-note"><strong>Was danach passiert</strong><p>Wir ordnen Ihr Anliegen, prüfen die nächsten sinnvollen Unterlagen und besprechen offen, welche Beratung wirklich benötigt wird.</p><a href="tel:+4915630101033">Rückruf vereinbaren →</a></aside>
        </div>
      </main>
    </PageShell>
  )
}

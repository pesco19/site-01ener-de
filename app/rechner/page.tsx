'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { PageIntro, PageShell } from '@/components/site-header'

const options = {
  project: ['Heizungstausch', 'Dämmung / Fenster', 'Gesamtsanierung', 'Erstberatung gewünscht'],
  building: ['Ein- / Zweifamilienhaus', 'Mehrfamilienhaus'],
  age: ['Vor 1977', '1977–2001', 'Ab 2002', 'Unbekannt'],
  status: ['Erste Überlegung', 'Angebote liegen vor', 'Maßnahme beauftragt', 'Bereits begonnen'],
}

export default function RechnerPage() {
  const [answers, setAnswers] = useState({ project: '', building: '', age: '', status: '' })
  const complete = Object.values(answers).every(Boolean)
  const result = useMemo(() => {
    if (!complete) return null
    if (answers.status === 'Bereits begonnen') return { title: 'Sofort persönlich prüfen', text: 'Bei bereits begonnenen Maßnahmen können Fördervoraussetzungen oder Fristen betroffen sein. Bitte reichen Sie vor weiteren Schritten die Unterlagen zur Prüfung ein.' }
    if (answers.project === 'Gesamtsanierung') return { title: 'Förderwege können zusammenspielen', text: 'Bei einer Gesamtsanierung kommen unterschiedliche Förderbausteine in Betracht. Welche Kombination passt, hängt vom Gebäude, der Planung und dem Zeitpunkt ab.' }
    return { title: 'Mögliche Förderbereiche erkennen', text: 'Für Ihr Vorhaben kann eine Förderung grundsätzlich in Betracht kommen. Förderhöhe, Voraussetzungen und Aktualität werden vor Antragstellung persönlich geprüft.' }
  }, [answers, complete])
  const set = (key: keyof typeof answers, value: string) => setAnswers(current => ({ ...current, [key]: value }))

  return <PageShell><PageIntro eyebrow="Förder-Checker" title={<>Nicht raten.<br /><em>Erst prüfen.</em></>}>Vier kurze Angaben helfen dabei, den nächsten sinnvollen Schritt einzuordnen. Das Ergebnis ist unverbindlich und keine Förderzusage.</PageIntro><main className="checker-section section-wrap"><div className="checker-layout"><div className="checker-box"><div className="step-list" aria-label="Fortschritt"><span className={answers.project ? 'active' : ''}>01 Vorhaben</span><span className={answers.building ? 'active' : ''}>02 Gebäude</span><span className={answers.age ? 'active' : ''}>03 Baujahr</span><span className={answers.status ? 'active' : ''}>04 Stand</span></div><div className="calculator-grid"><label>Was planen Sie?<select value={answers.project} onChange={e => set('project', e.target.value)}><option value="">Bitte auswählen</option>{options.project.map(item => <option key={item}>{item}</option>)}</select></label><label>Gebäudeart<select value={answers.building} onChange={e => set('building', e.target.value)}><option value="">Bitte auswählen</option>{options.building.map(item => <option key={item}>{item}</option>)}</select></label><label>Baujahr des Gebäudes<select value={answers.age} onChange={e => set('age', e.target.value)}><option value="">Bitte auswählen</option>{options.age.map(item => <option key={item}>{item}</option>)}</select></label><label>Wie weit sind Sie?<select value={answers.status} onChange={e => set('status', e.target.value)}><option value="">Bitte auswählen</option>{options.status.map(item => <option key={item}>{item}</option>)}</select></label></div>{result ? <div className="result-box"><span className="result-label">Ihre vorsichtige Einordnung</span><h2>{result.title}</h2><p>{result.text}</p><p className="small-note">Ein iSFP kann bei passenden Voraussetzungen die Förderplanung ergänzen. Die individuelle Prüfung bleibt erforderlich.</p><Link className="button button-dark" href={`/kontakt?vorhaben=${encodeURIComponent(answers.project)}&gebaeude=${encodeURIComponent(answers.building)}&baujahr=${encodeURIComponent(answers.age)}`}>Auswahl in Anfrage übernehmen →</Link></div> : <p className="checker-hint">Bitte füllen Sie die vier Felder aus. So vermeiden wir eine scheinbar genaue, aber unvollständige Aussage.</p>}</div><aside className="side-note"><strong>Wichtig vor dem Start</strong><p>Beauftragen oder beginnen Sie eine Maßnahme möglichst erst, wenn die Fördervoraussetzungen und der richtige Antragweg geklärt sind.</p><Link href="/leistungen">Was wir prüfen können →</Link></aside></div></main></PageShell>
}

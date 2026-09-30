'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { PageIntro, PageShell } from '@/components/site-header'

type FormState = { area: string; consumption: string; energy: string; heating: string }

const initialForm: FormState = { area: '', consumption: '', energy: '', heating: '' }

const LIMITS: Record<string, { low: number; mid: number; label: string; note: string }> = {
  wp: { low: 50, mid: 100, label: 'Wärmepumpe', note: 'Bei Wärmepumpen zählt der Stromverbrauch – niedrige Werte sind hier normal.' },
  fw: { low: 55, mid: 110, label: 'Fernwärme', note: 'Fernwärme wird je nach Netz unterschiedlich bewertet.' },
  strom: { low: 50, mid: 100, label: 'Stromheizung', note: 'Direktstromheizungen (z. B. Nachtspeicher) sind meist sehr ineffizient.' },
  gas: { low: 70, mid: 160, label: 'Gas', note: 'Ein Gas-Altbestand liegt oft deutlich über 160 kWh/m²a.' },
  oel: { low: 70, mid: 160, label: 'Heizöl', note: 'Ölheizungen älter als 20 Jahre sind häufig Sanierungskandidaten.' },
  holz: { low: 80, mid: 170, label: 'Holz / Pellets', note: 'Ältere Holz-Anlagen verlieren mit der Zeit Wirkungsgrad.' },
}

export default function EffizienzRechnerPage() {
  const [form, setForm] = useState(initialForm)
  const set = (key: keyof FormState, value: string) => setForm(current => ({ ...current, [key]: value }))

  const result = useMemo(() => {
    const area = Number(form.area)
    const consumption = Number(form.consumption)
    if (!Number.isFinite(area) || area <= 0 || !Number.isFinite(consumption) || consumption <= 0 || !form.energy) return null
    const L = LIMITS[form.energy]
    const value = Math.round(consumption / area)
    const level = value < L.low ? 'niedrigen Verbrauch' : value < L.mid ? 'mittleren Verbrauch' : 'erhöhten Verbrauch'
    const klass = value < L.low ? 'Gute energetische Ausgangslage.' : value < L.mid ? 'Durchschnittlicher Wert – Verbesserungspotenzial vorhanden.' : 'Erhöhter Verbrauch – Sanierungsbedarf wahrscheinlich.'
    let hint = ''
    if (form.heating === 'Über 20 Jahre') hint = 'Ihre Heizung ist über 20 Jahre alt – ein Anlagen-Check oder Tausch ist oft der wirksamste Schritt.'
    else if (form.heating === '10–20 Jahre') hint = 'Bei einer 10–20 Jahre alten Heizung lohnt eine Effizienzprüfung.'
    else if (form.heating === 'Unter 10 Jahre') hint = 'Ihre Heizung ist relativ neu – Verbesserungen sind vor allem an der Gebäudehülle möglich.'
    if (value >= L.mid) hint = (hint ? hint + ' ' : '') + 'Für eine belastbare Bewertung ist eine Gebäudeanalyse sinnvoll.'
    if (!hint) hint = 'Der Kennwert ist eine grobe Orientierung und ersetzt keinen Energieausweis.'
    return { value, level, L, klass, hint }
  }, [form])

  return (
    <PageShell>
      <PageIntro eyebrow="Effizienz-Rechner" title={<>Ihr Gebäude<br /><em>kurz eingeordnet.</em></>}>Der Kennwert wird je nach Energieträger unterschiedlich bewertet: Eine Wärmepumpe mit 120 kWh/m²a ist etwas anderes als ein Ölhaus mit 120 kWh/m²a.</PageIntro>
      <main className="checker-section section-wrap" aria-labelledby="effizienz-form-title">
        <div className="checker-layout">
          <div className="checker-box">
            <div className="step-list" aria-label="Rechenschritte"><span className={form.area ? 'active' : ''}>01 Fläche</span><span className={form.consumption ? 'active' : ''}>02 Verbrauch</span><span className={form.energy ? 'active' : ''}>03 Energieträger</span></div>
            <h2 id="effizienz-form-title" className="sr-only">Eingaben zum Effizienz-Rechner</h2>
            <div className="calculator-grid">
              <label>Wohnfläche in m²<input inputMode="decimal" type="number" min="1" step="1" value={form.area} onChange={e => set('area', e.target.value)} placeholder="z. B. 140" /></label>
              <label>Jahresverbrauch in kWh<input inputMode="decimal" type="number" min="1" step="100" value={form.consumption} onChange={e => set('consumption', e.target.value)} placeholder="z. B. 18.000" /></label>
              <label>Energieträger<select value={form.energy} onChange={e => set('energy', e.target.value)}><option value="">Bitte auswählen</option><option value="gas">Gas</option><option value="oel">Heizöl</option><option value="wp">Wärmepumpe</option><option value="fw">Fernwärme</option><option value="holz">Holz / Pellets</option><option value="strom">Strom (direkt)</option></select></label>
              <label>Alter der Heizung <span className="optional-label">optional</span><select value={form.heating} onChange={e => set('heating', e.target.value)}><option value="">Bitte auswählen</option><option>Unter 10 Jahre</option><option>10–20 Jahre</option><option>Über 20 Jahre</option><option>Unbekannt</option></select></label>
            </div>
            {!result && (form.area || form.consumption || form.energy) && <p className="checker-hint" role="status">Für die Einordnung benötigen wir Fläche, Jahresverbrauch und Energieträger.</p>}
            {result && <div className="result-box" aria-live="polite"><span className="result-label">Ihre erste Einordnung</span><h2>{result.value} kWh/m²a – {result.level}</h2><p>Als {result.L.label} gilt: bis ca. {result.L.low} kWh/m²a niedrig, bis ca. {result.L.mid} kWh/m²a mittel.</p><p>{result.klass} {result.L.note}</p><p className="small-note">{result.hint} Es werden keine Daten gespeichert oder übertragen.</p><div className="result-actions"><Link className="button button-dark" href="/kontakt">Ergebnis besprechen</Link><button className="button button-light" type="button" onClick={() => setForm(initialForm)}>Zurücksetzen</button></div></div>}
          </div>
          <aside className="side-note"><strong>Was sagt der Wert aus?</strong><p>Der Kennwert setzt Ihren Jahresverbrauch ins Verhältnis zur Wohnfläche. Wetter, Warmwasser und Nutzung können das Ergebnis deutlich beeinflussen.</p><a href="tel:+4915630101033">Direkt anrufen: 015630 101033</a></aside>
        </div>
      </main>
    </PageShell>
  )
}

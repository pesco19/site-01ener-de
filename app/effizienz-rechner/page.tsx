'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { PageIntro, PageShell } from '@/components/site-header'

type FormState = { area: string; consumption: string; energy: string; year: string; heating: string }

const initialForm: FormState = { area: '', consumption: '', energy: '', year: '', heating: '' }

export default function EffizienzRechnerPage() {
  const [form, setForm] = useState(initialForm)
  const set = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }))
  const result = useMemo(() => {
    const area = Number(form.area)
    const consumption = Number(form.consumption)
    if (!Number.isFinite(area) || !Number.isFinite(consumption) || area <= 0 || consumption <= 0 || !form.energy) return null
    const value = Math.round(consumption / area)
    const level = value < 75 ? 'vergleichsweise niedrigen Verbrauch' : value < 150 ? 'mittleren Verbrauch' : 'erhöhten Verbrauch'
    const nextStep = value >= 150 || form.heating === 'Über 20 Jahre' ? 'Eine persönliche Gebäude- und Anlagenprüfung kann besonders sinnvoll sein.' : 'Für eine belastbare Einordnung fehlen noch Gebäudehülle, Warmwasser und Anlagendaten.'
    return { value, level, nextStep }
  }, [form])

  return (
    <PageShell>
      <PageIntro eyebrow="Effizienz-Rechner" title={<>Ihr Gebäude<br /><em>kurz eingeordnet.</em></>}>Mit Wohnfläche und Jahresverbrauch entsteht ein grober Kennwert. Er ersetzt keinen Energieausweis und keine Vor-Ort-Beratung.</PageIntro>
      <main className="checker-section section-wrap" aria-labelledby="effizienz-form-title">
        <div className="checker-layout">
          <div className="checker-box">
            <div className="step-list" aria-label="Rechenschritte"><span className={form.area ? 'active' : ''}>01 Fläche</span><span className={form.consumption ? 'active' : ''}>02 Verbrauch</span><span className={form.energy ? 'active' : ''}>03 Energieträger</span></div>
            <h2 id="effizienz-form-title" className="sr-only">Eingaben zum Effizienz-Rechner</h2>
            <div className="calculator-grid">
              <label>Wohnfläche in m²<input inputMode="decimal" type="number" min="1" step="1" value={form.area} onChange={(e) => set('area', e.target.value)} placeholder="z. B. 140" /></label>
              <label>Jahresverbrauch in kWh<input inputMode="decimal" type="number" min="1" step="100" value={form.consumption} onChange={(e) => set('consumption', e.target.value)} placeholder="z. B. 18.000" /></label>
              <label>Energieträger<select value={form.energy} onChange={(e) => set('energy', e.target.value)}><option value="">Bitte auswählen</option><option>Gas</option><option>Heizöl</option><option>Wärmepumpe</option><option>Fernwärme</option><option>Holz / Pellets</option><option>Andere</option></select></label>
              <label>Baujahr <span className="optional-label">optional</span><select value={form.year} onChange={(e) => set('year', e.target.value)}><option value="">Bitte auswählen</option><option>Vor 1977</option><option>1977–2001</option><option>Ab 2002</option><option>Unbekannt</option></select></label>
              <label>Heizungsalter <span className="optional-label">optional</span><select value={form.heating} onChange={(e) => set('heating', e.target.value)}><option value="">Bitte auswählen</option><option>Unter 10 Jahre</option><option>10–20 Jahre</option><option>Über 20 Jahre</option><option>Unbekannt</option></select></label>
            </div>
            {!result && (form.area || form.consumption || form.energy) && <p className="checker-hint" role="status">Für die Einordnung benötigen wir Fläche, Jahresverbrauch und Energieträger.</p>}
            {result && <div className="result-box" aria-live="polite"><span className="result-label">Ihre erste Einordnung</span><h2>{result.value} kWh/m²a</h2><p>Das entspricht einem {result.level}. {result.nextStep}</p><p className="small-note">Der Kennwert ist eine grobe Orientierung. Es werden keine Daten gespeichert oder übertragen.</p><div className="result-actions"><Link className="button button-dark" href="/kontakt">Persönliche Prüfung anfragen</Link><button className="button button-light" type="button" onClick={() => setForm(initialForm)}>Zurücksetzen</button></div></div>}
          </div>
          <aside className="side-note"><strong>Was sagt der Wert aus?</strong><p>Der Kennwert setzt Ihren Jahresverbrauch ins Verhältnis zur Wohnfläche. Wetter, Warmwasser und Nutzung können das Ergebnis deutlich beeinflussen.</p><Link href="/rechner">Zum Förder-Checker →</Link></aside>
        </div>
      </main>
    </PageShell>
  )
}

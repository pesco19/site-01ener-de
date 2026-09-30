'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { PageIntro, PageShell } from '@/components/site-header'

type FormState = {
  costs: string
  units: string
  selfUsed: string
  income: string
  child: string
  oldHeating: string
  heatingAge: string
  status: string
}

const initialForm: FormState = {
  costs: '',
  units: '1',
  selfUsed: 'Ja',
  income: '',
  child: 'Nein',
  oldHeating: '',
  heatingAge: '',
  status: '',
}

const euro = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

function getFundingCap(units: number) {
  if (units <= 0) return 0

  let cap = 28_000

  if (units >= 2) {
    cap += Math.min(units - 1, 5) * 15_000
  }

  if (units >= 7) {
    cap += (units - 6) * 8_000
  }

  return cap
}

function getIncomeBonus(
  income: number,
  child: boolean,
): number {
  const limitShift = child ? 10_000 : 0

  if (income <= 30_000 + limitShift) return 40
  if (income <= 40_000 + limitShift) return 30
  if (income <= 50_000 + limitShift) return 10

  return 0
}

export default function RechnerPage() {
  const [form, setForm] = useState<FormState>(initialForm)

  const set = (key: keyof FormState, value: string) => {
    setForm(current => ({
      ...current,
      [key]: value,
    }))
  }

  const result = useMemo(() => {
    const costs = Number(form.costs)
    const units = Number(form.units)
    const income = Number(form.income)

    if (
      !Number.isFinite(costs) ||
      costs <= 0 ||
      !Number.isFinite(units) ||
      units < 1 ||
      !form.income ||
      !form.oldHeating ||
      !form.heatingAge ||
      !form.status
    ) {
      return null
    }

    const fundingCap = getFundingCap(units)

    const eligibleCosts = Math.min(costs, fundingCap)

    const basicRate = 30

    const climateBonus =
      form.selfUsed === 'Ja' &&
      (
        form.oldHeating === 'Öl' ||
        form.oldHeating === 'Kohle' ||
        form.oldHeating === 'Nachtspeicher' ||
        form.oldHeating === 'Gasetagenheizung' ||
        (
          (form.oldHeating === 'Gas' ||
            form.oldHeating === 'Biomasse') &&
          form.heatingAge === '20 Jahre oder älter'
        )
      )
        ? 16
        : 0

    const incomeBonus =
      form.selfUsed === 'Ja'
        ? getIncomeBonus(income, form.child === 'Ja')
        : 0

    const maximumRate =
      income <= 30_000 +
        (form.child === 'Ja' ? 10_000 : 0)
        ? 80
        : 70

    const totalRate = Math.min(
      basicRate + climateBonus + incomeBonus,
      maximumRate,
    )

    const estimatedGrant =
      Math.round((eligibleCosts * totalRate) / 100)

    const ownShare =
      Math.max(costs - estimatedGrant, 0)

    const capped =
      costs > fundingCap

    const reasons: string[] = []

    if (climateBonus > 0) {
      reasons.push(
        'Der Klimageschwindigkeitsbonus wurde berücksichtigt.',
      )
    }

    if (incomeBonus > 0) {
      reasons.push(
        `Der Einkommensbonus von ${incomeBonus} % wurde berücksichtigt.`,
      )
    }

    if (capped) {
      reasons.push(
        `Für die Berechnung werden höchstens ${euro.format(
          fundingCap,
        )} förderfähige Kosten angesetzt.`,
      )
    }

    if (form.status === 'Bereits begonnen') {
      reasons.push(
        'Achtung: Bei bereits begonnenen Maßnahmen kann eine Förderung ausgeschlossen oder gefährdet sein.',
      )
    }

    return {
      eligibleCosts,
      fundingCap,
      basicRate,
      climateBonus,
      incomeBonus,
      totalRate,
      estimatedGrant,
      ownShare,
      capped,
      reasons,
    }
  }, [form])

  return (
    <PageShell>
      <PageIntro
        eyebrow="Förder-Rechner"
        title={
          <>
            Was könnte
            <br />
            <em>förderfähig sein?</em>
          </>
        }
      >
        Berechnen Sie eine erste Orientierung für einen Heizungswechsel
        auf Grundlage der aktuellen BEG-Förderlogik.
      </PageIntro>

      <main className="checker-section section-wrap">
        <div className="checker-layout">
          <div className="checker-box">
            <div
              className="step-list"
              aria-label="Rechnerstatus"
            >
              <span className={form.costs ? 'active' : ''}>
                01 Kosten
              </span>
              <span className={form.units ? 'active' : ''}>
                02 Gebäude
              </span>
              <span className={form.income ? 'active' : ''}>
                03 Einkommen
              </span>
              <span className={form.oldHeating ? 'active' : ''}>
                04 Heizung
              </span>
            </div>

            <div className="calculator-grid">
              <label>
                Voraussichtliche Investitionskosten
                <span className="input-help">
                  inklusive förderfähiger Nebenarbeiten
                </span>
                <div className="input-with-unit">
                  <input
                    inputMode="decimal"
                    type="number"
                    min="1"
                    step="500"
                    value={form.costs}
                    onChange={e =>
                      set('costs', e.target.value)
                    }
                    placeholder="z. B. 32.000"
                  />
                  <span>€</span>
                </div>
              </label>

              <label>
                Anzahl der Wohneinheiten
                <span className="input-help">
                  im Gebäude nach der Sanierung
                </span>
                <input
                  inputMode="numeric"
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  value={form.units}
                  onChange={e =>
                    set('units', e.target.value)
                  }
                />
              </label>

              <label>
                Selbst genutzte Wohneinheit?
                <select
                  value={form.selfUsed}
                  onChange={e =>
                    set('selfUsed', e.target.value)
                  }
                >
                  <option>Ja</option>
                  <option>Nein</option>
                </select>
              </label>

              <label>
                Zu versteuerndes Haushaltsjahreseinkommen
                <span className="input-help">
                  nicht Bruttoeinkommen
                </span>
                <div className="input-with-unit">
                  <input
                    inputMode="decimal"
                    type="number"
                    min="0"
                    step="1000"
                    value={form.income}
                    onChange={e =>
                      set('income', e.target.value)
                    }
                    placeholder="z. B. 45.000"
                  />
                  <span>€</span>
                </div>
              </label>

              <label>
                Kindergeldberechtigtes Kind unter 18?
                <select
                  value={form.child}
                  onChange={e =>
                    set('child', e.target.value)
                  }
                >
                  <option>Nein</option>
                  <option>Ja</option>
                </select>
              </label>

              <label>
                Bestehender Energieträger
                <select
                  value={form.oldHeating}
                  onChange={e =>
                    set('oldHeating', e.target.value)
                  }
                >
                  <option value="">
                    Bitte auswählen
                  </option>
                  <option>Gas</option>
                  <option>Öl</option>
                  <option>Biomasse</option>
                  <option>Kohle</option>
                  <option>Gasetagenheizung</option>
                  <option>Nachtspeicher</option>
                  <option>Andere</option>
                </select>
              </label>

              <label>
                Alter der bestehenden Heizung
                <select
                  value={form.heatingAge}
                  onChange={e =>
                    set('heatingAge', e.target.value)
                  }
                >
                  <option value="">
                    Bitte auswählen
                  </option>
                  <option>Unter 20 Jahre</option>
                  <option>20 Jahre oder älter</option>
                  <option>Unbekannt</option>
                </select>
              </label>

              <label>
                Stand der Maßnahme
                <select
                  value={form.status}
                  onChange={e =>
                    set('status', e.target.value)
                  }
                >
                  <option value="">
                    Bitte auswählen
                  </option>
                  <option>Erste Überlegung</option>
                  <option>Angebot liegt vor</option>
                  <option>Beauftragt</option>
                  <option>Bereits begonnen</option>
                </select>
              </label>
            </div>

            {result && (
              <div
                className="result-box"
                aria-live="polite"
              >
                <span className="result-label">
                  Vorläufige Berechnung
                </span>

                <div className="funding-result">
                  <span>Voraussichtlicher Zuschuss</span>
                  <strong>
                    {euro.format(result.estimatedGrant)}
                  </strong>
                </div>

                <div className="funding-meta">
                  <div>
                    <span>Fördersatz</span>
                    <strong>
                      {result.totalRate} %
                    </strong>
                  </div>

                  <div>
                    <span>Berücksichtigte Kosten</span>
                    <strong>
                      {euro.format(result.eligibleCosts)}
                    </strong>
                  </div>

                  <div>
                    <span>Eigenanteil nach Zuschuss*</span>
                    <strong>
                      {euro.format(result.ownShare)}
                    </strong>
                  </div>
                </div>

                <div className="funding-breakdown">
                  <strong>Zusammensetzung</strong>

                  <p>
                    Grundförderung: {result.basicRate} %
                  </p>

                  {result.climateBonus > 0 && (
                    <p>
                      Klimageschwindigkeitsbonus:{' '}
                      +{result.climateBonus} %
                    </p>
                  )}

                  {result.incomeBonus > 0 && (
                    <p>
                      Einkommensbonus:{' '}
                      +{result.incomeBonus} %
                    </p>
                  )}
                </div>

                {result.reasons.length > 0 && (
                  <div className="funding-notes">
                    {result.reasons.map(reason => (
                      <p key={reason}>• {reason}</p>
                    ))}
                  </div>
                )}

                <p className="small-note">
                  * Vereinfachte Modellrechnung. Förderfähigkeit,
                  technische Anforderungen, Antragstellung und
                  tatsächlich anerkennbare Kosten müssen vor
                  Beauftragung geprüft werden.
                </p>

                <div className="result-actions">
                  <Link
                    className="button button-dark"
                    href="/kontakt"
                  >
                    Berechnung prüfen lassen →
                  </Link>

                  <button
                    className="button button-light"
                    type="button"
                    onClick={() =>
                      setForm(initialForm)
                    }
                  >
                    Zurücksetzen
                  </button>
                </div>
              </div>
            )}

            {!result && (
              <p className="checker-hint">
                Tragen Sie die Daten ein. Der Rechner zeigt
                anschließend die einzelnen Förderbausteine und
                die daraus resultierende Orientierung.
              </p>
            )}
          </div>

          <aside className="side-note">
            <strong>Wichtig</strong>

            <p>
              Der Rechner bildet die derzeit bekannten
              Förderparameter vereinfacht ab. Er ist keine
              Förderzusage und ersetzt nicht die Prüfung der
              technischen Voraussetzungen.
            </p>

            <p>
              Besonders wichtig: Förderanträge sollten vor
              dem förderschädlichen Beginn der Maßnahme
              geklärt werden.
            </p>

            <Link href="/leistungen">
              Was wir prüfen können →
            </Link>
          </aside>
        </div>
      </main>
    </PageShell>
  )
}

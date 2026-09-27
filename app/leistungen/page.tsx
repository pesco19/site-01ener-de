import { PageIntro, PageShell } from '@/components/site-header'

const services = [
  ['01', 'Individueller Sanierungsfahrplan', 'Ein verständlicher Fahrplan für die energetische Entwicklung Ihres Gebäudes – Schritt für Schritt.', 'BAFA-Beratungsförderung prüfen'],
  ['02', 'BAFA- & KfW-Förderbegleitung', 'Orientierung und Begleitung bei Einzelmaßnahmen an Gebäudehülle, Anlagentechnik und Heizung.', 'Voraussetzungen persönlich klären'],
  ['03', 'Energieausweise gemäß GEG', 'Bedarfs- und Verbrauchsausweise sorgfältig erstellt und verständlich erklärt.', 'Bedarf oder Verbrauch ermitteln'],
]

export default function LeistungenPage() {
  return <PageShell><PageIntro eyebrow="Leistungen" title={<>Unabhängig beraten.<br /><em>Besser entscheiden.</em></>}>Wir verkaufen keine Produkte, Anlagen oder Handwerksleistungen. Unser Blick bleibt an Ihrer Seite – herstellerneutral und persönlich.</PageIntro><main className="light-section"><div className="section-wrap"><div className="service-grid">{services.map(([number, title, text, foot]) => <article className="service-card" key={title}><div className="service-icon">{number}</div><h2>{title}</h2><p>{text}</p><span className="service-foot">{foot}</span></article>)}</div><div className="independence"><div><strong>100 % im Interesse des Bauherrn</strong><p>Kein Verkauf von Produkten, Anlagen oder Handwerksleistungen.</p></div><a className="text-button" href="/kontakt">Gespräch anfragen →</a></div></div></main></PageShell>
}

"use client"

import {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
} from "chart.js"
import {Bar, Line} from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, Tooltip)

function fmt(n: number, d = 0) {
  if (isNaN(n) || !isFinite(n)) return "—"
  return new Intl.NumberFormat("pl-PL", {
    maximumFractionDigits: d,
    minimumFractionDigits: d,
  }).format(Math.round(n * Math.pow(10, d)) / Math.pow(10, d))
}

function btcPriceAt(base: number, yr: number) {
  let p = base
  if (yr >= 4) p *= 2
  if (yr >= 8) p *= 2
  if (yr >= 12) p *= 2
  return p
}

function plantCount(yr: number, total: number) {
  const sch = [0.03, 0.07, 0.13, 0.18, 0.22, 0.14, 0.08, 0.05, 0.04, 0.02, 0.01, 0.01, 0.01, 0.0, 0.0]
  let cum = 0
  for (let i = 0; i < Math.min(yr, 15); i++) cum += Math.round(total * sch[i])
  return Math.min(cum, total)
}

function calcYear(n: number, kw: number, aiPct: number, btcBase: number, yr: number, mineYears: number) {
  const mwh = (kw * 8760 * 0.85) / 1000
  const mining = yr <= mineYears
  const btcPrice = btcPriceAt(btcBase, yr)
  const gAI = Math.pow(1.25, yr - 1)
  const gProt = Math.pow(1.12, yr - 1)

  const ai_rev = mwh * aiPct * 110 * 1.8 * n * gAI
  const waste = kw * 15 * n
  const gate_rev = waste * 40 * gProt
  const prot_rev = waste * 0.15 * 4000 * 0.92 * gProt
  const btcPct = 1 - aiPct
  const btc_mined = mining ? ((mwh * btcPct * 1000) / 560000) * n : 0
  const btc_val = btc_mined * btcPrice
  const heat_sav = kw * n * 0.48 * 8760 * 0.85 * 0.04
  const total_rev = ai_rev + gate_rev + prot_rev + btc_val + heat_sav
  const opex = (kw * 1500 + 200000) * n * Math.pow(1.03, yr - 1)
  const ebitda = total_rev - opex
  return {ai_rev, gate_rev, prot_rev, btc_val, heat_sav, total_rev, opex, ebitda, btc_mined, waste, n, btcPrice, mining, btcPct}
}

const YEARS = Array.from({length: 15}, (_, i) => i + 1)
const LABELS = YEARS.map((y) => "R" + y)

interface Scenario {
  lb: string
  kw: number
  n: number
  ai: number
  btc: number
}

const SCENARIOS: Scenario[] = [
  {lb: "Konserwatywny", kw: 200, n: 60, ai: 0.8, btc: 80000},
  {lb: "Bazowy (aktualny)", kw: 300, n: 90, ai: 0.8, btc: 100000},
  {lb: "Optymistyczny", kw: 300, n: 100, ai: 0.8, btc: 150000},
  {lb: "Agresywny", kw: 500, n: 120, ai: 0.8, btc: 200000},
]

export default function ProjectionPage() {
  const [kw, setKw] = useState(300)
  const [totalN, setTotalN] = useState(90)
  const [aiPctRaw, setAiPctRaw] = useState(100)
  const [btcBase, setBtcBase] = useState(100000)
  const [mineYears, setMineYears] = useState(12)
  const [lockYears, setLockYears] = useState(18)

  const aiPct = aiPctRaw / 100

  const data = useMemo(
    () =>
      YEARS.map((y) => ({
        y,
        ...calcYear(plantCount(y, totalN), kw, aiPct, btcBase, y, mineYears),
      })),
    [kw, totalN, aiPct, btcBase, mineYears]
  )

  const btcCumArr = useMemo(() => {
    let acc = 0
    return data.map((d) => {
      acc += d.btc_mined
      return acc
    })
  }, [data])

  const totalBtc = btcCumArr[14]
  const btcValUnlock = totalBtc * btcPriceAt(btcBase, lockYears)
  const last = data[14]
  const capexPerPlant = kw * 3500 + 800000 + 1200000 + 400000 + 200000
  const totalCapex = capexPerPlant * totalN
  const totalEbitda = data.reduce((s, d) => s + d.ebitda, 0)

  const setScenario = useCallback((s: Scenario) => {
    setKw(s.kw)
    setTotalN(s.n)
    setAiPctRaw(Math.round(s.ai * 100))
    setBtcBase(s.btc)
  }, [])

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {legend: {display: false}},
    }),
    []
  )

  return (
    <div
      style={{
        fontFamily: "'Segoe UI',Arial,sans-serif",
        background: "#0a0a0a",
        color: "#e0e0e0",
        fontSize: 13,
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(135deg,#0d1a0f 0%,#0a0a0a 100%)",
          borderBottom: "1px solid #1a3a20",
          padding: "24px 28px",
        }}
      >
        <h1 style={{fontSize: 22, color: "#00FF88", marginBottom: 4}}>AInsekt Farm — Projekcja Sieci 15 Lat</h1>
        <p style={{color: "#555", fontSize: 12}}>
          Siec biogazowni &middot; AI Compute Center &middot; BTC Strategic Reserve &middot; Bialko BSF+Cricket &middot;
          Switzerland GmbH
        </p>
        <div style={{display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12}}>
          {[
            ["b-green", "Do 90 instalacji"],
            ["b-orange", "20% zysku \u2192 kwartalny BTC Strategic Reserve"],
            ["b-red", "Blokada skarbca 18 lat"],
            ["b-blue", "AI Compute 100% energii B2B"],
            ["b-green", "10% mocy \u2192 własne projekty AI"],
          ].map(([cls, txt]) => {
            const colors: Record<string, {bg: string; color: string; border: string}> = {
              "b-green": {bg: "#00FF8820", color: "#00FF88", border: "#00FF8840"},
              "b-orange": {bg: "#f7931a20", color: "#f7931a", border: "#f7931a40"},
              "b-red": {bg: "#ff444420", color: "#ff6b6b", border: "#ff444440"},
              "b-blue": {bg: "#4488ff20", color: "#4488ff", border: "#4488ff40"},
            }
            const c = colors[cls]
            return (
              <span
                key={txt}
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontWeight: 600,
                  background: c.bg,
                  color: c.color,
                  border: `1px solid ${c.border}`,
                }}
              >
                {txt}
              </span>
            )
          })}
        </div>
      </div>

      {/* CONTROLS */}
      <div style={{background: "#0d0d0d", borderBottom: "1px solid #1a1a1a", padding: "16px 28px"}}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: 16,
          }}
        >
          <SliderCtrl label="Moc biogazowni (kW)" min={200} max={500} step={100} value={kw} onChange={setKw} suffix=" kW" />
          <SliderCtrl label="Instalacji docelowo" min={50} max={120} step={10} value={totalN} onChange={setTotalN} />
          <SliderCtrl label="AI Compute %" min={90} max={100} step={5} value={aiPctRaw} onChange={setAiPctRaw} suffix="%" />
          <SliderCtrl label="Cena BTC rok 1 (USD)" min={80000} max={300000} step={10000} value={btcBase} onChange={setBtcBase} format />
          <SliderCtrl label="Lata rezerwy BTC" min={4} max={15} step={1} value={mineYears} onChange={setMineYears} suffix=" lat" />
          <SliderCtrl label="Blokada skarbca (lata)" min={12} max={20} step={1} value={lockYears} onChange={setLockYears} suffix=" lat" />
        </div>
      </div>

      {/* MAIN */}
      <div style={{padding: "24px 28px"}}>
        {/* TOP METRICS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
            gap: 10,
            marginBottom: 24,
          }}
        >
          <MetricCard border="#00FF8840" label="Przychod rok 15" value={`${fmt(last.total_rev / 1e6, 0)}M EUR`} sub={`EBITDA ${fmt(last.ebitda / 1e6, 0)}M EUR`} color="#00FF88" />
          <MetricCard border="#00FF8840" label="EBITDA suma 15 lat" value={`${fmt(totalEbitda / 1e6, 0)}M EUR`} sub="Suma operacyjna" color="#00FF88" />
          <MetricCard label="AI Compute rok 15" value={`${fmt(last.ai_rev / 1e6, 0)}M EUR`} sub={`${aiPctRaw}% energii sieci`} color="#4488ff" />
          <MetricCard border="#f7931a40" label="BTC skarbiec" value={`${totalBtc.toFixed(0)} BTC`} sub="20% zysku kwartalnie → Strategic Reserve" color="#f7931a" />
          <MetricCard border="#f7931a40" label={`Wartosc @ rok ${lockYears}`} value={`$${fmt(btcValUnlock / 1e6, 0)}M`} sub={`BTC ~$${fmt(btcPriceAt(btcBase, lockYears))}`} color="#f7931a" />
          <MetricCard border="#ff444440" label="Blokada skarbca" value={`${lockYears} lat`} sub="Multisig 3/5 + notariusz Swiss" color="#ff6b6b" />
          <MetricCard label="Bialko rok 15" value={`${fmt((last.waste * 0.15) / 1000, 0)}k ton`} sub="BSF 50% + Cricket 50%" color="#4488ff" />
          <MetricCard label="CAPEX siec lacznie" value={`${fmt(totalCapex / 1e6, 0)}M EUR`} sub={`${fmt(capexPerPlant / 1e6, 1)}M EUR/instalacje`} color="#e0e0e0" />
        </div>

        {/* LOCKBOX */}
        <div
          style={{
            background: "#1a0f00",
            border: "1px solid #f7931a40",
            borderRadius: 10,
            padding: "14px 18px",
            margin: "14px 0",
            fontSize: 12,
            lineHeight: 1.7,
            color: "#ccc",
          }}
        >
          <strong style={{color: "#f7931a"}}>BTC Strategic Reserve — zasady HODL:</strong>&nbsp; 20% zysku z AI Compute jest przeznaczane kwartalnie na zakup BTC do skarbca. Blokada{" "}
          <strong style={{color: "#f7931a"}}>{lockYears} lat</strong> od startu — zadna sprzedaz niemozliwa technicznie
          (Gnosis Safe multisig 3/5, jeden klucz u notariusza w Kanton Wallis).
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
              gap: 10,
              marginTop: 12,
            }}
          >
            <LockStep yr={`Rok 1-${mineYears}`} desc="20% zysku kwartalnie kupuje BTC do Strategic Reserve \u00B7 zadnych wyplat" />
            <LockStep yr={`Rok ${mineYears + 1}-${lockYears}`} desc="Strategiczny HODL \u00B7 skarbiec rosnie przez aprecjacje ceny BTC \u00B7 nadal zablokowany" />
            <LockStep yr={`Rok ${lockYears} \uD83D\uDD13`} desc="Odblokowanie \u00B7 glosowanie DAO (1 AINS = 1 glos) \u00B7 reinwestycja lub dywidenda dla stakerow" />
            <LockStep yr={`Wartosc @ ${lockYears}`} desc={`~$${fmt(btcValUnlock / 1e6, 0)}M USD przy konserwatywnym wzroscie ceny BTC (\u00D72 co halving)`} />
          </div>
        </div>

        {/* REVENUE CHART */}
        <SectionTitle>Przychody roczne sieci (EUR) — 15 lat</SectionTitle>
        <div style={{background: "#071008", border: "1px solid #00FF8840", borderRadius: 12, padding: "16px 18px", margin: "18px 0", color: "#d0ffd8", fontSize: 12, lineHeight: 1.8}}>
          <div>⚡ 100% energii → AI Compute B2B</div>
          <div>🖥️ 90% mocy → klienci B2B (wynajem GPU)</div>
          <div>🔬 10% mocy → własne projekty AI (FLIK pipeline, AgroAI, R&D)</div>
          <div>₿ 20% zysku kwartalnie → zakup BTC Strategic Reserve</div>
        </div>
        <div style={{display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 8, fontSize: 11, color: "#888"}}>
          <LegendItem color="#1D9E75" label="AI Compute Center" />
          <LegendItem color="#639922" label="Gate fee + Bialko BSF/Cricket" />
          <LegendItem color="#f7931a" label="BTC Strategic Reserve" />
          <LegendItem color="#444" label="BTC rezerwa (HODL)" />
          <LegendItem color="#378ADD" label="Cieplo + inne" />
        </div>
        <div style={{position: "relative", height: 260}}>
          <Bar
            data={{
              labels: LABELS,
              datasets: [
                {label: "AI Compute", data: data.map((d) => Math.round(d.ai_rev / 1000)), backgroundColor: "#1D9E75"},
                {label: "Gate+Bialko", data: data.map((d) => Math.round((d.gate_rev + d.prot_rev) / 1000)), backgroundColor: "#639922"},
                {label: "BTC rezerwa aktywna", data: data.map((d) => (d.mining ? Math.round(d.btc_val / 1000) : 0)), backgroundColor: "#f7931a"},
                {label: "BTC rezerwa zakonczona", data: data.map((d) => (!d.mining ? Math.round(d.btc_val / 1000) : 0)), backgroundColor: "#3a3a3a"},
                {label: "Cieplo", data: data.map((d) => Math.round(d.heat_sav / 1000)), backgroundColor: "#378ADD"},
              ],
            }}
            options={{
              ...chartOptions,
              scales: {
                x: {stacked: true, ticks: {color: "#666", font: {size: 10}}, grid: {display: false}},
                y: {
                  stacked: true,
                  ticks: {
                    color: "#666",
                    font: {size: 10},
                    callback: (v) => (+v >= 1000 ? fmt(+v / 1000, 0) + "M" : fmt(+v) + "k"),
                  },
                  grid: {color: "rgba(255,255,255,0.05)"},
                },
              },
            }}
          />
        </div>

        {/* BTC + AI CHARTS */}
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24}}>
          <div>
            <SectionTitle>BTC Skarbiec — akumulacja</SectionTitle>
            <div style={{display: "flex", gap: 10, marginBottom: 8, fontSize: 11, color: "#888"}}>
              <LegendItem color="#f7931a" label="BTC lacznie" />
              <LegendItem color="#378ADD" label="Wartosc USD" />
            </div>
            <div style={{position: "relative", height: 200}}>
              <Line
                data={{
                  labels: LABELS,
                  datasets: [
                    {
                      label: "BTC",
                      data: btcCumArr.map((v) => +v.toFixed(1)),
                      borderColor: "#f7931a",
                      backgroundColor: "rgba(247,147,26,0.08)",
                      fill: true,
                      tension: 0.3,
                      pointRadius: 3,
                      yAxisID: "yb",
                    },
                    {
                      label: "USD(M)",
                      data: YEARS.map((y, i) => +(btcCumArr[i] * btcPriceAt(btcBase, y) / 1e6).toFixed(1)),
                      borderColor: "#4488ff",
                      borderDash: [5, 3],
                      backgroundColor: "transparent",
                      tension: 0.3,
                      pointRadius: 3,
                      yAxisID: "yu",
                    },
                  ],
                }}
                options={{
                  ...chartOptions,
                  scales: {
                    x: {ticks: {color: "#666", font: {size: 10}}, grid: {display: false}},
                    yb: {
                      position: "left" as const,
                      ticks: {color: "#f7931a", font: {size: 10}, callback: (v) => (+v).toFixed(0) + " \u20bf"},
                      grid: {color: "rgba(255,255,255,0.05)"},
                    },
                    yu: {
                      position: "right" as const,
                      ticks: {color: "#4488ff", font: {size: 10}, callback: (v) => "$" + (+v).toFixed(0) + "M"},
                      grid: {display: false},
                    },
                  },
                }}
              />
            </div>
          </div>
          <div>
            <SectionTitle>AI Compute vs BTC Strategic Reserve</SectionTitle>
            <div style={{display: "flex", gap: 10, marginBottom: 8, fontSize: 11, color: "#888"}}>
              <LegendItem color="#1D9E75" label="AI Compute (EUR/rok)" />
              <LegendItem color="#f7931a" label="BTC wartosc (EUR/rok)" />
            </div>
            <div style={{position: "relative", height: 200}}>
              <Line
                data={{
                  labels: LABELS,
                  datasets: [
                    {
                      label: "AI Compute",
                      data: data.map((d) => Math.round(d.ai_rev / 1000)),
                      borderColor: "#1D9E75",
                      backgroundColor: "rgba(29,158,117,0.08)",
                      fill: true,
                      tension: 0.3,
                      pointRadius: 3,
                    },
                    {
                      label: "BTC wartosc",
                      data: data.map((d) => Math.round(d.btc_val / 1000)),
                      borderColor: "#f7931a",
                      backgroundColor: "transparent",
                      borderDash: [5, 3],
                      tension: 0.3,
                      pointRadius: 3,
                    },
                  ],
                }}
                options={{
                  ...chartOptions,
                  scales: {
                    x: {ticks: {color: "#666", font: {size: 10}}, grid: {display: false}},
                    y: {
                      ticks: {
                        color: "#666",
                        font: {size: 10},
                        callback: (v) => (+v >= 1000 ? fmt(+v / 1000, 0) + "M" : fmt(+v) + "k"),
                      },
                      grid: {color: "rgba(255,255,255,0.05)"},
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* PLANTS CHART */}
        <SectionTitle>Wzrost sieci instalacji</SectionTitle>
        <div style={{position: "relative", height: 160}}>
          <Bar
            data={{
              labels: LABELS,
              datasets: [
                {
                  label: "Instalacje",
                  data: YEARS.map((y) => plantCount(y, totalN)),
                  backgroundColor: YEARS.map((_, i) => (i < 6 ? "#00FF88" : i < 10 ? "#1D9E75" : "#0F6E56")),
                },
              ],
            }}
            options={{
              ...chartOptions,
              scales: {
                x: {ticks: {color: "#666", font: {size: 10}}, grid: {display: false}},
                y: {
                  ticks: {color: "#666", font: {size: 10}, stepSize: 10},
                  grid: {color: "rgba(255,255,255,0.05)"},
                  max: totalN + 10,
                },
              },
            }}
          />
        </div>

        {/* TABLE */}
        <SectionTitle>Tabela 15-letnia — cala siec</SectionTitle>
        <div style={{overflowX: "auto"}}>
          <table style={{width: "100%", borderCollapse: "collapse", fontSize: 11}}>
            <thead>
              <tr>
                <Th align="left">Wskaznik</Th>
                {YEARS.map((y) => (
                  <Th key={y}>
                    Rok {y}
                    {y === mineYears ? "\u26CF" : ""}
                    {y === lockYears ? " \uD83D\uDD13" : ""}
                  </Th>
                ))}
              </tr>
            </thead>
            <tbody>
              <SectionRow label="--- SIEC" />
              <DataRow label="Instalacji (kum.)" vals={data.map((d) => fmt(d.n))} />
              <DataRow label="Moc lacznie (MW)" vals={data.map((d) => fmt((d.n * kw) / 1000, 0))} />
              <SectionRow label="--- PRZYCHODY" />
              <DataRow label="Przychod lacznie" vals={data.map((d) => fmt(d.total_rev / 1e6, 0) + "M")} />
              <DataRow label="  AI Compute" vals={data.map((d) => fmt(d.ai_rev / 1e6, 0) + "M")} />
              <DataRow label="  Gate fee+Bialko" vals={data.map((d) => fmt((d.gate_rev + d.prot_rev) / 1e6, 0) + "M")} />
              <DataRow label="  BTC wartosc/rok" vals={data.map((d) => (d.mining ? fmt(d.btc_val / 1e6, 1) + "M" : "\u2014"))} color="#f7931a" />
              <DataRow label="  Cieplo oszcz." vals={data.map((d) => fmt(d.heat_sav / 1000, 0) + "k")} />
              <DataRow label="OPEX" vals={data.map((d) => "-" + fmt(d.opex / 1e6, 0) + "M")} />
              <DataRow label="EBITDA" vals={data.map((d) => fmt(d.ebitda / 1e6, 0) + "M")} color="#00FF88" bold />
              <SectionRow label="--- BTC SKARBIEC" />
              <DataRow label="BTC zakup/rok" vals={data.map((d) => (d.mining ? d.btc_mined.toFixed(1) + " \u20bf" : "\u2014"))} color="#f7931a" />
              <DataRow label="BTC kumulacja" vals={btcCumArr.map((v) => v.toFixed(1) + " \u20bf")} color="#f7931a" />
              <DataRow
                label="Wartosc skarbca $"
                vals={YEARS.map((y, i) => "$" + fmt((btcCumArr[i] * btcPriceAt(btcBase, y)) / 1e6, 0) + "M")}
                color="#ffd580"
              />
              <DataRow label="Status skarbca" vals={YEARS.map((y) => (y < lockYears ? "\uD83D\uDD12" : y === lockYears ? "\uD83D\uDD13 UNLOCK" : "\u2705"))} />
              <SectionRow label="--- PRODUKCJA" />
              <DataRow label="Odpady (ton/rok)" vals={data.map((d) => fmt(d.waste / 1000, 0) + "k")} />
              <DataRow label="Bialko BSF+Cricket" vals={data.map((d) => fmt((d.waste * 0.15) / 1000, 0) + "k t")} />
            </tbody>
          </table>
        </div>

        {/* SCENARIOS */}
        <SectionTitle>Scenariusze porownawcze (rok 15)</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 10,
            marginBottom: 16,
          }}
        >
          {SCENARIOS.map((s) => {
            const isCur = s.kw === kw && s.n === totalN && s.ai === aiPct && s.btc === btcBase
            const d15 = calcYear(s.n, s.kw, s.ai, s.btc, 15, mineYears)
            let bAcc = 0
            YEARS.forEach((y) => {
              const dn = calcYear(plantCount(y, s.n), s.kw, s.ai, s.btc, y, mineYears)
              bAcc += dn.btc_mined
            })
            const bVal = bAcc * btcPriceAt(s.btc, lockYears)
            return (
              <div
                key={s.lb}
                onClick={() => setScenario(s)}
                style={{
                  background: "#111",
                  border: `1px solid ${isCur ? "#00FF88" : "#1e1e1e"}`,
                  borderRadius: 8,
                  padding: 12,
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
              >
                <div style={{fontSize: 11, fontWeight: 600, color: "#aaa", marginBottom: 8}}>
                  {s.lb}
                  {isCur ? " \u25C0" : ""}
                </div>
                <div style={{fontSize: 16, fontWeight: 700, color: "#00FF88"}}>{fmt(d15.total_rev / 1e6, 0)}M EUR</div>
                <div style={{fontSize: 10, color: "#555", marginTop: 2}}>Rok 15 przychod</div>
                <div style={{marginTop: 6, fontSize: 10, color: "#f7931a"}}>
                  {bAcc.toFixed(0)} BTC &rarr; ${fmt(bVal / 1e6, 0)}M @ rok {lockYears}
                </div>
                <div style={{fontSize: 10, color: "#555"}}>
                  {s.n} inst. &middot; {s.kw}kW &middot; BTC ${fmt(s.btc)}
                </div>
              </div>
            )
          })}
        </div>

        {/* NOTE */}
        <p style={{fontSize: 10, color: "#333", marginTop: 12, lineHeight: 1.6}}>
          Zalozenia modelu: CHP sprawnosc elektryczna 40%, cieplna 48%. AI Compute: premium x1.8 vs cena energii,
          wzrost popytu 25%/rok (CAGR). BTC: 560,000 kWh/BTC przy obecnej trudnosci sieci (750 EH/s, 14 J/TH ASIC S21
          Pro). Cena BTC x2 po kazdym halvingu (rok 4, 8, 12) — zalozenie konserwatywne. Bialko BSF: 15% konwersji
          biomasy, 4,000 USD/t. Gate fee: 40 EUR/t odpadow. OPEX: +3%/rok inflacja. Blokada skarbca: Gnosis Safe
          multisig 3/5 + notariusz szwajcarski. Wyplata po glosowaniu DAO (1 AINS = 1 glos). Zrodla: Manna Insect,
          FlyFarm Systems, IPIFF, CoinMetrics, IRENA 2024, Eurostat food waste data.
        </p>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0d0d0d",
          borderTop: "1px solid #1a1a1a",
          padding: "16px 28px",
          fontSize: 10,
          color: "#333",
          textAlign: "center",
        }}
      >
        AInsekt Farm GmbH &middot; Kanton Wallis &middot; Switzerland &middot; FINMA DLT Act 2021 &middot; Token AINS
        &middot; www.ainsektfarm.com
        <br />
        Model pogladowy dla celow prezentacyjnych &middot; Nie stanowi oferty inwestycyjnej
      </footer>
    </div>
  )
}

/* ─── Sub-components ─── */

function SliderCtrl({
  label,
  min,
  max,
  step,
  value,
  onChange,
  suffix,
  format: doFormat,
}: {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  suffix?: string
  format?: boolean
}) {
  return (
    <div>
      <label style={{fontSize: 11, color: "#777", display: "block", marginBottom: 4}}>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        style={{width: "100%", accentColor: "#00FF88", marginBottom: 2}}
      />
      <div style={{fontSize: 12, color: "#00FF88", textAlign: "right", fontWeight: 600}}>
        {doFormat ? fmt(value) : value}
        {suffix ?? ""}
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  sub,
  color,
  border,
}: {
  label: string
  value: string
  sub: string
  color: string
  border?: string
}) {
  return (
    <div
      style={{
        background: "#111",
        border: `1px solid ${border ?? "#1e1e1e"}`,
        borderRadius: 10,
        padding: 14,
      }}
    >
      <div style={{fontSize: 10, color: "#555", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.4}}>
        {label}
      </div>
      <div style={{fontSize: 20, fontWeight: 700, color}}>{value}</div>
      <div style={{fontSize: 10, color: "#444", marginTop: 3}}>{sub}</div>
    </div>
  )
}

function LockStep({yr, desc}: {yr: string; desc: string}) {
  return (
    <div style={{background: "#0d0d0d", borderRadius: 8, padding: 10, border: "1px solid #2a1a00"}}>
      <div style={{fontSize: 16, fontWeight: 700, color: "#f7931a", marginBottom: 2}}>{yr}</div>
      <div style={{fontSize: 10, color: "#777"}}>{desc}</div>
    </div>
  )
}

function LegendItem({color, label}: {color: string; label: string}) {
  return (
    <span style={{display: "flex", alignItems: "center", gap: 4}}>
      <i style={{width: 10, height: 10, borderRadius: 2, display: "inline-block", flexShrink: 0, background: color}} />
      {label}
    </span>
  )
}

function SectionTitle({children}: {children: React.ReactNode}) {
  return (
    <h2
      style={{
        fontSize: 14,
        color: "#00FF88",
        margin: "24px 0 10px",
        borderBottom: "1px solid #1a1a1a",
        paddingBottom: 6,
      }}
    >
      {children}
    </h2>
  )
}

function Th({children, align}: {children: React.ReactNode; align?: string}) {
  return (
    <th
      style={{
        fontSize: 10,
        fontWeight: 600,
        color: "#00FF88",
        padding: "7px 8px",
        borderBottom: "1px solid #1e1e1e",
        textAlign: (align as "left" | "right") ?? "right",
        whiteSpace: "nowrap",
        background: "#0d0d0d",
      }}
    >
      {children}
    </th>
  )
}

function SectionRow({label}: {label: string}) {
  return (
    <tr>
      <td
        colSpan={16}
        style={{
          background: "#111",
          color: "#00FF88",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: 0.4,
          fontWeight: 600,
          padding: "6px 8px",
          borderBottom: "1px solid #141414",
        }}
      >
        {label}
      </td>
    </tr>
  )
}

function DataRow({label, vals, color, bold}: {label: string; vals: string[]; color?: string; bold?: boolean}) {
  return (
    <tr>
      <td
        style={{
          padding: "6px 8px",
          borderBottom: "1px solid #141414",
          textAlign: "left",
          whiteSpace: "nowrap",
          color: "#888",
          fontSize: 10,
        }}
      >
        {label}
      </td>
      {vals.map((v, i) => (
        <td
          key={i}
          style={{
            padding: "6px 8px",
            borderBottom: "1px solid #141414",
            textAlign: "right",
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
            color: color ?? undefined,
            fontWeight: bold ? 700 : undefined,
          }}
        >
          {v}
        </td>
      ))}
    </tr>
  )
}

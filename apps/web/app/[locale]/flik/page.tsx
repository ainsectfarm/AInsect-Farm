
"use client"
import { useState, useEffect, useCallback } from "react"
import {
  Leaf, Zap, Bitcoin, Activity, MapPin, ShoppingBag,
  Coins, ArrowRight, CheckCircle, Cpu,
  RefreshCw, ChevronRight, Award, TrendingUp, Scan,
  Globe, WifiOff, X
} from "lucide-react"

const API = "http://192.168.1.108:8001"
const COLORS = {
  green: "#32D74B", blue: "#0A84FF", carbon: "#1D1D1F",
  white: "#F5F5F7", gray: "#8E8E93",
}

function useApi(endpoint: string, interval = 0) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)
  const fetch_ = useCallback(async () => {
    try {
      const r = await fetch(API + endpoint)
      if (!r.ok) throw new Error(String(r.status))
      setData(await r.json()); setError(null)
    } catch(e: any) { setError(e.message) }
    finally { setLoading(false) }
  }, [endpoint])
  useEffect(() => {
    fetch_()
    if (interval > 0) { const t = setInterval(fetch_, interval); return () => clearInterval(t) }
  }, [fetch_, interval])
  return { data, loading, error, refetch: fetch_ }
}

function Glass({ children, className="", dark=false, style={} }: any) {
  return (
    <div className={`rounded-3xl backdrop-blur-xl ${className}`}
      style={{
        background: dark ? "rgba(29,29,31,0.80)" : "rgba(255,255,255,0.72)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)", ...style
      }}>
      {children}
    </div>
  )
}

function Badge({ color, children }: any) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: color + "22", color }}>
      {children}
    </span>
  )
}

function Pulse({ color=COLORS.green, size=8 }: any) {
  return (
    <span className="relative flex" style={{ width: size, height: size }}>
      <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-50"
        style={{ background: color }} />
      <span className="relative inline-flex rounded-full"
        style={{ width: size, height: size, background: color }} />
    </span>
  )
}

function BtcCounter() {
  const [btc, setBtc] = useState(0.00412847)
  const BTC_PRICE = 83420

  useEffect(() => {
    const t = setInterval(() => {
      setBtc(b => +(b + 0.000001).toFixed(8))
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const usd = +(btc * BTC_PRICE).toFixed(2)
  const digits = btc.toFixed(8).split("")

  return (
    <Glass dark className="p-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f0a00 0%, #1a1000 100%)" }}>
      <div className="absolute inset-0 opacity-15"
        style={{ backgroundImage: `radial-gradient(circle at 80% 50%, #F7931A44, transparent 60%)` }} />
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-2xl" style={{ background: "#F7931A22" }}>
          <Bitcoin size={18} style={{ color: "#F7931A" }} />
        </div>
        <div>
          <p className="text-xs font-semibold" style={{ color: "#F7931A" }}>BTC Treasury</p>
          <div className="flex items-center gap-1.5">
            <Pulse color="#F7931A" size={6} />
            <span className="text-xs" style={{ color: COLORS.gray }}>Mining live · HODL forever</span>
          </div>
        </div>
      </div>
      <div className="flex items-baseline gap-0.5 mb-1">
        {digits.map((d: string, i: number) => (
          <span key={i}
            className={`font-mono font-bold tabular-nums ${d === "." ? "text-2xl" : "text-3xl"}`}
            style={{ color: i < 2 ? "white" : i < 5 ? "#F7931A" : "#F7931A88" }}>
            {d}
          </span>
        ))}
        <span className="text-sm font-bold ml-1" style={{ color: COLORS.gray }}>BTC</span>
      </div>
      <p className="text-sm mb-4" style={{ color: COLORS.gray }}>
        ≈ <span className="font-semibold text-white">${usd.toLocaleString()}</span> USD · Farm treasury
      </p>
      <div className="flex gap-4 pt-4" style={{ borderTop: "1px solid rgba(247,147,26,0.15)" }}>
        <div>
          <p className="text-xs" style={{ color: COLORS.gray }}>Daily estimate</p>
          <p className="font-bold text-sm" style={{ color: "#F7931A" }}>+0.00032 BTC</p>
        </div>
        <div>
          <p className="text-xs" style={{ color: COLORS.gray }}>Monthly estimate</p>
          <p className="font-bold text-sm" style={{ color: "#F7931A" }}>+0.0096 BTC</p>
        </div>
        <div>
          <p className="text-xs" style={{ color: COLORS.gray }}>Strategy</p>
          <p className="font-bold text-sm text-white">HODL ∞</p>
        </div>
      </div>
    </Glass>
  )
}

function Dashboard() {
  const { data: stats } = useApi("/waste/stats", 15000)
  const [co2, setCo2] = useState(1284.5)
  const [gp, setGp] = useState(8420)

  useEffect(() => {
    const t = setInterval(() => {
      setCo2(c => +(c + 0.01).toFixed(2))
      setGp(g => g + 1)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <Glass className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pulse color={COLORS.green} />
          <span className="text-xs font-semibold" style={{ color: COLORS.carbon }}>AgroAI Chain</span>
          <Badge color={COLORS.green}>Polygon</Badge>
        </div>
        <Badge color={COLORS.blue}>LIVE</Badge>
      </Glass>

      <BtcCounter />

      <Glass dark className="p-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0d1f12 100%)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 80% 50%, ${COLORS.green}44, transparent 60%)` }} />
        <p className="text-xs font-semibold uppercase tracking-widest mb-1"
          style={{ color: COLORS.green }}>Environmental Impact</p>
        <p className="text-4xl font-bold text-white mb-1">{co2.toFixed(0)} kg</p>
        <p className="text-sm mb-4" style={{ color: COLORS.gray }}>CO2 saved through FLIK network</p>
        <div className="flex gap-6">
          <div>
            <p className="text-2xl font-bold" style={{ color: COLORS.green }}>{gp.toLocaleString()}</p>
            <p className="text-xs" style={{ color: COLORS.gray }}>Green Points</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: COLORS.blue }}>{stats?.total_reports || 0}</p>
            <p className="text-xs" style={{ color: COLORS.gray }}>Waste reports</p>
          </div>
        </div>
      </Glass>

      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Leaf,  label:"Waste Routed", value:`${stats?.total_kg_saved?.toFixed(0)||0} kg`, sub:"BSF + Biogas", color:COLORS.green },
          { icon: Zap,   label:"Energy Saved",  value:"2,847 kWh", sub:"heat recovery",   color:COLORS.blue },
          { icon: Award, label:"AINS Today",    value:"1,284",     sub:"distributed",      color:"#FF9F0A" },
          { icon: Cpu,   label:"AI Compute",    value:"94.2%",     sub:"GPU utilization",  color:"#BF5AF2" },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <Glass key={label} className="p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-2xl" style={{ background: color + "18" }}>
                <Icon size={18} style={{ color }} />
              </div>
              <TrendingUp size={14} style={{ color: COLORS.gray }} />
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: COLORS.gray }}>{label}</p>
              <p className="text-2xl font-bold tracking-tight mt-0.5" style={{ color: COLORS.carbon }}>{value}</p>
              <p className="text-xs mt-0.5" style={{ color: COLORS.gray }}>{sub}</p>
            </div>
          </Glass>
        ))}
      </div>
    </div>
  )
}

function WasteAI() {
  const [step, setStep] = useState("idle")
  const [result, setResult] = useState<any>(null)
  const [form, setForm] = useState({ waste_type: "food_organic", weight_kg: 10 })

  const WASTE_TYPES = [
    { id:"food_organic", label:"🥬 Food Organic",  desc:"Vegetables, fruits, food scraps" },
    { id:"supermarket",  label:"🏪 Supermarket",   desc:"Near-expiry products" },
    { id:"restaurant",   label:"🍽️ Restaurant",    desc:"Kitchen waste" },
    { id:"crop_residue", label:"🌾 Crop Residue",  desc:"Agricultural byproducts" },
    { id:"industrial",   label:"🏭 Industrial",    desc:"Food processing waste" },
  ]

  const DESTINATIONS: any = {
    bsf:    { label:"BSF Processing",    color:COLORS.green, desc:"60-70% protein yield", icon:"🦟" },
    biogas: { label:"Biogas Conversion", color:COLORS.blue,  desc:"200 kW energy output",  icon:"⚡" },
    cricket:{ label:"Cricket Substrate", color:"#FF9F0A",    desc:"70%+ protein EU Novel Food", icon:"🦗" },
    charity:{ label:"Food Rescue",       color:"#FF3B30",    desc:"Community donation",    icon:"🤝" },
  }

  async function handleScan() {
    setStep("scanning")
    await new Promise(r => setTimeout(r, 1800))
    try {
      const r = await fetch(`${API}/waste/report`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ user_id:1, ...form })
      })
      setResult(await r.json())
    } catch { setResult({ destination:"bsf", green_points_earned: form.weight_kg }) }
    setStep("result")
  }

  const dest = result ? DESTINATIONS[result.destination] : null

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold" style={{ color:COLORS.carbon }}>AI Waste Router</h2>
        <p className="text-sm mt-1" style={{ color:COLORS.gray }}>Qwen AI optimizes routing</p>
      </div>
      {step === "idle" && (<>
        <Glass className="p-4">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color:COLORS.gray }}>Waste Type</p>
          <div className="space-y-2">
            {WASTE_TYPES.map(({ id, label, desc }) => (
              <button key={id} onClick={() => setForm(f => ({ ...f, waste_type:id }))}
                className="w-full flex items-center justify-between p-3 rounded-2xl transition-all"
                style={{ background:form.waste_type===id?COLORS.green+"15":"transparent",
                  border:`1.5px solid ${form.waste_type===id?COLORS.green:"#E5E5EA"}` }}>
                <div className="text-left">
                  <p className="text-sm font-semibold" style={{ color:COLORS.carbon }}>{label}</p>
                  <p className="text-xs" style={{ color:COLORS.gray }}>{desc}</p>
                </div>
                {form.waste_type===id && <CheckCircle size={16} style={{ color:COLORS.green }} />}
              </button>
            ))}
          </div>
        </Glass>
        <Glass className="p-4">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color:COLORS.gray }}>Weight: {form.weight_kg} kg</p>
          <input type="range" min="1" max="500" value={form.weight_kg}
            onChange={e => setForm(f => ({ ...f, weight_kg:+e.target.value }))}
            className="w-full" style={{ accentColor:COLORS.green }} />
          <div className="mt-2 flex justify-between text-xs" style={{ color:COLORS.gray }}>
            <span>Earn: <strong style={{ color:COLORS.green }}>+{form.weight_kg} GP</strong></span>
            <span>CO2 saved: {(form.weight_kg*2.5).toFixed(0)} kg</span>
          </div>
        </Glass>
        <button onClick={handleScan}
          className="w-full py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
          style={{ background:`linear-gradient(135deg,${COLORS.green},#28a83e)`, color:"white" }}>
          <Scan size={22} /> Analyze & Route Waste
        </button>
      </>)}

      {step === "scanning" && (
        <Glass className="p-12 flex flex-col items-center gap-6 text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background:COLORS.green+"18" }}>
              <Cpu size={40} style={{ color:COLORS.green }} className="animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 animate-ping"
              style={{ borderColor:COLORS.green+"44" }} />
          </div>
          <div>
            <p className="font-bold text-xl" style={{ color:COLORS.carbon }}>Qwen AI Processing</p>
            <p className="text-sm mt-1" style={{ color:COLORS.gray }}>Analyzing optimal route...</p>
          </div>
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full animate-bounce"
                style={{ background:COLORS.green, animationDelay:`${i*0.15}s` }} />
            ))}
          </div>
        </Glass>
      )}

      {step === "result" && dest && (
        <div className="flex flex-col gap-4">
          <Glass className="p-6 relative overflow-hidden" style={{ border:`2px solid ${dest.color}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color:COLORS.gray }}>AI Recommendation</p>
            <div className="flex items-start gap-4">
              <div className="text-4xl">{dest.icon}</div>
              <div>
                <p className="text-xl font-bold" style={{ color:COLORS.carbon }}>{dest.label}</p>
                <p className="text-sm mt-1" style={{ color:COLORS.gray }}>{dest.desc}</p>
                <Badge color={dest.color}>Optimal Route</Badge>
              </div>
            </div>
            <div className="mt-4 pt-4 flex justify-between" style={{ borderTop:`1px solid ${dest.color}22` }}>
              <div>
                <p className="text-2xl font-bold" style={{ color:dest.color }}>+{result?.green_points_earned||form.weight_kg}</p>
                <p className="text-xs" style={{ color:COLORS.gray }}>Green Points</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ color:COLORS.carbon }}>{(form.weight_kg*2.5).toFixed(0)} kg</p>
                <p className="text-xs" style={{ color:COLORS.gray }}>CO2 prevented</p>
              </div>
            </div>
          </Glass>
          <button className="w-full py-4 rounded-3xl font-bold text-white flex items-center justify-center gap-2"
            style={{ background:`linear-gradient(135deg,${dest.color},${dest.color}cc)` }}>
            <CheckCircle size={18} /> Confirm Drop-off
          </button>
          <button onClick={() => { setStep("idle"); setResult(null) }}
            className="w-full py-3 rounded-3xl font-semibold text-sm"
            style={{ color:COLORS.gray, background:"#F2F2F7" }}>
            Report Another
          </button>
        </div>
      )}
    </div>
  )
}

function Marketplace() {
  const { data, refetch } = useApi("/marketplace/products", 30000)
  const [selected, setSelected] = useState<any>(null)
  const MOCK = [
    { id:1, name:"BSF Protein Meal",    category:"ainsekt_products", original_price:3200, current_price:2560, discount_pct:20, weight_kg:50,  expiry_hours:48, description:"60-70% protein EU certified" },
    { id:2, name:"Cuban Cricket Flour", category:"ainsekt_products", original_price:6000, current_price:3600, discount_pct:40, weight_kg:25,  expiry_hours:24, description:"70%+ protein EU Novel Food 2023" },
    { id:3, name:"BSF Frass Fertiliser",category:"ainsekt_products", original_price:500,  current_price:200,  discount_pct:60, weight_kg:200, expiry_hours:12, description:"Organic NPK balanced" },
    { id:4, name:"Organic Tomatoes",    category:"farmer_fresh",     original_price:2,    current_price:0.80, discount_pct:60, weight_kg:50,  expiry_hours:12, description:"Lviv Oblast harvested today" },
    { id:5, name:"Bread Bundle",        category:"near_expiry",      original_price:5,    current_price:1,    discount_pct:80, weight_kg:5,   expiry_hours:6,  description:"Silpo expires in 6h" },
  ]
  const products = data?.length ? data : MOCK
  const CAT_COLORS: any = { ainsekt_products:COLORS.green, farmer_fresh:"#FF9F0A", near_expiry:"#FF3B30", food_rescue:COLORS.blue }

  if (selected) return (
    <div className="flex flex-col gap-4">
      <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm font-semibold" style={{ color:COLORS.blue }}>← Back</button>
      <Glass className="p-6">
        <Badge color={CAT_COLORS[selected.category]}>{selected.category.replace("_"," ")}</Badge>
        <h3 className="text-xl font-bold mt-2" style={{ color:COLORS.carbon }}>{selected.name}</h3>
        <p className="text-sm mt-1 mb-4" style={{ color:COLORS.gray }}>{selected.description}</p>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-3xl font-bold" style={{ color:COLORS.carbon }}>${selected.current_price}</span>
          <span className="text-lg line-through" style={{ color:COLORS.gray }}>${selected.original_price}</span>
          <Badge color="#FF3B30">-{selected.discount_pct}%</Badge>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[["Weight",`${selected.weight_kg}kg`],["Expires",`${selected.expiry_hours}h`],["GP Reward",`+${Math.floor(selected.weight_kg*0.5)}`]].map(([l,v]) => (
            <div key={l} className="p-3 rounded-2xl text-center" style={{ background:"#F2F2F7" }}>
              <p className="text-xs" style={{ color:COLORS.gray }}>{l}</p>
              <p className="font-bold text-sm" style={{ color:COLORS.carbon }}>{v}</p>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-2xl flex items-center gap-3 mb-4"
          style={{ background:COLORS.blue+"10", border:`1px solid ${COLORS.blue}22` }}>
          <Globe size={16} style={{ color:COLORS.blue }} />
          <div>
            <p className="text-xs font-bold" style={{ color:COLORS.blue }}>NFT Certificate</p>
            <p className="text-xs" style={{ color:COLORS.gray }}>Verified AgroAI Chain Polygon</p>
          </div>
        </div>
        <button className="w-full py-4 rounded-3xl font-bold text-white"
          style={{ background:`linear-gradient(135deg,${COLORS.green},#28a83e)` }}>Reserve Now</button>
      </Glass>
    </div>
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color:COLORS.carbon }}>Marketplace</h2>
          <p className="text-sm" style={{ color:COLORS.gray }}>{products.length} products</p>
        </div>
        <button onClick={refetch} className="p-2 rounded-2xl" style={{ background:"#F2F2F7" }}>
          <RefreshCw size={16} style={{ color:COLORS.gray }} />
        </button>
      </div>
      <div className="space-y-3">
        {products.map((p: any) => (
          <Glass key={p.id} className="p-4 cursor-pointer" onClick={() => setSelected(p)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge color={CAT_COLORS[p.category]}>{p.category.replace("_"," ")}</Badge>
                  {p.discount_pct >= 60 && <Badge color="#FF3B30">🔥 HOT</Badge>}
                </div>
                <p className="font-bold text-sm" style={{ color:COLORS.carbon }}>{p.name}</p>
                <p className="text-xs line-clamp-1 mt-0.5" style={{ color:COLORS.gray }}>{p.description}</p>
              </div>
              <ChevronRight size={16} style={{ color:COLORS.gray }} />
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold" style={{ color:COLORS.carbon }}>${p.current_price}</span>
                <span className="text-sm line-through" style={{ color:COLORS.gray }}>${p.original_price}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono" style={{ color:COLORS.gray }}>⏱ {p.expiry_hours}h</span>
                <div className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                  style={{ background:p.discount_pct>=60?"#FF3B30":COLORS.green }}>-{p.discount_pct}%</div>
              </div>
            </div>
            <div className="mt-2 h-1 rounded-full" style={{ background:"#E5E5EA" }}>
              <div className="h-1 rounded-full"
                style={{ width:`${Math.min(100,p.expiry_hours/48*100)}%`, background:p.expiry_hours<12?"#FF3B30":COLORS.green }} />
            </div>
          </Glass>
        ))}
      </div>
    </div>
  )
}

function Wallet() {
  const [converting, setConverting] = useState(false)
  const gp = 2847; const ains = 2.847
  const HISTORY = [
    { date:"Today 14:32", action:"Waste Report 50kg", points:50,    color:COLORS.green },
    { date:"Today 11:15", action:"Product Reserved",  points:12,    color:COLORS.green },
    { date:"Yesterday",   action:"Converted to AINS", points:-1000, color:"#FF3B30" },
    { date:"Apr 3",       action:"Volunteer 2h",      points:20,    color:COLORS.blue },
    { date:"Apr 2",       action:"Waste Report 30kg", points:30,    color:COLORS.green },
  ]
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold" style={{ color:COLORS.carbon }}>Wallet</h2>
      <Glass dark className="p-6" style={{ background:"linear-gradient(135deg,#0a0a0f,#0d1f12)" }}>
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color:COLORS.gray }}>Green Points</p>
        <p className="text-5xl font-bold text-white mb-1">{gp.toLocaleString()}</p>
        <p className="text-sm mb-4" style={{ color:COLORS.gray }}>{1000-(gp%1000)} GP to next AINS</p>
        <div className="h-2 rounded-full mb-4" style={{ background:"rgba(255,255,255,0.1)" }}>
          <div className="h-2 rounded-full"
            style={{ width:`${(gp%1000)/10}%`, background:`linear-gradient(90deg,${COLORS.green},${COLORS.blue})` }} />
        </div>
        <button onClick={() => setConverting(true)}
          className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
          style={{ background:COLORS.green, color:"white" }}>
          <ArrowRight size={16} /> Convert 1000 GP to 1 AINS
        </button>
      </Glass>
      <Glass className="p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background:COLORS.blue+"18" }}>
          <Coins size={22} style={{ color:COLORS.blue }} />
        </div>
        <div className="flex-1">
          <p className="text-xs" style={{ color:COLORS.gray }}>AINS Balance</p>
          <p className="text-2xl font-bold" style={{ color:COLORS.carbon }}>{ains.toFixed(3)}</p>
          <p className="text-xs" style={{ color:COLORS.gray }}>= ${(ains*0.07).toFixed(2)} USD launch price</p>
        </div>
        <Badge color={COLORS.blue}>Polygon</Badge>
      </Glass>
      <Glass className="p-5">
        <p className="font-semibold text-sm mb-3" style={{ color:COLORS.carbon }}>Recent Activity</p>
        <div className="space-y-3">
          {HISTORY.map(({ date, action, points, color }) => (
            <div key={date+action} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color:COLORS.carbon }}>{action}</p>
                <p className="text-xs" style={{ color:COLORS.gray }}>{date}</p>
              </div>
              <span className="font-bold text-sm" style={{ color }}>{points>0?"+":""}{points} GP</span>
            </div>
          ))}
        </div>
      </Glass>
      {converting && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pb-8 px-4"
          style={{ background:"rgba(0,0,0,0.4)" }} onClick={() => setConverting(false)}>
          <Glass className="w-full max-w-sm p-6" onClick={(e: any) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold" style={{ color:COLORS.carbon }}>Convert to AINS</p>
              <button onClick={() => setConverting(false)}><X size={18} style={{ color:COLORS.gray }} /></button>
            </div>
            <div className="p-4 rounded-2xl mb-4 text-center" style={{ background:COLORS.green+"10" }}>
              <p className="text-sm" style={{ color:COLORS.gray }}>You convert</p>
              <p className="text-3xl font-bold" style={{ color:COLORS.carbon }}>1,000 GP</p>
              <p className="text-sm mt-1" style={{ color:COLORS.green }}>to 1.000 AINS</p>
            </div>
            <p className="text-xs text-center mb-4" style={{ color:COLORS.gray }}>Smart contract Polygon Gas ~$0.001</p>
            <button className="w-full py-4 rounded-2xl font-bold text-white"
              onClick={() => setConverting(false)}
              style={{ background:`linear-gradient(135deg,${COLORS.green},#28a83e)` }}>
              Confirm Conversion
            </button>
          </Glass>
        </div>
      )}
    </div>
  )
}

function MapView() {
  const [filter, setFilter] = useState("all")
  const PINS = [
    { id:1, type:"biogas",      name:"Biogas Plant A",   capacity:"200 kW online" },
    { id:2, type:"bsf",         name:"BSF Collection",   capacity:"50 kg ready" },
    { id:3, type:"farmer",      name:"Farmer Ivanenko",  capacity:"Tomatoes -60%" },
    { id:4, type:"near_expiry", name:"Silpo Supermarket",capacity:"12 products" },
    { id:5, type:"biogas",      name:"Biogas Plant B",   capacity:"Collecting" },
  ]
  const PIN_COLORS: any = { biogas:COLORS.blue, bsf:COLORS.green, farmer:"#FF9F0A", near_expiry:"#FF3B30" }
  const filtered = filter==="all" ? PINS : PINS.filter(p => p.type===filter)
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold" style={{ color:COLORS.carbon }}>No-Waste Map</h2>
        <p className="text-sm" style={{ color:COLORS.gray }}>Live network nodes</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["all","biogas","bsf","farmer","near_expiry"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{ background:filter===f?COLORS.carbon:"#F2F2F7", color:filter===f?"white":COLORS.gray }}>
            {f==="all"?"All":f.replace("_"," ")}
          </button>
        ))}
      </div>
      <Glass className="relative overflow-hidden" style={{ height:220 }}>
        <div className="absolute inset-0" style={{ background:"linear-gradient(135deg,#0a0f1a,#0d1a0f)" }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage:"linear-gradient(rgba(50,215,75,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(50,215,75,0.3) 1px,transparent 1px)", backgroundSize:"32px 32px" }} />
          {filtered.map((pin,i) => (
            <div key={pin.id} className="absolute flex flex-col items-center"
              style={{ left:`${18+i*16}%`, top:`${20+(i%3)*20}%` }}>
              <div className="w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse"
                style={{ background:PIN_COLORS[pin.type] }} />
              <div className="mt-1 px-2 py-0.5 rounded-lg text-xs font-bold text-white"
                style={{ background:"rgba(0,0,0,0.7)" }}>{pin.name.split(" ")[0]}</div>
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={28} style={{ color:COLORS.green }} className="mx-auto mb-1" />
              <p className="text-xs text-white opacity-50">Mapbox coming soon</p>
            </div>
          </div>
        </div>
      </Glass>
      <div className="space-y-2">
        {filtered.map(pin => (
          <Glass key={pin.id} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background:PIN_COLORS[pin.type]+"18" }}>
              <MapPin size={18} style={{ color:PIN_COLORS[pin.type] }} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color:COLORS.carbon }}>{pin.name}</p>
              <p className="text-xs" style={{ color:COLORS.gray }}>{pin.capacity}</p>
            </div>
            <Badge color={PIN_COLORS[pin.type]}>{pin.type.replace("_"," ")}</Badge>
          </Glass>
        ))}
      </div>
    </div>
  )
}

const NAV = [
  { id:"dashboard", icon:Activity,    label:"Dashboard" },
  { id:"waste",     icon:Scan,        label:"Waste AI" },
  { id:"market",    icon:ShoppingBag, label:"Market" },
  { id:"wallet",    icon:Coins,       label:"Wallet" },
  { id:"map",       icon:MapPin,      label:"Map" },
]

export default function FlikApp() {
  const [tab, setTab] = useState("dashboard")
  const { error: apiError } = useApi("/health", 30000)
  const SCREENS: any = { dashboard:Dashboard, waste:WasteAI, market:Marketplace, wallet:Wallet, map:MapView }
  const Screen = SCREENS[tab]
  return (
    <div className="min-h-screen flex flex-col"
      style={{ background:COLORS.white, fontFamily:"Inter,-apple-system,sans-serif" }}>
      {apiError && (
        <div className="px-4 py-2 text-xs text-center font-semibold" style={{ background:"#FF3B30", color:"white" }}>
          <WifiOff size={12} className="inline mr-1" /> API Offline - Demo mode
        </div>
      )}
      <div className="sticky top-0 z-40 px-4 pt-12 pb-4"
        style={{ background:COLORS.white+"cc", backdropFilter:"blur(20px)" }}>
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <h1 className="text-xl font-bold" style={{ color:COLORS.carbon }}>
              FLIK<span style={{ color:COLORS.green }}>.</span>
            </h1>
            <p className="text-xs" style={{ color:COLORS.gray }}>Circular Economy · AInsekt Farm</p>
          </div>
          <div className="flex items-center gap-2">
            <Pulse color={COLORS.green} size={6} />
            <span className="text-xs font-semibold" style={{ color:COLORS.green }}>
              {apiError ? "Demo" : "Live"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 px-4 pb-28 max-w-lg mx-auto w-full">
        <Screen />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8 pt-2"
        style={{ background:COLORS.white+"cc", backdropFilter:"blur(20px)" }}>
        <div className="max-w-lg mx-auto flex items-center justify-around"
          style={{ background:"rgba(255,255,255,0.9)", borderRadius:24, padding:"8px 4px",
            boxShadow:"0 4px 24px rgba(0,0,0,0.08)" }}>
          {NAV.map(({ id, icon:Icon, label }) => {
            const active = tab===id
            return (
              <button key={id} onClick={() => setTab(id)}
                className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all"
                style={{ background:active?COLORS.green+"18":"transparent" }}>
                <Icon size={20} style={{ color:active?COLORS.green:COLORS.gray }} strokeWidth={active?2.5:1.8} />
                <span className="text-xs font-semibold" style={{ color:active?COLORS.green:COLORS.gray }}>{label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import Image from "next/image"
import {useTranslations} from "next-intl"
import LanguageSwitcher from "../components/LanguageSwitcher"

export default function Home() {
  const t = useTranslations()

  const metricsData: [string, string, string][] = [
    [t("metrics.valuation"), "20–28M USD", "#00FF88"],
    [t("metrics.supply"), "100M tokens", "white"],
    [t("metrics.btcMining"), "50% energy → HODL", "#F7931A"],
    [t("metrics.aiCompute"), "50% energy → B2B", "#4488ff"],
    [t("metrics.heatRecovery"), "Free farm heating", "#00FF88"],
    [t("metrics.irr"), "18–30%", "white"],
    [t("metrics.domicile"), "Switzerland GmbH", "#00FF88"],
  ]

  const streamsData: [string, string, string][] = [
    ["🌱", t("streams.flik"), t("streams.flikDesc")],
    ["🦟", t("streams.bsf"), t("streams.bsfDesc")],
    ["₿", t("streams.btc"), t("streams.btcDesc")],
    ["🖥️", t("streams.ai"), t("streams.aiDesc")],
    ["⚡", t("streams.biogas"), t("streams.biogasDesc")],
    ["🌡️", t("streams.heat"), t("streams.heatDesc")],
  ]

  const usersData: [string, string, string][] = [
    ["🏭", t("flik.biogas"), t("flik.biogasDesc")],
    ["🏪", t("flik.supermarkets"), t("flik.supermarketsDesc")],
    ["👨‍🌾", t("flik.farmers"), t("flik.farmersDesc")],
    ["👤", t("flik.individuals"), t("flik.individualsDesc")],
    ["🏢", t("flik.businesses"), t("flik.businessesDesc")],
  ]

  const tokenAlloc: [string, number][] = [
    [t("token.allocDev"), 40],
    [t("token.allocTreasury"), 20],
    [t("token.allocLiquidity"), 15],
    [t("token.allocStaking"), 10],
    [t("token.allocChain"), 5],
    [t("token.allocRewards"), 5],
    [t("token.allocTeam"), 5],
  ]

  const roadmapData: [string, string, string, boolean][] = [
    [t("roadmap.p1"), t("roadmap.p1Title"), t("roadmap.p1Desc"), true],
    [t("roadmap.p2"), t("roadmap.p2Title"), t("roadmap.p2Desc"), true],
    [t("roadmap.p3"), t("roadmap.p3Title"), t("roadmap.p3Desc"), false],
    [t("roadmap.p4"), t("roadmap.p4Title"), t("roadmap.p4Desc"), false],
    [t("roadmap.p5"), t("roadmap.p5Title"), t("roadmap.p5Desc"), false],
  ]

  return (
    <main className="min-h-screen bg-[#050508] text-white font-sans overflow-x-hidden">

      {/* NAV */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#050508]/95 backdrop-blur border-b border-[#00FF88]/10">
        <div className="flex items-center gap-3">
          <Image src="/mascot.jpg" alt="AInsekt" width={32} height={32} className="rounded-full border border-[#00FF88]/30" />
          <span className="font-black text-xl tracking-tight">
            AI<span className="text-[#00FF88]">nsekt</span> Farm
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-mono tracking-widest uppercase text-[#666677]">
          {[["#flik",t("nav.flik")],["#energy",t("nav.energy")],["#token",t("nav.token")],["#roadmap",t("nav.roadmap")]].map(([h,l])=>(
            <a key={h} href={h} className="hover:text-[#00FF88] transition">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a href="#contact" className="bg-[#00FF88] text-[#050508] font-black text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#00CC66] transition">
            {t("nav.invest")}
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-8 py-28 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{backgroundImage:"linear-gradient(#00FF88 1px,transparent 1px),linear-gradient(90deg,#00FF88 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-[#00FF88] text-xs font-mono tracking-widest uppercase border border-[#00FF88]/20 px-3 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse"/>
            {t("hero.badge")}
          </div>
          <h1 className="text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-6">
            {t("hero.title1")}<br/>{t("hero.title2")}<br/><span className="text-[#00FF88]">{t("hero.title3")}</span>
          </h1>
          <p className="text-[#666677] text-lg leading-relaxed mb-4 max-w-lg">{t("hero.desc")}</p>
          <p className="text-[#666677] text-sm leading-relaxed mb-8 max-w-lg">{t("hero.subdesc")}</p>
          <div className="flex gap-3 flex-wrap mb-8">
            <a href="#contact" className="bg-[#00FF88] text-[#050508] font-black px-8 py-3 hover:bg-[#00CC66] transition">{t("hero.btnDeck")}</a>
            <a href="#flik" className="border border-[#00FF88]/20 text-white text-xs font-mono tracking-widest uppercase px-6 py-3 hover:border-[#00FF88] transition">{t("hero.btnExplore")}</a>
          </div>
          <div className="flex gap-6 text-xs font-mono text-[#666677]">
            <span>🇨🇭 {t("hero.locCH")}</span>
            <span>🇺🇦 {t("hero.locUA")}</span>
            <span>🌍 {t("hero.locGlobal")}</span>
          </div>
        </div>
        <div className="bg-[#080f08] border border-[#00FF88]/10 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF88] to-transparent"/>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00FF88]/3 rounded-full blur-2xl"/>
          <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-6">{t("metrics.title")}</div>
          {metricsData.map(([label,value,color])=>(
            <div key={label} className="flex justify-between items-center py-3 border-b border-[#00FF88]/5 last:border-0">
              <span className="text-[#666677] text-sm">{label}</span>
              <span className="font-black font-mono text-sm" style={{color}}>{value}</span>
            </div>
          ))}
          <div className="mt-6 flex justify-center">
            <Image src="/mascot.jpg" alt="FLIK" width={80} height={100} className="opacity-80" style={{animation:"float 4s ease-in-out infinite"}}/>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="border-y border-[#00FF88]/10 bg-[#080f08] py-3 overflow-hidden">
        <div className="flex gap-16 w-max" style={{animation:"ticker 40s linear infinite"}}>
          {[...Array(2)].flatMap((_,i)=>
            ["FLIK APP","BSF PROTEIN","CRICKET EU NOVEL FOOD","BTC RESERVE","AI COMPUTE CENTER","HEAT RECOVERY","AINS TOKEN","AGROAI CHAIN","ZERO WASTE NFT","FINMA SWITZERLAND","QUANTUM READY","GREEN POINTS"].map(txt=>(
              <span key={`${i}-${txt}`} className="font-mono text-[#00FF88] text-xs tracking-widest uppercase whitespace-nowrap">◆ {txt}</span>
            ))
          )}
        </div>
      </div>

      {/* 6 REVENUE STREAMS */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#00FF88]"/>{t("streams.label")}
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-4">{t("streams.title")} <span className="text-[#00FF88]">{t("streams.titleGreen")}</span></h2>
          <p className="text-[#666677] mb-12 max-w-2xl">{t("streams.desc")}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#00FF88]/5 border border-[#00FF88]/5">
            {streamsData.map(([icon,title,desc])=>(
              <div key={title} className="bg-[#050508] p-8 hover:bg-[#080f08] transition group relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF88] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"/>
                <div className="text-3xl mb-4">{icon}</div>
                <div className="font-black text-[#00FF88] text-lg mb-3">{title}</div>
                <div className="text-[#666677] text-sm leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENERGY MODEL */}
      <section id="energy" className="bg-[#080f08] py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#00FF88]"/>{t("energy.label")}
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-4">{t("energy.title")} <span className="text-[#00FF88]">{t("energy.titleGreen")}</span></h2>
          <p className="text-[#666677] mb-12 max-w-2xl">{t("energy.desc")}</p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {([
              ["₿", t("energy.btcTitle"), t("energy.btcDesc"), "#F7931A"],
              ["🖥️", t("energy.aiTitle"), t("energy.aiDesc"), "#4488ff"],
              ["🌡️", t("energy.heatTitle"), t("energy.heatDesc"), "#00FF88"],
            ] as [string,string,string,string][]).map(([icon,title,desc,color])=>(
              <div key={title} className="border p-8 relative overflow-hidden" style={{borderColor:color+"33",background:color+"05"}}>
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{background:color}}/>
                <div className="text-3xl mb-4">{icon}</div>
                <div className="font-black text-lg mb-3" style={{color}}>{title}</div>
                <div className="text-[#666677] text-sm leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
          <div className="bg-[#050508] border border-[#00FF88]/10 p-6">
            <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-4">{t("energy.calcTitle")}</div>
            <div className="grid md:grid-cols-4 gap-6">
              {([
                ["950 kW",t("energy.calcThermal")],
                ["0 USD",t("energy.calcCost")],
                ["~30%",t("energy.calcOpex")],
                ["120k USD",t("energy.calcSavings")],
              ] as [string,string][]).map(([val,lbl])=>(
                <div key={lbl} className="text-center">
                  <div className="text-3xl font-black text-[#00FF88] mb-1">{val}</div>
                  <div className="text-[#666677] text-xs font-mono">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FLIK APP */}
      <section id="flik" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#00FF88]"/>{t("flik.label")}
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-4">{t("flik.title")} <span className="text-[#00FF88]">{t("flik.titleGreen")}</span></h2>
          <p className="text-[#666677] mb-4 max-w-2xl">{t("flik.desc")}</p>
          <p className="text-[#666677] text-sm mb-12 max-w-2xl">{t("flik.subdesc")}</p>
          <div className="grid md:grid-cols-5 gap-3 mb-12">
            {usersData.map(([icon,title,desc])=>(
              <div key={title} className="bg-[#080f08] border border-[#00FF88]/10 p-5 hover:border-[#00FF88]/40 transition">
                <div className="text-2xl mb-3">{icon}</div>
                <div className="font-black text-[#00FF88] text-sm mb-2">{title}</div>
                <div className="text-[#666677] text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {([
              ["🗺️", t("flik.mapTitle"), t("flik.mapDesc")],
              ["⏱️", t("flik.countdownTitle"), t("flik.countdownDesc")],
              ["💚", t("flik.gpTitle"), t("flik.gpDesc")],
              ["📦", t("flik.reservTitle"), t("flik.reservDesc")],
              ["🏅", t("flik.nftTitle"), t("flik.nftDesc")],
              ["🤖", t("flik.agentTitle"), t("flik.agentDesc")],
            ] as [string,string,string][]).map(([icon,title,desc])=>(
              <div key={title} className="flex gap-4 p-5 border border-[#00FF88]/8 hover:border-[#00FF88]/25 transition bg-[#080f08]">
                <span className="text-xl">{icon}</span>
                <div>
                  <div className="font-black text-sm mb-1">{title}</div>
                  <div className="text-[#666677] text-xs leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOKEN */}
      <section id="token" className="bg-[#080f08] py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#00FF88]"/>{t("token.label")}
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-4">{t("token.title")} <span className="text-[#00FF88]">{t("token.titleGreen")}</span></h2>
          <p className="text-[#666677] mb-12 max-w-2xl">{t("token.desc")}</p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-6">{t("token.allocTitle")}</div>
              <div className="space-y-3">
                {tokenAlloc.map(([label,pct])=>(
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-[#666677]">{label}</span>
                      <span className="font-mono font-black">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 overflow-hidden">
                      <div className="h-full bg-[#00FF88]" style={{width:`${pct}%`}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {([
                ["🌱",t("token.gpRewardsTitle"),t("token.gpRewardsDesc")],
                ["💰",t("token.stakingTitle"),t("token.stakingDesc")],
                ["₿",t("token.btcTitle"),t("token.btcDesc")],
                ["🌍",t("token.daoTitle"),t("token.daoDesc")],
                ["🖥️",t("token.computeTitle"),t("token.computeDesc")],
                ["🎁",t("token.discountTitle"),t("token.discountDesc")],
              ] as [string,string,string][]).map(([icon,title,desc])=>(
                <div key={title} className="flex gap-3 p-4 border border-[#00FF88]/8 hover:border-[#00FF88]/25 transition">
                  <span className="text-base">{icon}</span>
                  <div>
                    <div className="font-black text-sm mb-1">{title}</div>
                    <div className="text-[#666677] text-xs leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#00FF88]"/>{t("roadmap.label")}
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-12">{t("roadmap.title")} <span className="text-[#00FF88]">{t("roadmap.titleGreen")}</span></h2>
          <div className="grid md:grid-cols-5 gap-4">
            {roadmapData.map(([period,title,desc,done],i)=>(
              <div key={String(title)} className="relative">
                <div className={`w-4 h-4 rounded-full border-2 mb-4 ${done?"bg-[#00FF88] border-[#00FF88]":"bg-[#050508] border-[#666677]"}`}/>
                <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-2">{period}</div>
                <div className="font-black text-lg mb-3">{title}</div>
                <div className="text-[#666677] text-sm leading-relaxed">{desc}</div>
                {i < roadmapData.length-1 && (
                  <div className="hidden md:block absolute top-2 left-4 right-0 h-px bg-[#00FF88]/10"/>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SWITZERLAND */}
      <section className="bg-[#080f08] py-24 px-8 border-y border-[#00FF88]/10">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#00FF88]"/>{t("legal.label")}
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-12">{t("legal.title")} <span className="text-[#00FF88]">{t("legal.titleGreen")}</span> {t("legal.titleEnd")}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {([
              ["🇨🇭",t("legal.chName"),t("legal.chDesc")],
              ["🇺🇦",t("legal.uaName"),t("legal.uaDesc")],
              ["🇵🇱",t("legal.plName"),t("legal.plDesc")],
            ] as [string,string,string][]).map(([flag,name,desc])=>(
              <div key={name} className="border border-[#00FF88]/10 p-8 hover:border-[#00FF88]/30 transition">
                <div className="text-4xl mb-4">{flag}</div>
                <div className="font-black text-lg text-[#00FF88] mb-3">{name}</div>
                <div className="text-[#666677] text-sm leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            {([
              [t("legal.finma"),t("legal.finmaSub"),t("legal.finmaTag")],
              [t("legal.quantum"),t("legal.quantumSub"),t("legal.quantumTag")],
              [t("legal.multisig"),t("legal.multisigSub"),t("legal.multisigTag")],
              [t("legal.treasury"),t("legal.treasurySub"),t("legal.treasuryTag")],
            ] as [string,string,string][]).map(([title,sub,tag])=>(
              <div key={title} className="bg-[#050508] border border-[#00FF88]/8 p-5 text-center">
                <div className="font-black text-[#00FF88] mb-1">{title}</div>
                <div className="text-[#666677] text-xs mb-2">{sub}</div>
                <div className="font-mono text-xs text-[#333344]">{tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image src="/mascot.jpg" alt="FLIK" width={100} height={125} className="drop-shadow-2xl" style={{animation:"float 4s ease-in-out infinite"}}/>
          </div>
          <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-4">{t("contact.label")}</div>
          <h2 className="text-6xl font-black tracking-tight mb-4 leading-[0.9]">{t("contact.title1")}<br/><span className="text-[#00FF88]">{t("contact.title2")}</span></h2>
          <p className="text-[#666677] mb-4">{t("contact.desc")}</p>
          <p className="text-[#666677] text-sm mb-10">{t("contact.subdesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="mailto:investor@ainsektfarm.com" className="bg-[#00FF88] text-[#050508] font-black px-10 py-4 hover:bg-[#00CC66] transition">
              investor@ainsektfarm.com
            </a>
            <a href="mailto:partners@ainsektfarm.com" className="border border-[#00FF88]/20 text-white font-mono text-xs tracking-widest uppercase px-8 py-4 hover:border-[#00FF88] transition">
              {t("contact.partnership")}
            </a>
          </div>
          <div className="flex justify-center gap-8 text-xs font-mono text-[#666677]">
            <a href="https://t.me/AInsectFarm" className="hover:text-[#00FF88] transition">Telegram</a>
            <a href="https://twitter.com/AInsectFarm" className="hover:text-[#00FF88] transition">Twitter/X</a>
            <a href="https://github.com/ainsectfarm" className="hover:text-[#00FF88] transition">GitHub</a>
            <a href="https://twitter.com/AgroAIChain" className="hover:text-[#00FF88] transition">AgroAI Chain</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#00FF88]/10 px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image src="/mascot.jpg" alt="FLIK" width={28} height={28} className="rounded-full border border-[#00FF88]/30"/>
            <span className="font-black text-lg">AI<span className="text-[#00FF88]">nsekt</span> Farm</span>
          </div>
          <span className="font-mono text-xs text-[#333344]">{t("footer.copy")}</span>
          <span className="font-mono text-xs text-[#333344]">{t("footer.seed")}</span>
        </div>
      </footer>

      <style>{`
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
    </main>
  )
}

import Image from "next/image"
import {useTranslations} from "next-intl"
import LanguageSwitcher from "../components/LanguageSwitcher"
import HeroMascot from "../components/HeroMascot"
import ScrollReveal from "../components/ScrollReveal"

/**
 * Strona główna AInsekt Farm — biznes plan v3.2.
 * Paleta:
 *   - tło główne          #0a1410 (głęboki leśny atrament)
 *   - tło karty           #0f1813 (delikatnie podniesione)
 *   - zieleń podstawowa   #52A371 (profesjonalna szałwiowa)
 *   - zieleń ciemniejsza  #3D7C57 (hover, drugi plan)
 *   - akcent ziemisty     #C8B68A (ciepła pszenica)
 *   - tekst stonowany     #94A89A
 *   - tekst zasadniczy    #C7D2C9
 *   - biel zimno-ciepła   #F0F2EE
 */
export default function Home() {
  const t = useTranslations()

  // Kluczowe wskaźniki finansowe — karta w sekcji hero
  const metricsData: [string, string, string][] = [
    [t("metrics.valuation"), "2,8 mln €", "#F0F2EE"],
    [t("metrics.supply"), "do 85 %", "#52A371"],
    [t("metrics.btcMining"), "450 tys. €", "#C8B68A"],
    [t("metrics.aiCompute"), "287 tys. €", "#52A371"],
    [t("metrics.heatRecovery"), "91 % · 5 500 t", "#52A371"],
    [t("metrics.irr"), "≈ 18 miesięcy", "#F0F2EE"],
    [t("metrics.domicile"), "2,2 mln € · 4,9×", "#52A371"],
  ]

  // Sześć filarów platformy
  const streamsData: [string, string, string][] = [
    ["⚡", t("streams.flik"), t("streams.flikDesc")],
    ["📊", t("streams.bsf"), t("streams.bsfDesc")],
    ["🌾", t("streams.btc"), t("streams.btcDesc")],
    ["📱", t("streams.ai"), t("streams.aiDesc")],
    ["🦟", t("streams.biogas"), t("streams.biogasDesc")],
    ["🖥️", t("streams.heat"), t("streams.heatDesc")],
  ]

  // Pięć grup użytkowników aplikacji FLIK
  const usersData: [string, string, string][] = [
    ["🏭", t("flik.biogas"), t("flik.biogasDesc")],
    ["🏪", t("flik.supermarkets"), t("flik.supermarketsDesc")],
    ["👨‍🌾", t("flik.farmers"), t("flik.farmersDesc")],
    ["👤", t("flik.individuals"), t("flik.individualsDesc")],
    ["🏢", t("flik.businesses"), t("flik.businessesDesc")],
  ]

  // Założona struktura finansowania Fazy I
  const fundingStack: [string, number][] = [
    [t("token.allocDev"), 85],
    [t("token.allocTreasury"), 10],
    [t("token.allocLiquidity"), 5],
  ]

  // Harmonogram realizacji — 5 etapów
  const roadmapData: [string, string, string, boolean][] = [
    [t("roadmap.p1"), t("roadmap.p1Title"), t("roadmap.p1Desc"), true],
    [t("roadmap.p2"), t("roadmap.p2Title"), t("roadmap.p2Desc"), false],
    [t("roadmap.p3"), t("roadmap.p3Title"), t("roadmap.p3Desc"), false],
    [t("roadmap.p4"), t("roadmap.p4Title"), t("roadmap.p4Desc"), false],
    [t("roadmap.p5"), t("roadmap.p5Title"), t("roadmap.p5Desc"), false],
  ]

  return (
    <main className="min-h-screen bg-[#0a1410] text-[#F0F2EE] font-sans overflow-x-hidden antialiased">

      {/* Pasek nawigacji */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0a1410]/95 backdrop-blur-md border-b border-[#52A371]/15">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 overflow-hidden rounded-full">
            <Image src="/mascot.jpg" alt="AInsekt" width={48} height={48} className="object-cover object-top scale-110" />
          </div>
          <span className="font-black text-xl tracking-tight">
            AI<span className="text-[#52A371]">nsekt</span> Farm
          </span>
        </div>
        <div className="hidden md:flex gap-7 text-[11px] font-mono tracking-[0.18em] uppercase text-[#94A89A]">
          {[["#vision",t("nav.vision")],["#energy",t("nav.energy")],["#flik",t("nav.flik")],["#token",t("nav.token")],["#roadmap",t("nav.roadmap")]].map(([h,l])=>(
            <a key={h} href={h} className="hover:text-[#52A371] transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a href="#contact" className="bg-[#52A371] text-[#0a1410] font-bold text-[11px] tracking-[0.18em] uppercase px-5 py-2.5 hover:bg-[#3D7C57] hover:text-white transition-colors">
            {t("nav.invest")}
          </a>
        </div>
      </nav>

      {/* Sekcja hero — nagłówek + karta wskaźników + maskotka */}
      <section className="relative px-8 py-28 md:py-32 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Subtelny grid w tle */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#52A371 1px,transparent 1px),linear-gradient(90deg,#52A371 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Lewa kolumna — tekst i wezwania do działania */}
        <ScrollReveal className="relative z-10">
          <div className="inline-flex items-center gap-2 text-[#52A371] text-[11px] font-mono tracking-[0.22em] uppercase border border-[#52A371]/25 px-3.5 py-2 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#52A371] animate-pulse"/>
            {t("hero.badge")}
          </div>
          <h1 className="text-5xl md:text-[64px] font-black leading-[1.05] tracking-[-0.02em] mb-7">
            {t("hero.title1")}{" "}
            <span className="text-[#94A89A]">{t("hero.title2")}</span>{" "}
            <span className="text-[#52A371]">{t("hero.title3")}</span>
          </h1>
          <p className="text-[#C7D2C9] text-lg leading-[1.7] mb-5 max-w-xl">{t("hero.desc")}</p>
          <p className="text-[#94A89A] text-sm leading-[1.7] mb-10 max-w-xl">{t("hero.subdesc")}</p>

          {/* Wezwania do działania — biznes plan, partnerzy, demo aplikacji */}
          <div className="flex gap-3 flex-wrap mb-10">
            <a
              href="/biznes-plan-v3.2.html"
              target="_blank"
              rel="noopener"
              className="bg-[#52A371] text-[#0a1410] font-bold px-8 py-3.5 hover:bg-[#3D7C57] hover:text-white transition-colors"
            >
              {t("hero.btnDeck")}
            </a>
            <a href="#contact" className="border border-[#52A371]/35 text-[#F0F2EE] font-mono tracking-[0.15em] uppercase text-xs px-6 py-3.5 hover:border-[#52A371] hover:bg-[#52A371]/5 transition-colors">
              {t("hero.btnPartners")}
            </a>
            <a href="/flik" className="text-[#52A371] font-mono tracking-[0.15em] uppercase text-xs px-3 py-3.5 hover:text-[#C8B68A] transition-colors">
              {t("hero.btnExplore")}
            </a>
          </div>

          <div className="flex flex-wrap gap-5 text-xs font-mono text-[#94A89A]">
            <span>{t("hero.locCH")}</span>
            <span>{t("hero.locUA")}</span>
            <span>{t("hero.locGlobal")}</span>
          </div>
        </ScrollReveal>

        {/* Prawa kolumna — maskotka z parallaxem + karta wskaźników */}
        <ScrollReveal delay={120} className="relative">
          <div className="absolute inset-0 -z-0">
            <HeroMascot />
          </div>

          <div className="relative z-10 bg-[#0f1813]/85 backdrop-blur-md border border-[#52A371]/20 p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#52A371] to-transparent"/>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#52A371]/5 rounded-full blur-2xl"/>
            <div className="font-mono text-[#52A371] text-[11px] tracking-[0.22em] uppercase mb-6">{t("metrics.title")}</div>
            {metricsData.map(([label,value,color])=>(
              <div key={label} className="flex justify-between items-center py-3.5 border-b border-[#52A371]/8 last:border-0">
                <span className="text-[#94A89A] text-sm">{label}</span>
                <span className="font-bold font-mono text-sm" style={{color}}>{value}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Pasek tickerowy — kluczowe pojęcia projektu */}
      <div className="border-y border-[#52A371]/12 bg-[#0f1813] py-3 overflow-hidden">
        <div className="flex gap-16 w-max" style={{animation:"ticker 50s linear infinite"}}>
          {[...Array(2)].flatMap((_,i)=>
            ["BIOGAZ 400 KW","TARYFA 15 LAT","91 % SUBSTRAT ROLNICZY","KOGENERACJA WYSOKOSPRAWNA","SPÓŁKA CELOWA","URUCHOMIENIE IX 2029","WOJ. OPOLSKIE / DOLNOŚLĄSKIE","APLIKACJA FLIK · LIVE","FAZA II · OWADY BSF","FAZA III · AI COMPUTE","PILOT 199 KW · WARIANT REZERWOWY"].map(txt=>(
              <span key={`${i}-${txt}`} className="font-mono text-[#52A371]/80 text-[11px] tracking-[0.22em] uppercase whitespace-nowrap">◆ {txt}</span>
            ))
          )}
        </div>
      </div>

      {/* Sekcja: Cel biznesowy, Wizja, Misja — prominentnie pod nawigacją */}
      <section id="vision" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="font-mono text-[#52A371] text-[11px] tracking-[0.22em] uppercase mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#52A371]"/>{t("vision.label")}
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-[-0.02em] leading-[1.05] mb-7">
              {t("vision.title")} <span className="text-[#52A371]">{t("vision.titleGreen")}</span>
            </h2>
            <p className="text-[#C7D2C9] text-lg md:text-xl leading-[1.7] max-w-3xl mb-16">{t("vision.intro")}</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5">
            {([
              [t("vision.goalTitle"),    t("vision.goalDesc"),    "01", 0],
              [t("vision.missionTitle"), t("vision.missionDesc"), "02", 140],
              [t("vision.visionTitle"),  t("vision.visionDesc"),  "03", 280],
            ] as [string,string,string,number][]).map(([title,desc,num,delay])=>(
              <ScrollReveal key={num} delay={delay}>
                <div className="bg-[#0f1813] border border-[#52A371]/15 p-8 h-full hover:border-[#52A371]/35 transition-colors">
                  <div className="font-mono text-[#C8B68A] text-xs tracking-[0.25em] mb-4">/ {num}</div>
                  <h3 className="text-2xl font-bold text-[#52A371] mb-4 tracking-tight">{title}</h3>
                  <p className="text-[#C7D2C9] leading-[1.7]">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja: Sześć filarów platformy */}
      <section className="bg-[#0f1813] py-28 px-8 border-y border-[#52A371]/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="font-mono text-[#52A371] text-[11px] tracking-[0.22em] uppercase mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#52A371]"/>{t("streams.label")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] leading-[1.1] mb-5">
              {t("streams.title")} <span className="text-[#52A371]">{t("streams.titleGreen")}</span>
            </h2>
            <p className="text-[#94A89A] mb-14 max-w-3xl leading-[1.7]">{t("streams.desc")}</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#52A371]/10 border border-[#52A371]/10">
            {streamsData.map(([icon,title,desc],i)=>(
              <ScrollReveal key={title} delay={i*60} className="bg-[#0a1410]">
                <div className="p-8 hover:bg-[#0f1813] transition-colors group relative overflow-hidden h-full">
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#52A371] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
                  <div className="text-3xl mb-5">{icon}</div>
                  <div className="font-bold text-[#52A371] text-lg mb-3 tracking-tight">{title}</div>
                  <div className="text-[#94A89A] text-sm leading-[1.7]">{desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja: Architektura energetyczna */}
      <section id="energy" className="py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="font-mono text-[#52A371] text-[11px] tracking-[0.22em] uppercase mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#52A371]"/>{t("energy.label")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] leading-[1.1] mb-5">
              {t("energy.title")} <span className="text-[#52A371]">{t("energy.titleGreen")}</span>
            </h2>
            <p className="text-[#94A89A] mb-14 max-w-3xl leading-[1.7]">{t("energy.desc")}</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {([
              ["⚡", t("energy.btcTitle"),  t("energy.btcDesc"),  "#52A371"],
              ["🔥", t("energy.aiTitle"),   t("energy.aiDesc"),   "#C8B68A"],
              ["🌱", t("energy.heatTitle"), t("energy.heatDesc"), "#52A371"],
            ] as [string,string,string,string][]).map(([icon,title,desc,color],i)=>(
              <ScrollReveal key={title} delay={i*100}>
                <div
                  className="border p-8 relative overflow-hidden h-full"
                  style={{borderColor:color+"30",background:color+"08"}}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{background:color}}/>
                  <div className="text-3xl mb-5">{icon}</div>
                  <div className="font-bold text-lg mb-3 tracking-tight" style={{color}}>{title}</div>
                  <div className="text-[#C7D2C9] text-sm leading-[1.7]">{desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Cztery liczby z bilansu rocznego */}
          <ScrollReveal>
            <div className="bg-[#0f1813] border border-[#52A371]/15 p-8">
              <div className="font-mono text-[#52A371] text-[11px] tracking-[0.22em] uppercase mb-6">{t("energy.calcTitle")}</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {([
                  ["2 452", t("energy.calcThermal")],
                  ["5 500", t("energy.calcCost")],
                  ["91 %",  t("energy.calcOpex")],
                  ["565 tys.", t("energy.calcSavings")],
                ] as [string,string][]).map(([val,lbl])=>(
                  <div key={lbl} className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-[#52A371] mb-2">{val}</div>
                    <div className="text-[#94A89A] text-xs font-mono tracking-wide leading-relaxed">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sekcja: Aplikacja FLIK */}
      <section id="flik" className="bg-[#0f1813] py-28 px-8 border-y border-[#52A371]/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="font-mono text-[#52A371] text-[11px] tracking-[0.22em] uppercase mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#52A371]"/>{t("flik.label")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] leading-[1.1] mb-5">
              {t("flik.title")} <span className="text-[#52A371]">{t("flik.titleGreen")}</span>
            </h2>
            <p className="text-[#C7D2C9] mb-4 max-w-3xl leading-[1.7]">{t("flik.desc")}</p>
            <p className="text-[#94A89A] text-sm mb-14 max-w-3xl leading-[1.7]">{t("flik.subdesc")}</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-14">
            {usersData.map(([icon,title,desc],i)=>(
              <ScrollReveal key={title} delay={i*60}>
                <div className="bg-[#0a1410] border border-[#52A371]/15 p-5 h-full hover:border-[#52A371]/40 transition-colors">
                  <div className="text-2xl mb-3">{icon}</div>
                  <div className="font-bold text-[#52A371] text-sm mb-2 tracking-tight">{title}</div>
                  <div className="text-[#94A89A] text-xs leading-[1.65]">{desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {([
              ["🗺️", t("flik.mapTitle"),       t("flik.mapDesc")],
              ["⏱️", t("flik.countdownTitle"), t("flik.countdownDesc")],
              ["🔄", t("flik.gpTitle"),        t("flik.gpDesc")],
              ["📦", t("flik.reservTitle"),    t("flik.reservDesc")],
              ["🏅", t("flik.nftTitle"),       t("flik.nftDesc")],
              ["🤖", t("flik.agentTitle"),     t("flik.agentDesc")],
            ] as [string,string,string][]).map(([icon,title,desc],i)=>(
              <ScrollReveal key={title} delay={i*50}>
                <div className="flex gap-4 p-5 border border-[#52A371]/12 hover:border-[#52A371]/30 transition-colors bg-[#0a1410] h-full">
                  <span className="text-xl shrink-0">{icon}</span>
                  <div>
                    <div className="font-bold text-sm mb-1.5 tracking-tight">{title}</div>
                    <div className="text-[#94A89A] text-xs leading-[1.65]">{desc}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja: Finansowanie projektu */}
      <section id="token" className="py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="font-mono text-[#52A371] text-[11px] tracking-[0.22em] uppercase mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#52A371]"/>{t("token.label")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] leading-[1.1] mb-5">
              {t("token.title")} <span className="text-[#52A371]">{t("token.titleGreen")}</span>
            </h2>
            <p className="text-[#94A89A] mb-14 max-w-3xl leading-[1.7]">{t("token.desc")}</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-14">
            {/* Założona struktura finansowania — proporcje */}
            <ScrollReveal>
              <div className="font-mono text-[#52A371] text-[11px] tracking-[0.22em] uppercase mb-7">{t("token.allocTitle")}</div>
              <div className="space-y-5">
                {fundingStack.map(([label,pct])=>(
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#C7D2C9]">{label}</span>
                      <span className="font-mono font-bold text-[#52A371]">{pct} %</span>
                    </div>
                    <div className="h-1.5 bg-white/5 overflow-hidden rounded-sm">
                      <div className="h-full bg-gradient-to-r from-[#52A371] to-[#3D7C57]" style={{width:`${pct}%`}}/>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[#94A89A] text-xs leading-[1.7] mt-7 pt-7 border-t border-[#52A371]/10">
                Proporcje docelowe — finalna struktura zostanie potwierdzona po pozytywnej decyzji o przyznaniu wsparcia inwestycyjnego.
              </p>
            </ScrollReveal>

            {/* Sześć opcji wsparcia, do których się kwalifikujemy */}
            <div className="space-y-3">
              {([
                ["🏛️", t("token.gpRewardsTitle"), t("token.gpRewardsDesc")],
                ["🏦", t("token.stakingTitle"),   t("token.stakingDesc")],
                ["🔀", t("token.btcTitle"),       t("token.btcDesc")],
                ["🇪🇺", t("token.daoTitle"),       t("token.daoDesc")],
                ["🧪", t("token.computeTitle"),   t("token.computeDesc")],
                ["🛡️", t("token.discountTitle"),  t("token.discountDesc")],
              ] as [string,string,string][]).map(([icon,title,desc],i)=>(
                <ScrollReveal key={title} delay={i*50}>
                  <div className="flex gap-4 p-5 border border-[#52A371]/12 hover:border-[#52A371]/30 transition-colors bg-[#0f1813]">
                    <span className="text-lg shrink-0">{icon}</span>
                    <div>
                      <div className="font-bold text-sm mb-1.5 tracking-tight">{title}</div>
                      <div className="text-[#94A89A] text-xs leading-[1.65]">{desc}</div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja: Harmonogram realizacji */}
      <section id="roadmap" className="bg-[#0f1813] py-28 px-8 border-y border-[#52A371]/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="font-mono text-[#52A371] text-[11px] tracking-[0.22em] uppercase mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#52A371]"/>{t("roadmap.label")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] leading-[1.1] mb-14">
              {t("roadmap.title")} <span className="text-[#52A371]">{t("roadmap.titleGreen")}</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {roadmapData.map(([period,title,desc,done],i)=>(
              <ScrollReveal key={String(title)} delay={i*80}>
                <div className="relative h-full">
                  <div className={`w-4 h-4 rounded-full border-2 mb-5 ${done?"bg-[#52A371] border-[#52A371]":"bg-[#0a1410] border-[#94A89A]"}`}/>
                  <div className="font-mono text-[#C8B68A] text-[10px] tracking-[0.22em] uppercase mb-2.5">{period}</div>
                  <div className="font-bold text-lg mb-3 tracking-tight leading-tight">{title}</div>
                  <div className="text-[#94A89A] text-sm leading-[1.65]">{desc}</div>
                  {i < roadmapData.length-1 && (
                    <div className="hidden md:block absolute top-2 left-5 right-0 h-px bg-[#52A371]/15"/>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja: Struktura prawna i partnerzy */}
      <section className="py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="font-mono text-[#52A371] text-[11px] tracking-[0.22em] uppercase mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#52A371]"/>{t("legal.label")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] leading-[1.1] mb-14">
              {t("legal.title")} <span className="text-[#52A371]">{t("legal.titleGreen")}</span> {t("legal.titleEnd")}
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5">
            {([
              ["🏢", t("legal.chName"), t("legal.chDesc")],
              ["⚖️", t("legal.uaName"), t("legal.uaDesc")],
              ["🌾", t("legal.plName"), t("legal.plDesc")],
            ] as [string,string,string][]).map(([icon,name,desc],i)=>(
              <ScrollReveal key={name} delay={i*100}>
                <div className="border border-[#52A371]/15 p-8 hover:border-[#52A371]/35 transition-colors bg-[#0f1813] h-full">
                  <div className="text-4xl mb-5">{icon}</div>
                  <div className="font-bold text-lg text-[#52A371] mb-3 tracking-tight">{name}</div>
                  <div className="text-[#C7D2C9] text-sm leading-[1.7]">{desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Pasek czterech tagów regulacyjnych */}
          <ScrollReveal delay={200}>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {([
                [t("legal.finma"),    t("legal.finmaSub"),    t("legal.finmaTag")],
                [t("legal.quantum"),  t("legal.quantumSub"),  t("legal.quantumTag")],
                [t("legal.multisig"), t("legal.multisigSub"), t("legal.multisigTag")],
                [t("legal.treasury"), t("legal.treasurySub"), t("legal.treasuryTag")],
              ] as [string,string,string][]).map(([title,sub,tag])=>(
                <div key={title} className="bg-[#0f1813] border border-[#52A371]/12 p-5 text-center">
                  <div className="font-bold text-[#52A371] mb-1.5">{title}</div>
                  <div className="text-[#C7D2C9] text-xs mb-2.5">{sub}</div>
                  <div className="font-mono text-[10px] text-[#94A89A] tracking-wide">{tag}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sekcja: Kontakt — wezwania do działania */}
      <section id="contact" className="bg-[#0f1813] py-28 px-8 border-t border-[#52A371]/10">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="flex justify-center mb-10">
              {/* Maskotka — overflow-hidden + scale, żeby ukryć fioletową ramkę z pliku JPG */}
              <div className="relative overflow-hidden rounded-2xl" style={{width: 150, height: 200}}>
                <Image
                  src="/mascot.jpg"
                  alt="FLIK — maskotka AInsekt Farm"
                  width={180}
                  height={240}
                  className="object-cover"
                  style={{
                    transform: "scale(1.08)",
                    transformOrigin: "center center",
                    animation: "float 5s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
            <div className="font-mono text-[#52A371] text-[11px] tracking-[0.22em] uppercase mb-5">{t("contact.label")}</div>
            <h2 className="text-5xl md:text-6xl font-black tracking-[-0.02em] mb-5 leading-[0.95]">
              {t("contact.title1")}<br/>
              <span className="text-[#52A371]">{t("contact.title2")}</span>
            </h2>
            <p className="text-[#C7D2C9] mb-4 leading-[1.7]">{t("contact.desc")}</p>
            <p className="text-[#94A89A] text-sm mb-12 leading-[1.7]">{t("contact.subdesc")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a href="mailto:investor@ainsektfarm.com" className="bg-[#52A371] text-[#0a1410] font-bold px-10 py-4 hover:bg-[#3D7C57] hover:text-white transition-colors">
                investor@ainsektfarm.com
              </a>
              <a href="mailto:partners@ainsektfarm.com" className="border border-[#52A371]/30 text-[#F0F2EE] font-mono text-xs tracking-[0.18em] uppercase px-8 py-4 hover:border-[#52A371] hover:bg-[#52A371]/5 transition-colors">
                {t("contact.partnership")}
              </a>
            </div>

            <div className="flex justify-center gap-7 text-xs font-mono text-[#94A89A]">
              <a href="https://t.me/AInsectFarm" className="hover:text-[#52A371] transition-colors">Telegram</a>
              <a href="https://twitter.com/AInsectFarm" className="hover:text-[#52A371] transition-colors">Twitter/X</a>
              <a href="https://github.com/ainsectfarm" className="hover:text-[#52A371] transition-colors">GitHub</a>
              <a href="https://www.ainsectfarm.com" className="hover:text-[#52A371] transition-colors">Aplikacja FLIK</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stopka */}
      <footer className="border-t border-[#52A371]/12 px-8 py-10 bg-[#0a1410]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 overflow-hidden rounded-full">
              <Image src="/mascot.jpg" alt="" width={42} height={42} className="object-cover object-top scale-110"/>
            </div>
            <span className="font-bold text-lg tracking-tight">AI<span className="text-[#52A371]">nsekt</span> Farm</span>
          </div>
          <span className="font-mono text-[11px] text-[#94A89A] tracking-wide">{t("footer.copy")}</span>
          <span className="font-mono text-[11px] text-[#94A89A] tracking-wide">{t("footer.seed")}</span>
        </div>
      </footer>

      {/* Animacje keyframe — ticker + floating maskotki */}
      <style>{`
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes float { 0%,100%{transform:translateY(0) scale(1.08)} 50%{transform:translateY(-10px) scale(1.08)} }
      `}</style>
    </main>
  )
}

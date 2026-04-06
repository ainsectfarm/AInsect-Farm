import Image from "next/image"

export default function Home() {
  const metrics = [
    ["Pre-money Valuation", "20–28M USD", "#00FF88"],
    ["AINS Fixed Supply", "100M tokens", "white"],
    ["BTC Mining", "50% energy → HODL", "#F7931A"],
    ["AI Compute", "50% energy → B2B", "#4488ff"],
    ["Heat Recovery", "Free farm heating", "#00FF88"],
    ["IRR Conservative", "18–30%", "white"],
    ["Domicile", "Switzerland GmbH", "#00FF88"],
  ]

  const streams = [
    ["🌱", "FLIK App", "Global circular food marketplace — 5 user types, AI agent, Green Points, reservations, Zero Waste NFT"],
    ["🦟", "BSF + Cricket", "Black Soldier Fly 50% + Cuban Cricket 50% — EU Novel Food 2023 — 2,500–8,000 USD/t"],
    ["₿", "BTC Reserve", "50% energy → Bitcoin mining → HODL treasury forever — never sold — on-chain transparent"],
    ["🖥️", "AI Compute", "50% energy → GPU rental B2B — 40%+ CAGR market — stable monthly contracts"],
    ["⚡", "Biogas + PV", "200kW biogas + 1MW solar → ~2,900 MWh/year — circular waste-to-energy"],
    ["🌡️", "Heat Recovery", "Miners + AI servers → free farm heating → 50k–120k USD/year OPEX saved"],
  ]

  const users = [
    ["🏭", "Biogas Plants", "Register capacity · real-time waste matching · monthly contracts"],
    ["🏪", "Supermarkets", "Near-expiry countdown · waste pickup · Zero Waste NFT certificate"],
    ["👨‍🌾", "Farmers", "Fresh produce direct · surplus listing · BSF frass orders"],
    ["👤", "Individuals", "Buy discounted food · report waste · earn AINS tokens"],
    ["🏢", "Businesses", "Waste scheduling · bulk buy · CSRD ESG report on-chain"],
  ]

  const tokenAlloc = [
    ["Project Development", 40],
    ["Safe / Treasury", 20],
    ["Liquidity DEX/CEX", 15],
    ["Staking Revenue Share", 10],
    ["AgroAI Blockchain", 5],
    ["FLIK App Rewards", 5],
    ["Team (5yr vesting)", 5],
  ]

  const roadmap = [
    ["M1–3", "FLIK App + Brand", "App MVP · Flik daily content · Swiss GmbH registered · 5,000+ followers", true],
    ["M4–6", "Community Scale", "FLIK public · 10,000 active users · AINS whitelist · private sale", true],
    ["M7–12", "Pre-sale + Farm", "Pre-sale rounds · Farm acquired · Construction · Miners + AI Compute", false],
    ["M13–24", "Production", "BSF+Cricket full · AI Compute open · AINS launch · AgroAI testnet", false],
    ["Year 3+", "Global Scale", "Series A · 10+ countries · AgroAI mainnet · Compute waitlist", false],
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
          {[["#flik","FLIK App"],["#energy","Energy"],["#token","Token"],["#roadmap","Roadmap"]].map(([h,l])=>(
            <a key={h} href={h} className="hover:text-[#00FF88] transition">{l}</a>
          ))}
        </div>
        <a href="#contact" className="bg-[#00FF88] text-[#050508] font-black text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#00CC66] transition">
          INVEST →
        </a>
      </nav>

      {/* HERO */}
      <section className="relative px-8 py-28 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{backgroundImage:"linear-gradient(#00FF88 1px,transparent 1px),linear-gradient(90deg,#00FF88 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-[#00FF88] text-xs font-mono tracking-widest uppercase border border-[#00FF88]/20 px-3 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse"/>
            Series Seed · 8–10M USD · Switzerland GmbH
          </div>
          <h1 className="text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-6">
            Circular<br/>Economy<br/><span className="text-[#00FF88]">Reinvented.</span>
          </h1>
          <p className="text-[#666677] text-lg leading-relaxed mb-4 max-w-lg">
            AInsekt Farm combines FLIK App marketplace, BSF + Cricket protein, BTC reserve, AI Compute Center, and quantum-ready blockchain into one self-reinforcing circular economy loop.
          </p>
          <p className="text-[#666677] text-sm leading-relaxed mb-8 max-w-lg">
            50% energy → BTC HODL treasury · 50% energy → AI Compute B2B revenue · Heat from both → free farm heating
          </p>
          <div className="flex gap-3 flex-wrap mb-8">
            <a href="#contact" className="bg-[#00FF88] text-[#050508] font-black px-8 py-3 hover:bg-[#00CC66] transition">
              Investor Deck
            </a>
            <a href="#flik" className="border border-[#00FF88]/20 text-white text-xs font-mono tracking-widest uppercase px-6 py-3 hover:border-[#00FF88] transition">
              Explore FLIK App
            </a>
          </div>
          <div className="flex gap-6 text-xs font-mono text-[#666677]">
            <span>🇨🇭 Switzerland GmbH</span>
            <span>🇺🇦 Farm: Ukraine</span>
            <span>🌍 FLIK: Global</span>
          </div>
        </div>

        <div className="bg-[#080f08] border border-[#00FF88]/10 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF88] to-transparent"/>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00FF88]/3 rounded-full blur-2xl"/>
          <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-6">
            // Key Metrics — 2026
          </div>
          {metrics.map(([label,value,color])=>(
            <div key={label} className="flex justify-between items-center py-3 border-b border-[#00FF88]/5 last:border-0">
              <span className="text-[#666677] text-sm">{label}</span>
              <span className="font-black font-mono text-sm" style={{color:color as string}}>{value}</span>
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
            ["FLIK APP","BSF PROTEIN","CRICKET EU NOVEL FOOD","BTC RESERVE","AI COMPUTE CENTER","HEAT RECOVERY","AINS TOKEN","AGROAI CHAIN","ZERO WASTE NFT","FINMA SWITZERLAND","QUANTUM READY","GREEN POINTS"].map(t=>(
              <span key={`${i}-${t}`} className="font-mono text-[#00FF88] text-xs tracking-widest uppercase whitespace-nowrap">
                ◆ {t}
              </span>
            ))
          )}
        </div>
      </div>

      {/* 6 REVENUE STREAMS */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#00FF88]"/>Six Revenue Streams
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-4">Zero waste. <span className="text-[#00FF88]">Maximum value.</span></h2>
          <p className="text-[#666677] mb-12 max-w-2xl">Every element feeds every other. Self-reinforcing circular economy loop — the more waste FLIK collects, the more energy, the more protein, the more BTC, the more compute revenue.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#00FF88]/5 border border-[#00FF88]/5">
            {streams.map(([icon,title,desc])=>(
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
            <span className="w-8 h-px bg-[#00FF88]"/>Energy Architecture
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-4">One infrastructure. <span className="text-[#00FF88]">Three benefits.</span></h2>
          <p className="text-[#666677] mb-12 max-w-2xl">PV 1MW + Biogas 200kW generate ~2,900 MWh/year. Split 50/50 between BTC mining and AI compute. Heat from both heats the farm for free.</p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              ["₿", "50% → BTC Mining", "~1,450 MWh/year → Bitcoin HODL treasury. Never sold. Transparent on-chain. Grows every day.", "#F7931A"],
              ["🖥️", "50% → AI Compute", "~1,450 MWh/year → GPU rental B2B. Monthly contracts. 40%+ CAGR market. Stable revenue.", "#4488ff"],
              ["🌡️", "Heat → Free Farm", "~950 kW thermal recovered. BSF 28–32°C · Cricket 28–35°C · Both covered. 50k–120k USD/yr saved.", "#00FF88"],
            ].map(([icon,title,desc,color])=>(
              <div key={title} className="border p-8 relative overflow-hidden" style={{borderColor:(color as string)+"33",background:(color as string)+"05"}}>
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{background:color as string}}/>
                <div className="text-3xl mb-4">{icon}</div>
                <div className="font-black text-lg mb-3" style={{color:color as string}}>{title}</div>
                <div className="text-[#666677] text-sm leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
          <div className="bg-[#050508] border border-[#00FF88]/10 p-6">
            <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-4">// Heat Recovery Calculation</div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                ["950 kW","Thermal recovered"],
                ["0 USD","Farm heating cost"],
                ["~30%","OPEX reduction"],
                ["120k USD","Annual savings"],
              ].map(([val,lbl])=>(
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
            <span className="w-8 h-px bg-[#00FF88]"/>FLIK App
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-4">The circular food <span className="text-[#00FF88]">marketplace.</span></h2>
          <p className="text-[#666677] mb-4 max-w-2xl">FLIK connects biogas plants, supermarkets, farmers, individuals, and businesses in one platform. Too Good To Go reached 1.2B USD with only near-expiry food. FLIK does that and much more.</p>
          <p className="text-[#666677] text-sm mb-12 max-w-2xl">Live map · Smart countdown pricing · Reservation system · Green Points → AINS · Farmer Fresh marketplace · Zero Waste NFT · AI agent · Charity integration</p>
          <div className="grid md:grid-cols-5 gap-3 mb-12">
            {users.map(([icon,title,desc])=>(
              <div key={title} className="bg-[#080f08] border border-[#00FF88]/10 p-5 hover:border-[#00FF88]/40 transition">
                <div className="text-2xl mb-3">{icon}</div>
                <div className="font-black text-[#00FF88] text-sm mb-2">{title}</div>
                <div className="text-[#666677] text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["🗺️", "Live Map", "Real-time pins for near-expiry products, waste pickup, biogas capacity, and farmer fresh stands. Updates every 5 minutes."],
              ["⏱️", "Smart Countdown", "Automatic price drops: 48h=20% off · 24h=40% · 12h=60% · 6h=80% · Unsold → biogas automatically."],
              ["💚", "Green Points → AINS", "Earn for every kg saved, waste reported, volunteer hour. Convert to AINS tokens or redeem for discounts."],
              ["📦", "Reservations", "Reserve products 1–48h ahead. Monthly biogas contracts. SMS + push confirmation. Recurring farmer pickups."],
              ["🏅", "Zero Waste NFT", "Monthly achievement cert for businesses. Bronze/Silver/Gold/Platinum. CSRD compliant. Marketing badge."],
              ["🤖", "AI Agent", "Recipes for expiring food · CO2 impact calculator · ESG auto-reports · routing waste to optimal destination."],
            ].map(([icon,title,desc])=>(
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
            <span className="w-8 h-px bg-[#00FF88]"/>Token AINS
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-4">Utility token. <span className="text-[#00FF88]">Real backing.</span></h2>
          <p className="text-[#666677] mb-12 max-w-2xl">100M AINS fixed supply. Switzerland GmbH. FINMA DLT Act 2021. BTC reserve provides additional backing. Launch trigger: farm ARR ≥ 2M USD.</p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-6">// Token Allocation — 100M AINS</div>
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
              {[
                ["🌱","Green Points Rewards","1 AINS per kg waste saved · 10 AINS per volunteer hour · FLIK flywheel"],
                ["💰","Revenue Share Staking","Quarterly: farm protein + FLIK App + AI Compute revenue distributed to stakers"],
                ["₿","BTC Reserve Backing","On-chain verifiable treasury · additional value backing · never sold"],
                ["🌍","DAO Governance","Vote on expansion, treasury, FLIK development · 1 AINS = 1 vote"],
                ["🖥️","AI Compute Discount","15% off GPU rental when paying in AINS · drives organic token demand"],
                ["🎁","Marketplace Discounts","10–15% off BSF products, Cricket protein, frass fertiliser in AINS"],
              ].map(([icon,title,desc])=>(
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
            <span className="w-8 h-px bg-[#00FF88]"/>Roadmap
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-12">Community first. <span className="text-[#00FF88]">Then token. Then farm.</span></h2>
          <div className="grid md:grid-cols-5 gap-4">
            {roadmap.map(([period,title,desc,done],i)=>(
              <div key={String(title)} className="relative">
                <div className={`w-4 h-4 rounded-full border-2 mb-4 ${done?"bg-[#00FF88] border-[#00FF88]":"bg-[#050508] border-[#666677]"}`}/>
                <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-2">{period}</div>
                <div className="font-black text-lg mb-3">{title}</div>
                <div className="text-[#666677] text-sm leading-relaxed">{desc}</div>
                {i < roadmap.length-1 && (
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
            <span className="w-8 h-px bg-[#00FF88]"/>Legal Structure
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-12">Built in <span className="text-[#00FF88]">Switzerland.</span> Operating globally.</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["🇨🇭","AInsekt Farm GmbH","Kanton Wallis/Brig · FINMA DLT Act · Token AINS · FLIK App · IP · AgroAI Chain · investor relations"],
              ["🇺🇦","AInsekt Farm LLC","Western Ukraine · Physical farm · Biogas 200kW · PV 1MW · BTC mining · AI Compute Center"],
              ["🇵🇱","AInsekt Polska Sp. z o.o.","EU distribution · certifications · marketing · export channel to European markets (Year 2–3)"],
            ].map(([flag,name,desc])=>(
              <div key={name} className="border border-[#00FF88]/10 p-8 hover:border-[#00FF88]/30 transition">
                <div className="text-4xl mb-4">{flag}</div>
                <div className="font-black text-lg text-[#00FF88] mb-3">{name}</div>
                <div className="text-[#666677] text-sm leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            {[
              ["FINMA DLT Act","Utility token framework","Switzerland 2021"],
              ["Quantum Ready","CRYSTALS-Dilithium","NIST FIPS 204 2024"],
              ["Multi-sig 3/5","Treasury protection","Gnosis Safe + HSM"],
              ["BTC Treasury","Strategic reserve","HODL · On-chain visible"],
            ].map(([title,sub,tag])=>(
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
          <div className="font-mono text-[#00FF88] text-xs tracking-widest uppercase mb-4">// Ready to talk?</div>
          <h2 className="text-6xl font-black tracking-tight mb-4 leading-[0.9]">Close the loop.<br/><span className="text-[#00FF88]">Open markets.</span></h2>
          <p className="text-[#666677] mb-4">AInsekt Farm is circular economy infrastructure at the intersection of agritech, AI, blockchain, and BTC reserve.</p>
          <p className="text-[#666677] text-sm mb-10">Pitch deck, financial model, and whitepaper available under NDA. Direct meetings preferred — Switzerland, Ukraine, or remote.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="mailto:investor@ainsektfarm.com" className="bg-[#00FF88] text-[#050508] font-black px-10 py-4 hover:bg-[#00CC66] transition">
              investor@ainsektfarm.com
            </a>
            <a href="mailto:partners@ainsektfarm.com" className="border border-[#00FF88]/20 text-white font-mono text-xs tracking-widest uppercase px-8 py-4 hover:border-[#00FF88] transition">
              Partnership
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
          <span className="font-mono text-xs text-[#333344]">© 2026 AInsekt Farm GmbH · Kanton Wallis · Switzerland · FINMA</span>
          <span className="font-mono text-xs text-[#333344]">Series Seed · 8–10M USD</span>
        </div>
      </footer>

      <style>{`
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
    </main>
  )
}

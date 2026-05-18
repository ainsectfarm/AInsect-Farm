"use client"

import Image from "next/image"
import {useEffect, useRef, useState} from "react"

/**
 * Mascot z mouse-driven parallax — subtle 3D-feel bez heavy WebGL.
 * Strażnik wydajności:
 *   - max translate 12px (nie irytuje)
 *   - throttle przez requestAnimationFrame
 *   - prefers-reduced-motion respect
 *   - pointer-events:none żeby nie blokował CTA
 */
export default function HeroMascot() {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({x: 0, y: 0})

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const w = window.innerWidth
        const h = window.innerHeight
        // -1..1 normalizowane od środka ekranu
        const nx = (e.clientX / w - 0.5) * 2
        const ny = (e.clientY / h - 0.5) * 2
        setOffset({x: nx * 12, y: ny * 12})
      })
    }
    window.addEventListener("mousemove", handler, {passive: true})
    return () => {
      window.removeEventListener("mousemove", handler)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Glow rękojeściowy — większy ruch */}
      <div
        className="absolute w-[28rem] h-[28rem] rounded-full bg-[#00FF88]/10 blur-3xl"
        style={{
          transform: `translate3d(${offset.x * 2}px, ${offset.y * 2}px, 0)`,
          transition: "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      {/* Mascot — mniejszy ruch (bliżej kamery) */}
      <div
        className="relative z-10"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Image
          src="/mascot.jpg"
          alt=""
          width={360}
          height={486}
          priority
          className="opacity-95 drop-shadow-[0_0_40px_rgba(0,255,136,0.35)]"
          style={{animation: "float 6s ease-in-out infinite"}}
        />
      </div>
    </div>
  )
}

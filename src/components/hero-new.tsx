'use client'
import React, { useRef } from 'react'
import { IconBrandGithub, IconBrandDiscord } from '@tabler/icons-react'
import { TimelineAnimation } from '@/components/timeline-animation'

export const HeroShareApp = () => {
  const timelineRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={timelineRef}
      className="min-h-screen bg-red-50 text-neutral-900 relative overflow-hidden flex flex-col"
    >
      <TimelineAnimation
        timelineRef={timelineRef}
        animationNum={1}
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(125% 125% at 50% 90%, #fff 40%, #f16d63 100%)',
        }}
      />
      <div className="relative z-10 grow flex flex-col items-center justify-center text-center px-4 pt-10">
        <TimelineAnimation
          timelineRef={timelineRef}
          animationNum={3}
          className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full border border-neutral-100 shadow-sm mb-8"
        >
          <span className="text-sm font-bold text-neutral-600">
            ⚡ Minecraft Plugin Development
          </span>
        </TimelineAnimation>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-neutral-800 max-w-5xl leading-[0.9] mb-10">
          <TimelineAnimation
            as="span"
            timelineRef={timelineRef}
            animationNum={4}
          >
            Minecraft Plugins,
          </TimelineAnimation>
          <br />
          <TimelineAnimation
            as="span"
            timelineRef={timelineRef}
            animationNum={5}
          >
            Websites & More
          </TimelineAnimation>
        </h1>

        <TimelineAnimation
          as="p"
          timelineRef={timelineRef}
          animationNum={6}
          className="text-xl md:text-2xl text-neutral-800 font-bold max-w-2xl mb-12"
        >
          VOMLabs is a team of developers crafting plugins, websites, and
          open-source tools for Minecraft server owners and the community.
        </TimelineAnimation>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-24">
          <TimelineAnimation
            as="a"
            href="https://github.com/vomlabs"
            target="_blank"
            rel="noopener noreferrer"
            timelineRef={timelineRef}
            animationNum={7}
            className="bg-linear-to-t from-red-400 to-red-500 cursor-pointer text-white px-4 py-4 rounded-xl font-semibold text-xl shadow-2xl flex items-center gap-3 transition"
          >
            <IconBrandGithub className="w-8 h-8" />
            Browse GitHub
          </TimelineAnimation>
          <TimelineAnimation
            as="a"
            href="https://dc.vomlabs.de"
            target="_blank"
            rel="noopener noreferrer"
            timelineRef={timelineRef}
            animationNum={8}
            className="cursor-pointer bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl flex items-center gap-3 transition"
          >
            <IconBrandDiscord className="w-8 h-8" />
            Join Discord
          </TimelineAnimation>
        </div>

        {/*<div className="relative w-full max-w-7xl h-[300px]">
          <TimelineAnimation
            as="button"
            timelineRef={timelineRef}
            animationNum={9}
            className="absolute left-0 bottom-[-100px] w-105 h-96 bg-white rounded-4xl shadow-2xl overflow-hidden transform rotate-[-15deg] translate-x-12 translate-y-12 border-4 border-white"
          >
            <Image
              src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full object-cover"
            />
          </TimelineAnimation>
          <TimelineAnimation
            as="button"
            timelineRef={timelineRef}
            animationNum={10}
            className="absolute left-1/2 -translate-x-1/2 bottom-[-150px] w-100 h-[450px] bg-white rounded-4xl shadow-2xl z-20 overflow-hidden border-4 border-white"
          >
            <Image
              src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full object-cover"
            />
          </TimelineAnimation>
          <TimelineAnimation
            as="button"
            timelineRef={timelineRef}
            animationNum={11}
            className="absolute right-0 bottom-[-100px] w-105 h-96 bg-white rounded-4xl shadow-2xl overflow-hidden transform rotate-15 -translate-x-12 translate-y-12 border-4 border-white"
          >
            <Image
              src="https://images.unsplash.com/photo-1768361435257-819e2c22f0b4?q=80&w=713&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full object-cover"
            />
          </TimelineAnimation>
        </div>*/}
      </div>
    </section>
  )
}

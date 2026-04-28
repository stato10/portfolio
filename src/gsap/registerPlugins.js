import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { ExpoScaleEase } from 'gsap/EasePack'

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, ExpoScaleEase)

export { gsap, useGSAP, ScrollTrigger, Flip }

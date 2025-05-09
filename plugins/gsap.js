// /plugins/gsap.js

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { Observer } from 'gsap/Observer'
import { SplitText } from 'gsap/SplitText'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(Observer, ScrollTrigger, InertiaPlugin, SplitText)

  if (import.meta.client) {
    gsap.registerPlugin(Draggable)
  }

  return {
    provide: {
      gsap,
      Observer,
      ScrollTrigger,
      Draggable,
      SplitText
    }
  }
})
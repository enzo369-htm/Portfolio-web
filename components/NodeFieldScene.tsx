"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const NODE_COUNT = 90
const BOX = 13
const PURPLE = [0.655, 0.545, 0.98]
const YELLOW = [1, 0.769, 0]

type Node = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
}

export default function NodeFieldScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(host.clientWidth, host.clientHeight)
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, host.clientWidth / host.clientHeight, 0.1, 80)
    camera.position.set(0, 0, 16)

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: (Math.random() - 0.5) * BOX * 1.7,
      y: (Math.random() - 0.5) * BOX,
      z: (Math.random() - 0.5) * BOX,
      vx: (Math.random() - 0.5) * 0.018,
      vy: (Math.random() - 0.5) * 0.018,
      vz: (Math.random() - 0.5) * 0.014,
    }))

    const positions = new Float32Array(NODE_COUNT * 3)
    const colors = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      const c = i % 2 === 0 ? PURPLE : YELLOW
      colors[i * 3] = c[0]
      colors[i * 3 + 1] = c[1]
      colors[i * 3 + 2] = c[2]
    }

    const pointGeo = new THREE.BufferGeometry()
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    pointGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    const points = new THREE.Points(
      pointGeo,
      new THREE.PointsMaterial({
        size: 0.11,
        transparent: true,
        opacity: 0.78,
        sizeAttenuation: true,
        depthWrite: false,
        vertexColors: true,
      })
    )
    scene.add(points)

    const mouse = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })

    const writeNodes = () => {
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i]
        if (!reduce) {
          n.x += n.vx
          n.y += n.vy
          n.z += n.vz
          if (n.x > BOX || n.x < -BOX) n.vx *= -1
          if (n.y > BOX * 0.75 || n.y < -BOX * 0.75) n.vy *= -1
          if (n.z > BOX || n.z < -BOX) n.vz *= -1
        }
        positions[i * 3] = n.x
        positions[i * 3 + 1] = n.y
        positions[i * 3 + 2] = n.z
      }
      pointGeo.attributes.position.needsUpdate = true
    }

    writeNodes()

    const onResize = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", onResize)

    let raf = 0
    const tick = () => {
      writeNodes()
      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03
      camera.position.y += (mouse.y * 0.7 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      if (!reduce) raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("resize", onResize)
      renderer.dispose()
      pointGeo.dispose()
      points.material.dispose()
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={hostRef} className="h-full w-full" />
}

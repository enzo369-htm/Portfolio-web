"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

type CountryProps = {
  NAME: string
  LABELRANK: number
}

type CountryFeature = {
  properties: CountryProps
  geometry: {
    type: "Polygon" | "MultiPolygon"
    coordinates: number[][][] | number[][][][]
  }
}

const NAME_ES: Record<string, string> = {
  Argentina: "Argentina",
  Australia: "Australia",
  Belgium: "Bélgica",
  Brazil: "Brasil",
  Canada: "Canadá",
  Chile: "Chile",
  China: "China",
  "Dem. Rep. Congo": "R. D. del Congo",
  Colombia: "Colombia",
  Germany: "Alemania",
  Egypt: "Egipto",
  Spain: "España",
  Ethiopia: "Etiopía",
  France: "Francia",
  "United Kingdom": "Reino Unido",
  Indonesia: "Indonesia",
  India: "India",
  Iran: "Irán",
  Italy: "Italia",
  Japan: "Japón",
  Kenya: "Kenia",
  "South Korea": "Corea del Sur",
  Mexico: "México",
  Nigeria: "Nigeria",
  "New Zealand": "Nueva Zelanda",
  Pakistan: "Pakistán",
  Peru: "Perú",
  Philippines: "Filipinas",
  "Papua New Guinea": "Papúa Nueva Guinea",
  Portugal: "Portugal",
  Russia: "Rusia",
  "Saudi Arabia": "Arabia Saudita",
  Turkey: "Turquía",
  "United States of America": "Estados Unidos",
  Vietnam: "Vietnam",
  "South Africa": "Sudáfrica",
}

const CONTINENTS = [
  { name: "África", lat: 7, lng: 20, size: 0.085 },
  { name: "Asia", lat: 45, lng: 90, size: 0.085 },
  { name: "Europa", lat: 54, lng: 20, size: 0.075 },
  { name: "América del Norte", lat: 48, lng: -100, size: 0.07 },
  { name: "América del Sur", lat: -15, lng: -58, size: 0.07 },
  { name: "Oceanía", lat: -25, lng: 138, size: 0.07 },
]

const CITIES = [
  { name: "Madrid", lat: 40.4168, lng: -3.7038 },
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
  { name: "Córdoba", lat: -31.4201, lng: -64.1888 },
  { name: "Jujuy", lat: -24.1858, lng: -65.2995 },
  { name: "Los Ángeles", lat: 34.0522, lng: -118.2437 },
  { name: "Medellín", lat: 6.2442, lng: -75.5812 },
  { name: "Osorno", lat: -40.574, lng: -73.1319 },
]

const RADIUS = 1
const BONE = new THREE.Color("#e6e0d4")
const CYAN = new THREE.Color("#5b7f88")
const MARKER = new THREE.Color("#ffd56a")

function latLngToVec(lat: number, lng: number, r = RADIUS) {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

function ringsOf(feature: CountryFeature) {
  if (feature.geometry.type === "Polygon") return feature.geometry.coordinates
  return feature.geometry.coordinates.flatMap((poly) => poly)
}

function ringCentroid(ring: number[][]) {
  let x = 0
  let y = 0
  let z = 0
  for (const [lng, lat] of ring) {
    const v = latLngToVec(lat, lng)
    x += v.x
    y += v.y
    z += v.z
  }
  const n = Math.max(1, ring.length)
  return new THREE.Vector3(x / n, y / n, z / n).normalize().multiplyScalar(RADIUS * 1.02)
}

function makeLabel(text: string, position: THREE.Vector3, size: number, weight = 500, fill = "rgba(230, 224, 212, 0.92)") {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) return null
  canvas.width = 512
  canvas.height = 128
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = `${weight} ${Math.round(42 * (size / 0.07))}px "Share Tech Mono", ui-monospace, monospace`
  ctx.fillStyle = fill
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false })
  )
  sprite.position.copy(position)
  sprite.scale.set(size * 4.4, size * 1.1, 1)
  sprite.userData.worldPos = position.clone()
  return sprite
}

export default function EarthGlobeCanvas() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20)
    camera.position.set(-0.18, 0.08, 3.35)
    camera.position.setLength(camera.position.length() / 0.86)

    const controls = new OrbitControls(camera, host)
    controls.enablePan = false
    controls.enableZoom = false
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.rotateSpeed = 0.55
    const viewDistance = camera.position.length()
    controls.minDistance = viewDistance
    controls.maxDistance = viewDistance
    controls.autoRotate = !reduce
    controls.autoRotateSpeed = 0.55
    controls.target.set(0, 0, 0)
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.ROTATE,
      RIGHT: THREE.MOUSE.ROTATE,
    }
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.ROTATE,
    }
    host.style.touchAction = "pan-y"

    scene.add(new THREE.AmbientLight(0x9aa8b4, 0.55))
    const sun = new THREE.DirectionalLight(0xf3efe6, 1.15)
    sun.position.set(3.2, 1.4, 2.8)
    scene.add(sun)

    const ocean = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, 80, 80),
      new THREE.MeshPhongMaterial({
        color: 0x10161c,
        shininess: 18,
        specular: new THREE.Color(0x24303a),
      })
    )
    scene.add(ocean)

    const grid = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(RADIUS * 1.001, 36, 18)),
      new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.16 })
    )
    scene.add(grid)

    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.08, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x5b7f88,
        transparent: true,
        opacity: 0.09,
        side: THREE.BackSide,
      })
    )
    scene.add(atmo)

    const labels: THREE.Sprite[] = []
    const markers: THREE.Object3D[] = []
    const markerCoreGeo = new THREE.SphereGeometry(0.018, 16, 16)
    const markerGlowGeo = new THREE.SphereGeometry(0.038, 16, 16)
    const markerCoreMat = new THREE.MeshBasicMaterial({ color: MARKER })
    const markerGlowMat = new THREE.MeshBasicMaterial({
      color: MARKER,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    })
    const dispose: Array<() => void> = []

    for (const city of CITIES) {
      const pos = latLngToVec(city.lat, city.lng, RADIUS * 1.016)
      const marker = new THREE.Group()
      marker.add(new THREE.Mesh(markerCoreGeo, markerCoreMat))
      marker.add(new THREE.Mesh(markerGlowGeo, markerGlowMat))
      marker.position.copy(pos)
      marker.userData.worldPos = pos.clone()
      markers.push(marker)
      scene.add(marker)

      const labelPos = latLngToVec(city.lat + 3.4, city.lng, RADIUS * 1.07)
      const sprite = makeLabel(city.name, labelPos, 0.052, 700, "rgba(255, 213, 106, 0.96)")
      if (sprite) {
        labels.push(sprite)
        scene.add(sprite)
      }
    }

    const applySize = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (w < 2 || h < 2) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    applySize()
    const ro = new ResizeObserver(applySize)
    ro.observe(host)

    const abort = new AbortController()
    fetch("/data/countries-110m.geojson", { signal: abort.signal })
      .then((res) => res.json())
      .then((data: { features: CountryFeature[] }) => {
        const positions: number[] = []
        for (const feature of data.features) {
          for (const ring of ringsOf(feature)) {
            for (let i = 0; i < ring.length - 1; i++) {
              const a = latLngToVec(ring[i][1], ring[i][0], RADIUS * 1.004)
              const b = latLngToVec(ring[i + 1][1], ring[i + 1][0], RADIUS * 1.004)
              positions.push(a.x, a.y, a.z, b.x, b.y, b.z)
            }
          }
          if (feature.properties.LABELRANK <= 2 && feature.properties.NAME !== "Antarctica") {
            continue
          }
        }

        const geo = new THREE.BufferGeometry()
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
        const lines = new THREE.LineSegments(
          geo,
          new THREE.LineBasicMaterial({ color: BONE, transparent: true, opacity: 0.78 })
        )
        scene.add(lines)
        dispose.push(() => {
          geo.dispose()
          lines.material.dispose()
        })

        for (const continent of CONTINENTS) {
          const sprite = makeLabel(continent.name, latLngToVec(continent.lat, continent.lng, RADIUS * 1.03), continent.size, 600)
          if (sprite) {
            labels.push(sprite)
            scene.add(sprite)
          }
        }
      })
      .catch(() => {})

    let raf = 0
    const cameraDir = new THREE.Vector3()
    const tick = () => {
      controls.update()
      camera.getWorldDirection(cameraDir)
      for (const sprite of labels) {
        const facing = sprite.userData.worldPos.dot(camera.position) > 0
        sprite.material.opacity = facing ? 1 : 0
      }
      for (const marker of markers) {
        const facing = marker.userData.worldPos.dot(camera.position) > 0
        marker.visible = facing
      }
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      abort.abort()
      cancelAnimationFrame(raf)
      ro.disconnect()
      controls.dispose()
      renderer.dispose()
      ocean.geometry.dispose()
      ocean.material.dispose()
      grid.geometry.dispose()
      grid.material.dispose()
      atmo.geometry.dispose()
      atmo.material.dispose()
      for (const fn of dispose) fn()
      markerCoreGeo.dispose()
      markerGlowGeo.dispose()
      markerCoreMat.dispose()
      markerGlowMat.dispose()
      for (const sprite of labels) {
        sprite.material.map?.dispose()
        sprite.material.dispose()
      }
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={hostRef}
      className="earth-globe-stage"
      role="img"
      aria-label="Globo terráqueo animado. Arrastrá para girar."
    />
  )
}

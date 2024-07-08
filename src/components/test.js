import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as THREE from 'three'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const geometry = new THREE.CapsuleGeometry(1, 1, 4, 8)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
// cube.position.set(0, 0, 0)
scene.add(cube)
camera.position.z = 5

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.autoRotate = true
const animate = () => {
  requestAnimationFrame(animate)
  // controls.update()
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()
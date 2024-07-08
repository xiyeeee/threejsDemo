<template>
  <div></div>
</template>

<script setup>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer()
const renderer2 = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
document.body.appendChild(renderer2.domElement)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const geometry2 = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const material2 = new THREE.MeshBasicMaterial({ color: 'red' })
const cube = new THREE.Mesh(geometry, material)
const cube2 = new THREE.Mesh(geometry2, material2)
scene.add(cube)
scene.add(cube2)
cube2.position.x = 3
cube2.rotation.x = 75
camera.position.z = 5
const controls = new OrbitControls(camera, renderer.domElement)
const AxesHelper = new THREE.AxesHelper(5)
scene.add(AxesHelper)
// controls.autoRotate = true
// controls.enableDamping = true
const loader = new GLTFLoader()
loader.load(
  'src/assets/test/scene.gltf',
  (gltf) => {
    let model = gltf.scene
    model.scale.set(0.01, 0.01, 0.01)
    model.rotation.y = 4.5
    model.position.x = -1
    model.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = false
        //模型阴影
        child.castShadow = true
        //模型自发光
        child.material.emissive = child.material.color
        child.material.emissiveMap = child.material.map
      }
    }),
      scene.add(model)
  },
  undefined,
  (error) => {
    console.error(error)
  }
)
loader.load(
  'src/assets/apple/scene.gltf',
  (gltf) => {
    let model = gltf.scene
    model.scale.set(0.01, 0.01, 0.01)
    model.rotation.y = 4.5
    model.position.x = 1
    model.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = false
        //模型阴影
        child.castShadow = true
        //模型自发光
        child.material.emissive = child.material.color
        child.material.emissiveMap = child.material.map
      }
    }),
      scene.add(model)
  },
  undefined,
  (error) => {
    console.error(error)
  }
)
const animate = () => {
  requestAnimationFrame(animate)
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  controls.update()
  renderer.render(scene, camera)
}
animate()

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})
let btn = document.createElement('button')
btn.innerHTML = '点击全屏'
btn.style.position = 'absolute'
btn.style.top = '10px'
btn.style.left = '10px'
btn.style.zIndex = '999'
btn.onclick = () => {
  document.body.requestFullscreen()
}
document.body.appendChild(btn)
let btn2 = document.createElement('button')
btn2.innerHTML = '退出全屏'
btn2.style.position = 'absolute'
btn2.style.top = '40px'
btn2.style.left = '10px'
btn2.style.zIndex = '999'
btn2.onclick = () => {
  document.exitFullscreen()
}
document.body.appendChild(btn2)

const gui = new GUI()
const fullscreen = () => {
  document.body.requestFullscreen()
}
const exitFullscreen = () => {
  document.exitFullscreen()
}
const myObject = {
  fullscreen: fullscreen,
  exitFullscreen: exitFullscreen,
  cubeColor: '#00ff00',
}
gui.add(myObject, 'fullscreen').name('全屏')
gui.add(myObject, 'exitFullscreen').name('退出全屏')

let folder = gui.addFolder('立方体位置')
let folder2 = folder.addFolder('立方体位置2')
folder
  .add(cube.position, 'x', -5, 5)
  .name('立方体x轴位置')
  .onChange((val) => {
    console.log(val)
  })
folder
  .add(cube.position, 'y')
  .name('立方体y轴位置')
  .min(-10)
  .max(10)
  .step(1)
  .onFinishChange((val) => {
    console.log(val)
  })
folder2.add(cube.position, 'z').name('立方体z轴位置').min(-10).max(10).step(1)
gui.add(material, 'wireframe').name('立方体材质')
let colorParams = {
  cubeColor: '#00ff00',
}
gui.addColor(myObject, 'cubeColor').onChange((val) => {
  cube.material.color.set(val)
})
</script>
<style scoped></style>

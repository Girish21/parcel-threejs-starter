import {
  Mesh,
  Scene,
  BoxBufferGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

const canvas = document.querySelector('canvas#webGL')

const gui = new dat.GUI()

const scene = new Scene()

const geometry = new BoxBufferGeometry(1, 1, 1)

const material = new MeshBasicMaterial()

const mesh = new Mesh(geometry, material)
scene.add(mesh)

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 100)
camera.position.set(1, 1, 1)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new WebGLRenderer({ canvas })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

const clock = new Clock()

window.addEventListener('resize', () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  mesh.rotation.set(0, elapsedTime / 5.0, 0)

  controls.update()

  renderer.render(scene, camera)

  requestAnimationFrame(tick)
}
tick()

import * as THREE from 'three'
//OrbitControls 불러오기
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  console.log(OrbitControls)

  //씬
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  //카메라
  const camera = new THREE.PerspectiveCamera(
    120,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 2, 1.8)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })

  //렌더러 사이즈 세팅
  renderer.setSize(window.innerWidth, window.innerHeight)
  //렌더러를 노출시킬 곳
  document.body.appendChild(renderer.domElement)
  //렌더러에 그림자 사용 설정
  renderer.shadowMap.enabled = true

  //OrbitControls 추가
  const controls = new OrbitControls(camera, renderer.domElement)
  //최대 최소 줌값 지정하기
  controls.minDistance = 2
  controls.maxDistance = 4
  controls.maxPolarAngle = Math.PI / 2
  controls.update()

  //도형
  const geometry = new THREE.IcosahedronGeometry(0.5, 0)
  const material = new THREE.MeshStandardMaterial({ color: 0x004fff })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  cube.position.set(0.5, 0.5, 0)
  scene.add(cube)
  //그림자를 생성할 도형에 castshadow 설정
  cube.castShadow = true
  cube.receiveShadow = true

  //도형
  const geometry2 = new THREE.IcosahedronGeometry(0.5, 0)
  const material2 = new THREE.MeshStandardMaterial({ color: 0xff0000 })
  const cube2 = new THREE.Mesh(geometry2, material2)
  cube.position.set(-0.5, 1.2, 0.5)
  scene.add(cube2)
  //그림자를 생성할 도형에 castshadow 설정
  cube2.castShadow = true

  //바닥
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.2
  scene.add(plane)
  //그림자를 받아줄 도형에 receiveShadow 설정
  plane.receiveShadow = true

  //빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(-1.5, 2, 1)
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  scene.add(dlHelper)
  scene.add(directionalLight)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  directionalLight.shadow.radius = 8

  //특정 3d 도형에 애니메이션 적용하기
  function animate() {
    requestAnimationFrame(animate)
    cube.rotation.y += 0.1
    cube2.rotation.x += 0.05
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  //반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}

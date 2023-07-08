import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
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
  camera.position.set(0, 1, 1.8)
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
  //⭐렌더러에 그림자 사용 설정
  renderer.shadowMap.enabled = true

  //OrbitControls는 카메라 이후 등장필요
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.update()

  //도형
  //const geometry = new THREE.SphereGeometry(0.5, 32, 16)
  const geometry = new THREE.IcosahedronGeometry(0, 5, 0)
  //const geometry = new THREE.ConeGeometry(0.4,0.7,6)
  const material = new THREE.MeshStandardMaterial({ color: 0x004fff })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  cube.position.y = 0.5
  scene.add(cube)
  //⭐그림자를 생성할 도형에 castshadow 설정
  cube.castShadow = true

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
  //빛에 castshadow 설정
  //ambientLight.castShadow = true //그림자X

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  //특정방향으로 빛을 비춘다.
  directionalLight.position.set(-0.5, 1.5, -0.5)
  //각 빛마다 helper옵션을 줄 수 있다. 첫번째 속성은 빛, 두번째 속성은 사이즈, 세번째는 색
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  //scene.add(dlHelper)
  scene.add(directionalLight)
  //빛에 castshadow 설정
  directionalLight.castShadow = true //그림자 O
  directionalLight.shadow.mapSize.width = 2048 //그림자 해상도 설정, 높을수록 해상도좋다.
  directionalLight.shadow.mapSize.height = 2048
  directionalLight.shadow.radius = 8

  const pointLight = new THREE.PointLight(0xffffff, 1)
  scene.add(pointLight)
  pointLight.position.set(-1, 1, 0.5)
  const plhelper = new THREE.PointLightHelper(pointLight, 0.1)
  //scene.add(plhelper)
  //빛에 castshadow 설정
  pointLight.castShadow = true //그림자 O

  //속성 : 색, 너비, 높이, 강도
  const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  //scene.add(rectAreaLight)
  rectAreaLight.position.set(1, 1, 1)
  rectAreaLight.lookAt(0, 0, 0)
  rectAreaLight.castShadow = true //그림자 X

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  //scene.add(spotLight)
  spotLight.castShadow = true //그림자 O

  //특정 3d 도형에 애니메이션 적용하기
  function render(time) {
    time *= 0.0005

    //obj02.rotation.x = time
    //obj02.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

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

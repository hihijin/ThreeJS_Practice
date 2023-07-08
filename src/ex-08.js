import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 코드 작성 부분
  console.log(THREE)

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

  //OrbitControls는 카메라 이후 등장필요
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.update()

  //도형
  const geometry = new THREE.SphereGeometry(0.5, 32, 16)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  cube.position.y = 0.2
  scene.add(cube)

  //바닥
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.2
  scene.add(plane)

  //빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  //모든 오브젝트를 대상으로 전역으로 비추는 빛, 그림자X, 두번째 속성은 강도
  //scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  //특정방향으로 빛을 비춘다.
  directionalLight.position.set(1, 1, 1)
  //각 빛마다 helper옵션을 줄 수 있다. 첫번째 속성은 빛, 두번째 속성은 사이즈, 세번째는 색
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  //scene.add(dlHelper)
  //scene.add(directionalLight)

  //속성은 하늘색, 지상색, 강도 순서
  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1)
  //scene.add(hemisphereLight)

  const pointLight = new THREE.PointLight(0xffffff, 1)
  //scene.add(pointLight)
  pointLight.position.set(-2, 0.5, 0.5)
  const plhelper = new THREE.PointLightHelper(pointLight, 0.1)
  //scene.add(plhelper)

  const pointLight2 = new THREE.PointLight(0xffffff, 1)
  //scene.add(pointLight2)
  pointLight2.position.set(2, 2, 0.5)
  const plhelper2 = new THREE.PointLightHelper(pointLight2, 0.1)
  //scene.add(plhelper2)

  //속성 : 색, 너비, 높이, 강도
  const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  //scene.add(rectAreaLight)
  rectAreaLight.position.set(0.5, 0.5, 1)
  rectAreaLight.lookAt(0, 0, 0)

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  scene.add(spotLight)

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

import * as THREE from 'three'
//OrbitControls 추가! 나중에 자세히 다뤄볼 예정, 마우스로 움직이면서 도형을 3d로 볼 수 있다.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 코드 작성 부분
  console.log(THREE)

  //씬
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  //카메라
  const fov = 100
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  /*
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  */
  // 카메라 위치 조정 첫번째 방법
  //camera.position.set(0, 0, 1)

  // 카메라 위치 조정 두번째 방법
  camera.position.x = 0 //음수라면 물체의 왼쪽, 양수라면 물체의 오른쪽면을 보게 된다.
  camera.position.y = 0 //음수라면 물체의 위를 보게 되고 양수라면 물체의 아래를 보게 된다.
  camera.position.z = 1 //물체를 기준으로 카메라를 뒤에 둘건지 앞에 둘건지, 음수라면 물체가 보이지 않게 된다.
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  //카메라의 위치조정을 잘못해서 물체가 화면에 보이지 않을경우 강제로 보이는 위치로 조정해서 화면에 보이게 한다.

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
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material = new THREE.MeshStandardMaterial({ color: 0xff7f00 })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  scene.add(cube)

  //바닥
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.rotation.y = -0.5
  scene.add(plane)

  //빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

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

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
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 3

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

  //빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  //텍스처 추가
  const textureLoader = new THREE.TextureLoader()
  //이미지 불러오기
  const textureBaseColor = textureLoader.load('../static/img/basecolor.jpg')
  const textureNormalMap = textureLoader.load('../static/img/normal.jpg')
  const textureHeightMap = textureLoader.load('../static/img/height.png')
  const textureRoughnessMap = textureLoader.load('../static/img/roughness.jpg')

  //메쉬 - 그림자가 진 흰 구 모양
  const geometry = new THREE.SphereGeometry(0.3, 32, 16)
  const material01 = new THREE.MeshStandardMaterial({ map: textureBaseColor })
  const obj01 = new THREE.Mesh(geometry, material01)
  obj01.position.x = -1.5
  scene.add(obj01)

  //메쉬 - 그림자가 진 흰 구 모양
  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    //실제 입체는 아니지만 입체감으로 보이게끔 하는 속성
    normalMap: textureNormalMap,
  })
  const obj02 = new THREE.Mesh(geometry, material02)
  obj02.position.x = -0.7
  scene.add(obj02)

  //메쉬 - 그림자가 진 흰 구 모양
  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    //매쉬 정점에 위치를 밝고 어두움에 따라 바꾸는 속성, 음영에 따라 동그란 구모양이 아닌 거칠게 표현된다.
    displacementMap: textureHeightMap,
    //위의 속성을 적용 시 크기가 커지는 문제 해결, 크기조절하는 속성, default값은 1
    displacementScale: 0.05,
  })
  const obj03 = new THREE.Mesh(geometry, material03)
  obj03.position.x = 0
  scene.add(obj03)

  //메쉬 - 그림자가 진 흰 구 모양
  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.05,
    //음영에 따라 빛 효과를 주는 속성
    roughnessMap: textureRoughnessMap,
    //빛의 반질거림 속성
    roughness: 0.8,
  })
  const obj04 = new THREE.Mesh(geometry, material04)
  obj04.position.x = 0.7
  scene.add(obj04)

  //메쉬 - 그림자가 진 흰 구 모양
  const material05 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
  })
  const obj05 = new THREE.Mesh(geometry, material05)
  obj05.position.x = 1.5
  scene.add(obj05)

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

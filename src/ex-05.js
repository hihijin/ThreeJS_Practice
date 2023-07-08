import * as THREE from 'three'

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 코드 작성 부분
  console.log(THREE)

  //씬
  const scene = new THREE.Scene()
  //scene.background = new THREE.Color(0x004fff)

  //카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 4

  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })

  //렌더러 사이즈 세팅
  renderer.setSize(window.innerWidth, window.innerHeight)

  //렌더러를 노출시킬 곳
  document.body.appendChild(renderer.domElement)

  //빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  //빛의 위치 x, y, z 순서
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  //메쉬 추가하기 - 주황색 도넛 모양
  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material01 = new THREE.MeshBasicMaterial({ color: 0xff7f00 })
  const obj01 = new THREE.Mesh(geometry, material01)
  obj01.position.x = -2
  scene.add(obj01)

  //메쉬
  const material02 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    //metalness: 1, //어두운 정도 : 0~1
    //roughness: 1, //거칠기
    //transparent: true, //투명도를 위해 필요한 속성
    //opacity: 0.5, //투명도
    //wireframe: true, //와이어프레임 모드로 변경
  })
  //material02.wireframe = true; //Material 속성을 이런 방식으로도 적용 가능
  const obj02 = new THREE.Mesh(geometry, material02)
  obj02.position.x = -1
  scene.add(obj02)

  //메쉬
  const material03 = new THREE.MeshPhysicalMaterial({
    color: 0xff7f00,
    clearcoat: 1, //연한 투명막 효과
    clearcoatRoughness: 0.1, //클리어코트의 거칠기
  })
  const obj03 = new THREE.Mesh(geometry, material03)
  obj03.position.x = 0
  scene.add(obj03)

  //메쉬
  const material04 = new THREE.MeshLambertMaterial({ color: 0xff7f00 })
  const obj04 = new THREE.Mesh(geometry, material04)
  obj04.position.x = +1
  scene.add(obj04)

  //메쉬
  const material05 = new THREE.MeshPhongMaterial({
    color: 0xff7f00,
    specular: 0x004fff, //광 색깔
    shininess: 60, //기본값은 30
  })
  const obj05 = new THREE.Mesh(geometry, material05)
  obj05.position.x = +2
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

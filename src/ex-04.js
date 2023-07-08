import * as THREE from 'three'

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 코드 작성 부분
  console.log(THREE)

  //씬
  const scene = new THREE.Scene()
  //씬에 색 넣기
  scene.background = new THREE.Color(0x004fff)

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
    //투명도 조절
    alpha: true,
    //도형 회전 시 찌그러지는 부분 렌더러 옵션으로 조절가능
    antialias: true,
  })

  //렌더러 사이즈 세팅
  renderer.setSize(window.innerWidth, window.innerHeight)

  //렌더러를 노출시킬 곳
  document.body.appendChild(renderer.domElement)

  //메쉬 추가하기 - obj01 콘모양
  const geometry01 = new THREE.ConeGeometry(0.4, 0.7, 6)
  const material01 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj01 = new THREE.Mesh(geometry01, material01)
  obj01.position.x = -1
  scene.add(obj01)

  //메쉬 추가하기 - obj02 박스모양
  const geometry02 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material02 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj02 = new THREE.Mesh(geometry02, material02)
  scene.add(obj02)

  //메쉬 추가하기 - obj03 - 오각형..?
  const geometry03 = new THREE.IcosahedronGeometry(0.4, 0)
  const material03 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj03 = new THREE.Mesh(geometry03, material03)
  obj03.position.x = 1
  scene.add(obj03)

  //특정 3d 도형에 애니메이션 적용하기
  function render(time) {
    //회전하는 속도 조절하기
    time *= 0.0005

    obj02.rotation.x = time
    obj02.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  //반응형 처리 : window사이즈에 맞게 반응형 조절하기
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  //사이즈가 바뀔 때마다 함수 실행
  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}

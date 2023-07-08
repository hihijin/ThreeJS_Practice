import * as THREE from 'three'

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 코드 작성 부분
  console.log(THREE)

  //씬 만들기
  const scene = new THREE.Scene()
  //씬에 색 넣기
  scene.background = new THREE.Color(0x004fff)

  //카메라 만들기
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  //렌더러 만들기
  const renderer = new THREE.WebGLRenderer()

  //렌더러 사이즈 세팅
  renderer.setSize(window.innerWidth, window.innerHeight)

  //렌더러를 노출시킬 곳
  document.body.appendChild(renderer.domElement)

  //메쉬 추가하기
  //도형 크기 설정
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  //도형 색 설정
  const material = new THREE.MeshStandardMaterial({ color: 0x999999 })

  //도형 만들기
  const cube = new THREE.Mesh(geometry, material)
  //도형 추가하기
  scene.add(cube)

  //특정 3d 도형에 애니메이션 적용하기
  function render(time) {
    time *= 0.001 // convert time to seconds

    // cube.rotation.x = time;
    // cube.rotation.y = time;

    //렌더러의 렌더 속성에 씬, 카메라를 넣어준다.
    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}

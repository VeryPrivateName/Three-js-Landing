var camera, scene, renderer;
var cube, sphere, torus, material, backgroundMesh;

var count = 0,
  cubeCamera1,
  cubeCamera2;

var onPointerDownPointerX,
  onPointerDownPointerY,
  onPointerDownLon,
  onPointerDownLat;

var lon = 0,
  lat = 0;
var phi = 0,
  theta = 0;
var identidad = document.createElement('INPUT');
var textureLoader = new THREE.TextureLoader();

textureLoader.load('4096x2048constellationCMPR.jpg', function (texture) {
  texture.mapping = THREE.UVMapping;

  init(texture);
  animate();
});

function init(texture) {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  // background

  var options = {
    resolution: 1024,
    generateMipmaps: true,
    minFilter: THREE.LinearMipMapLinearFilter,
    magFilter: THREE.LinearFilter,
  };

  scene.background = new THREE.CubemapGenerator(renderer).fromEquirectangular(
    texture,
    options
  );

  //

  cubeCamera1 = new THREE.CubeCamera(1, 1000, 2048);
  cubeCamera1.renderTarget.texture.generateMipmaps = true;
  cubeCamera1.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
  scene.add(cubeCamera1);

  cubeCamera2 = new THREE.CubeCamera(1, 1000, 2048);
  cubeCamera2.renderTarget.texture.generateMipmaps = true;
  cubeCamera2.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
  scene.add(cubeCamera2);
  container = document.querySelector('#canvas-container');
  //

  material = new THREE.MeshBasicMaterial({
    envMap: cubeCamera2.renderTarget.texture,
  });

  sphere = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(25, 3), material);
  sphere;
  scene.add(sphere);

  cube = new THREE.Mesh(new THREE.BoxBufferGeometry(4, 4, 4), material);
  scene.add(cube);

  container.appendChild(renderer.domElement);

  document.addEventListener('mousedown', onDocumentMouseDown, false);
  identidad.addEventListener('click', function (event) {
    $(this).focus();
  });
  window.addEventListener('resize', onWindowResized, false);
}

function onWindowResized() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function onDocumentMouseDown(event) {
  event.preventDefault();
  onPointerDownPointerX = event.clientX;
  onPointerDownPointerY = event.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
}

function onDocumentMouseMove(event) {
  lon = (event.clientX - onPointerDownPointerX) * 0.04 + onPointerDownLon;
  lat = (event.clientY - onPointerDownPointerY) * 0.02 + onPointerDownLat;
}

function onDocumentMouseUp() {
  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var time = Date.now();

  lon += 0.15;

  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.Math.degToRad(90 - lat);
  theta = THREE.Math.degToRad(lon);

  cube.position.x = Math.cos(time * 0.001) * 30;
  cube.position.y = Math.sin(time * 0.001) * 30;
  cube.position.z = Math.sin(time * 0.001) * 30;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.015;

  camera.position.x = 100 * Math.sin(phi) * Math.cos(theta);
  camera.position.y = 100 * Math.cos(phi);
  camera.position.z = 100 * Math.sin(phi) * Math.sin(theta);

  camera.lookAt(scene.position);

  sphere.visible = false;

  // pingpong

  if (count % 2 === 0) {
    material.envMap = cubeCamera1.renderTarget.texture;
    cubeCamera2.update(renderer, scene);
  } else {
    material.envMap = cubeCamera2.renderTarget.texture;
    cubeCamera1.update(renderer, scene);
  }

  count++;

  sphere.visible = true;

  renderer.render(scene, camera);
}

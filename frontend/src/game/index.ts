// please don't remove
import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {Ebene} from './ebene';

if (module.hot)
    module.hot.dispose(() => location.reload());

console.log('%cApplicaction WORKS!', 'color:lightgreen');

let scene: Scene = new Scene();
let camera =  new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

let geometry: BoxGeometry = new BoxGeometry(1, 1, 1);
let material: MeshBasicMaterial = new MeshBasicMaterial({color : 0x00ff00});
let cube : Mesh = new Mesh(geometry,material);

camera.position.x = 0;
camera.position.y = 100;
camera.position.z = 200;

let ebene: Ebene = new Ebene();
scene.add(ebene.cylinder);

let animate = function() {
    requestAnimationFrame(animate);
    renderer.render ( scene,camera);
};
animate();




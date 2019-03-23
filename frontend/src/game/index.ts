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
scene.add(cube);
camera.position.z = 5;
let animate = function() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render ( scene,camera);
};
animate();


let ebene: Ebene = new Ebene(12);




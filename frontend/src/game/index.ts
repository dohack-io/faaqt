// please don't remove
import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {Ebene} from './ebene';
//import {Player} from "./Hurdle";

//if (module.hot)
 //   module.hot.dispose(() => location.reload());

console.log('%cApplicaction WORKS!', 'color:lightgreen');

let scene: Scene = new Scene();
let camera =  new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//let geometry: BoxGeometry = new BoxGeometry(1, 1, 1);
//let material: MeshBasicMaterial = new MeshBasicMaterial({color : 0x00ff00});
//let cube : Mesh = new Mesh(geometry,material);



let ebene: Ebene = new Ebene();
let cylinder = ebene.cylinder;
scene.add(this.cylinder);
scene.add(cylinder);
camera.position.z = 4;
camera.position.y = 3;

let animate = function() {
    requestAnimationFrame(animate);
    cylinder.rotation.x += 0;
    cylinder.rotation.y += 0.01;
    //cylinder.position.z += 0.01;
    renderer.render ( scene,camera);
};
animate();




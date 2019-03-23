// please don't remove
import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {Player} from './player';
import {Hurdle} from './Hurdle';
import {Ebene} from './ebene';
//import {Player} from "./Hurdle";

if (module.hot)
  module.hot.dispose(() => location.reload());

let scene: Scene = new Scene();
let camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
let renderer = new WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//let geometry: BoxGeometry = new BoxGeometry(1, 1, 1);
//let material: MeshBasicMaterial = new MeshBasicMaterial({color : 0x00ff00});
//let cube : Mesh = new Mesh(geometry,material);


camera.position.z = 20;

// Objekte erstellen
let ebene: Ebene = new Ebene();
let player: Player = new Player();
let hurdle: Hurdle = new Hurdle();
hurdle.body.position.x = 2.5;
ebene.cylinder.position.y = -5;

// add to the scene
scene.add(ebene.cylinder);
scene.add(player.body);
scene.add(hurdle.body);

let winkel = 0;
let drehWert = 0.1;
let animate = function () {
    requestAnimationFrame(animate);
    cylinder.rotation.x += 0;
    cylinder.rotation.y += 0.01;
    //cylinder.position.z += 0.01;
    renderer.render ( scene,camera);
};
animate();

    if (winkel >= 1 || winkel == 0) {
        drehWert = (-1) * drehWert;
    }
    winkel += drehWert;

    player.body.rotation.y += drehWert;

    renderer.render(scene, camera);
};
animate();

window.addEventListener('keydown', (e) => {
    player.jump();
});
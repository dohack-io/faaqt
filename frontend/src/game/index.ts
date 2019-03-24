// please don't remove
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Player } from './player';
import { Hurdle } from './Hurdle';
import { Ebene } from './ebene';
//import {Player} from "./Hurdle";

if (module.hot)
    module.hot.dispose(() => location.reload());

let scene: Scene = new Scene();
let camera = new PerspectiveCamera(45, window.innerWidth * 0.5 / window.innerHeight * 0.5, 0.1, 100);
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
scene.add(player.body);
scene.add(ebene.cylinder);

let hurdles: Hurdle[] = [];

for (let i = 1; i <= 20; i++) {
    hurdles[i] = new Hurdle();
    scene.add(hurdles[i].body);
    hurdles[i].body.position.x = 2.5 * i;
    hurdles[i].body.position.y = -6.35;

}
// add to the scene

let last;

function animate(ts) {
    requestAnimationFrame(animate);
    const diff = ts - last;
    last = ts;

    renderer.render(scene, camera);
    camera.position.x += diff / 500;
    player.body.position.x += diff / 500;
};


requestAnimationFrame(ts => {
    last = ts;
    requestAnimationFrame(animate);
})

// let movecamera = () => {
//     for (let i = 0; i < 200; i++) {
//     }
// }

window.addEventListener('keydown', (e) => {
    player.jump();
});
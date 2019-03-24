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

// Objekte erstellen
let ebene: Ebene = new Ebene();
let player: Player = new Player();

// Initiale Koordinaten setzen

player.body.position.y = Ebene.Y_VALUE;
camera.position.z = 18;
camera.position.y = 7;

let hurdles: Hurdle[] = [];
for (let i = 1; i <= 20; i++) {

    hurdles[i] = new Hurdle();
    // scene.add(hurdles[i].body);
    hurdles[i].body.position.x = 2.5 * i;
    hurdles[i].body.position.y = 1.5;
    ebene.body.add(hurdles[i].body);

}
// add to the scene
scene.add(player.body);
scene.add(ebene.body);

let winkel = 0;
let drehWert = 0.1;
let animate = function () {
    requestAnimationFrame(animate);

    if (winkel >= 1 || winkel == 0) {
        drehWert = (-1) * drehWert;
    }
    winkel += drehWert;

    player.body.rotation.y += drehWert;

    // camera.position.x += 0.01;
    // player.body.position.x += 0.01 ;
    ebene.body.position.x -= 0.05;
    renderer.render(scene, camera);
};
animate();

window.addEventListener('keydown', (e) => {
    player.jump();
});
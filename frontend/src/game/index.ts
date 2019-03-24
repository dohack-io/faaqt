// please don't remove
import { PerspectiveCamera, Scene, WebGLRenderer, Mesh, MeshBasicMaterial, Object3D } from 'three';
import { Player } from './player';
import { Hurdle } from './Hurdle';
import { Ebene } from './ebene';
import { checkHitStatus } from './hit-status-check';
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

for (let i = 0; i < 20; i++) {
    hurdles[i] = new Hurdle();
    scene.add(hurdles[i].body);
    hurdles[i].body.position.x = 5.5 * i;
    hurdles[i].body.position.y = -6.35;

}
// add to the scene

let last;

const getMeshFromGroup = (group: Object3D) => {
    const playerBody = group.children[0] as Mesh;
    return playerBody.material as MeshBasicMaterial;
}

function animate(ts) {
    requestAnimationFrame(animate);
    const diff = ts - last;
    last = ts;

    camera.position.x += diff / 500;
    player.body.position.x += diff / 500;

    const result = checkHitStatus(player.body, hurdles.map(h => h.body));
    const playerMeshMeterial = getMeshFromGroup(player.body);

    if (result)
        playerMeshMeterial.color.setRGB(1, 0.2, 0);
    else
        playerMeshMeterial.color.setRGB(0.2, 1, 0);


    renderer.render(scene, camera);
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
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
let camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
let renderer = new WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

let mockData = [
    true, false, false, false, true, false, false, true, true, false, false,
    false, false, false, false, true, false, false, true, true, false, false,
    false, false, false, false, true, false, false, true, true, false, false,
];

//let geometry: BoxGeometry = new BoxGeometry(1, 1, 1);
//let material: MeshBasicMaterial = new MeshBasicMaterial({color : 0x00ff00});
//let cube : Mesh = new Mesh(geometry,material);
let pufferEbene = 10;
let length = pufferEbene +  mockData.length;
// Objekte erstellen
let ebene: Ebene = new Ebene(length);
let player: Player = new Player();

// Initiale Koordinaten setzen

player.body.position.y = Ebene.Y_VALUE;
player.body.position.x = -pufferEbene;

camera.position.z = 18;
camera.position.y = 7;

console.log(ebene.body.position);
ebene.body.position.x = length / 2;

let hurdles: Hurdle[] = [];
for (let i = 0; i <= length; i++) {

    if (mockData[i]) {
        hurdles[i] = new Hurdle();
        // scene.add(hurdles[i].body);
        console.log(hurdles[i].body.position);
        hurdles[i].body.position.x =  Math.round(- (length / 2));
        hurdles[i].body.position.x += i;
        hurdles[i].body.position.y = 1.5;
        ebene.body.add(hurdles[i].body);
    }

}
// add to the scene
scene.add(player.body);
scene.add(ebene.body);

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

    // camera.position.x += 0.01;
    // player.body.position.x += 0.01 ;
    ebene.body.position.x -= 0.05;
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
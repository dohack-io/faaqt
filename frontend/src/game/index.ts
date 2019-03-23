// please don't remove
import {
    AmbientLight,
    BoxGeometry,
    DirectionalLight,
    Fog,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera, PointLight,
    Scene,
    WebGLRenderer
} from 'three';
import {Player} from './player';
import {Hurdle} from './Hurdle';

if (module.hot)
    module.hot.dispose(() => location.reload());

let scene: Scene = new Scene();
let camera =  new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
let renderer = new WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

camera.position.z = 35;
let pointLight = new PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 0.1;
pointLight.position.y = 0.1;
pointLight.position.z = 0.1;

// Objekte erstellen
let player: Player = new Player();
let hurdle: Hurdle = new Hurdle();
hurdle.body.position.x = 2.5;
// add to the scene
scene.add(pointLight);
scene.add(player.body);
scene.add(hurdle.body);

let winkel = 0;
let drehWert = 0.1;
let animate = function() {
    requestAnimationFrame(animate);

    if (winkel >= 1 || winkel == 0) {
        drehWert = (-1) * drehWert;
    }
    winkel += drehWert;

    // player.body.rotation.x += drehWert;
    player.body.rotation.y += drehWert;

    renderer.render (scene,camera);

};
animate();

window.addEventListener('keydown', (e) => {
    let spacebar = " ";
    console.log(e.key);
    if (e.key == spacebar) {
        player.jump();
    }
});
// please don't remove
import {Mesh, MeshBasicMaterial, Object3D, PlaneGeometry} from 'three';
import {Player} from './player';
import {Hurdle} from './Hurdle';
import {Ebene} from './ebene';
import {checkHitStatus} from './hit-status-check';
import {GameData, GameView} from './game-view';

// please don't remove
if (module.hot)
    module.hot.dispose(() => location.reload());

const gameView = new GameView(document.body);

let mockData = [
    true, false, false, false, true, false, false, true, true, false, false,
    false, false, false, false, true, false, false, true, true, false, false,
    false, false, false, false, true, false, false, true, true, false, false,
];

//let geometry: BoxGeometry = new BoxGeometry(1, 1, 1);
//let material: MeshBasicMaterial = new MeshBasicMaterial({color : 0x00ff00});
//let cube : Mesh = new Mesh(geometry,material);
let pufferEbene = 10;
let length = pufferEbene + mockData.length;
// Objekte erstellen
let ebene: Ebene = new Ebene(length);
let player: Player = new Player();
let backgroundGeometry = new PlaneGeometry(window.innerWidth, window.innerHeight);
let backgroundMaterial = new MeshBasicMaterial({color: 0xffffff});
let background = new Mesh(backgroundGeometry, backgroundMaterial);

// Initiale Koordinaten setzen
background.position.x = 0;
background.position.y = 0;
background.position.z = -5;

player.body.position.y = Ebene.Y_VALUE;
player.body.position.x = -pufferEbene;

// console.log(ebene.body.position);
ebene.body.position.x = length / 2;

let hurdles: Hurdle[] = [];
for (let i = 0; i <= length; i++) {

    if (mockData[i]) {
        let h = new Hurdle();
        // scene.add(hurdles[i].body);
        // console.log(h.body.position);
        h.body.position.x = Math.round(-(length / 2));
        h.body.position.x += i;
        h.body.position.y = 1.5;
        ebene.body.add(h.body);
        hurdles.push(h);
    }

}

let last;

const getMeshFromGroup = (group: Object3D) => {
    // console.log(group);
    const playerBody = group.children[0] as Mesh;
    return playerBody.material as MeshBasicMaterial;
};

let gameData: null | GameData = null;

gameData = gameView.setLevel([
    false, true, true, false, true
]);

function animate(timestamp) {
    requestAnimationFrame(animate);
    const diff = timestamp - last;
    last = timestamp;

    if (gameData !== null) {
        const result = checkHitStatus(gameData.player.body, gameData.hurdles.map(h => h.body));

        gameView.moveLevel(diff / 500);

        const playerMeshMeterial = getMeshFromGroup(gameData.player.body);
        if (result)
            playerMeshMeterial.color.setRGB(1, 0.2, 0);
        else
            playerMeshMeterial.color.setHex(0xf2a2e8);

        gameView.render();
    }
};
ebene.body.position.x = 0;

requestAnimationFrame(timestamp => {
    last = timestamp;
    requestAnimationFrame(animate);
});

window.addEventListener('keydown', (e) => {
    if (e.key == ' ')
        gameView.jump();
});
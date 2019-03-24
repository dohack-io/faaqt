import { Mesh, MeshBasicMaterial, Object3D } from 'three';

import { checkHitStatus } from './hit-status-check';
import { GameView, GameData } from './game-view';
import { Hurdle } from './Hurdle';

// please don't remove
if (module.hot)
    module.hot.dispose(() => location.reload());

const gameView = new GameView(document.body);

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
            playerMeshMeterial.color.setRGB(0.2, 1, 0);

        gameView.render();
    }
};

requestAnimationFrame(timestamp => {
    last = timestamp;
    requestAnimationFrame(animate);
});

window.addEventListener('keydown', (e) => {
    if (e.key == ' ')
        gameView.jump();
});
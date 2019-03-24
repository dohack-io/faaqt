import { AudioAnalyzer } from "../audio-analyzer/audio-analyzer";
import { FileGetter } from "../audio-analyzer/file-getter";
import { GameView, GameData } from "./game-view";
import { checkHitStatus } from "./hit-status-check";

window.addEventListener('keydown', (e) => {
    if (e.key == ' ') {
        // console.log('jumping')
        TheGameStateManager.gameView.jump();
    }
});

let last;

function animate(timestamp) {
    requestAnimationFrame(animate);
    const diff = timestamp - last;
    last = timestamp;

    TheGameStateManager.renderCycle(timestamp, diff);
};

requestAnimationFrame(timestamp => {
    last = timestamp;
    requestAnimationFrame(animate);
});

const getMeshFromGroup = (group: Object3D) => {
    // console.log(group);
    const playerBody = group.children[0] as Mesh;
    return playerBody.material as MeshBasicMaterial;
};

export class GameStateManager {
    nodeSpeed = 10; // nodes second;

    get view() {
        return document.body.dataset.view;
    }

    set view(view: string) {
        if (view != 'menu' && view != 'game')
            throw new RangeError('view can only be menu and game');

        document.body.dataset.view = view;
    }

    readonly gameView = new GameView(document.querySelector("body>:nth-child(2)"));
    gameData: GameData = null;

    constructor() {

        const dropZoneWrapper = document.getElementsByClassName('file-drop-wrapper')[0] as HTMLElement;
        const fileGetter = new FileGetter(dropZoneWrapper);

        fileGetter.gotFiles = (ev) => {
            const aas = ev.map(file => AudioAnalyzer.createFromFile(file));

            for (const aa of aas)
                aa.then(aa => this.gotAudioAnalyser(aa));
        }


        // load default data
        AudioAnalyzer.createFromUrl('./kiro-new-world.mp3')
            .then(aa => this.gotAudioAnalyser(aa));
    }

    gotAudioAnalyser(audioAnalyser: AudioAnalyzer) {
        this.view = 'game';
        const spikes = audioAnalyser.createSpikeArray(1000 / this.nodeSpeed, 0.365);
        // this.gameView.
        console.log('spikes', spikes);
        this.gameData = this.gameView.setLevel(spikes);
        audioAnalyser.play();
    }

    renderCycle(currentTs, diff) {
        if (this.gameData !== null) {
            console.log('rendering')
            const result = checkHitStatus(this.gameData.player.body, this.gameData.hurdles.map(h => h.body));

            this.gameView.moveLevel(diff / (1000 / this.nodeSpeed));

            const playerMeshMeterial = getMeshFromGroup(this.gameData.player.body);
            if (result)
                playerMeshMeterial.color.setRGB(1, 0.2, 0);
            else
                playerMeshMeterial.color.setHex(0xf2a2e8);

            this.gameView.render();
        }
    }
}


const TheGameStateManager = new GameStateManager();

export { TheGameStateManager }
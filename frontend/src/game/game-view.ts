import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial } from "three";
import { Ebene } from "./ebene";
import { Player } from "./player";
import { Hurdle } from "./Hurdle";
import {PlaneGeometry} from "three";
import {Mesh} from "three";
import {SpotLight} from "three";
import {HemisphereLight} from "three";

export interface GameData {
    hurdles: Hurdle[],
    player: Player,
    ebene: Ebene
}

export class GameView {
    readonly scene;
    readonly camera;
    readonly renderer;

    gameData: GameData = null;

    constructor(private readonly wrapper: HTMLElement) {
        this.scene = new Scene();
        this.renderer = new WebGLRenderer();

        const width = /* window.innerWidth - 300 */ 1200;
        const height = /* window.innerHeight - 150 */ 675;

        this.camera = new PerspectiveCamera(45, width / height, 0.1, 100);
        this.renderer.setSize(width, height);

        this.camera.position.z = 18;
        this.camera.position.y = 7;

        let backgroundGeometry = new PlaneGeometry(window.innerWidth, window.innerHeight);
        let backgroundMaterial = new MeshBasicMaterial({color: 0xffffff});
        let background = new Mesh(backgroundGeometry, backgroundMaterial);

        // Initiale Koordinaten setzen
        background.position.x = 0;
        background.position.y = 0;
        background.position.z = -1;

        let light = new HemisphereLight( 0xcc0000, 0x080820, 1 );

        this.scene.add(background);
        this.scene.add(light);


        wrapper.appendChild(this.renderer.domElement);
    }

    setLevel(data: boolean[]) {
        const pufferEbene = 10;
        const length = pufferEbene + data.length;

        const ebene = new Ebene(length);
        const player = new Player();

        player.body.position.y = Ebene.Y_VALUE;
        player.body.position.x = -pufferEbene;


        ebene.body.position.x = length / 2;

        const hurdles: Hurdle[] = [];

        for (let i = 0; i <= length; i++) {

            if (data[i]) {
                const h = new Hurdle();

                h.body.position.x = Math.round(- (length / 2)) + i;
                h.body.position.y = 1.5;

                ebene.body.add(h.body);
                hurdles.push(h);
            }

        }

        this.scene.add(player.body);
        this.scene.add(ebene.body);

        return this.gameData = { hurdles, player, ebene };
    }

    moveLevel(offset: number) {
        this.gameData.ebene.body.position.x -= offset;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    jump() {
        this.gameData.player.jump();
    }
}
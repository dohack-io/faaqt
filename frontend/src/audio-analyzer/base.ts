import '../../static/stylesheets/drop-style.css';
import { FileGetter } from './file-getter';
import { AudioAnalyzer } from './audio-analyzer';

const createDropZone = () => {
    const dzw = document.createElement('div');
    dzw.className = "full-overlay";

    dzw.innerHTML = `
    <div class="file-request-popover">
        <div>
            <h1>Drop your file here</h1>
            <div class="file-drop-zone"></div>
        </div>
        <hr />
        <input id="file-choose-dialog" type="file" />
    </div>
    `;

    document.body.append(dzw);

    return dzw;
}

const gotFileAnalyzer = (aa: AudioAnalyzer) => {
    console.log('TEST', aa.createSpikeArray(100, 0.25)
        .map(v => v ? 'X' : '_').join(''));
}

const intialize = () => {
    const dropZoneWrapper = createDropZone();
    const fileGetter = new FileGetter(dropZoneWrapper);

    fileGetter.gotFiles = (ev) => {
        const aas = ev.map(file => AudioAnalyzer.createFromFile(file));

        for (const aa of aas)
            aa.then(gotFileAnalyzer);
    }

    AudioAnalyzer.createFromUrl('./kiro-new-world.mp3')
        .then(aa => gotFileAnalyzer(aa));
}

if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', intialize);
else
    intialize();
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
    console.log('got an audio analyzer', aa);
}

const intialize = () => {


    const dropZoneWrapper = createDropZone();
    const fileGetter = new FileGetter(dropZoneWrapper);

    fileGetter.gotFiles = (ev) => {
        const aas = ev.map(file => new AudioAnalyzer(file));

        for (const aa of aas)
            gotFileAnalyzer(aa);
    }
}



if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', intialize);
else
    intialize();
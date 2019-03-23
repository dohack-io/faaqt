const loadFile = (file: File) => new Promise<ArrayBuffer>((res, rej) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('error', rej);
    fileReader.addEventListener('loadend', ev => {
        const result = fileReader.result
        if (!(result instanceof ArrayBuffer))
            rej(new Error('could not correctly load data'));
        else
            res(result);
    });

    fileReader.readAsArrayBuffer(file);
})

const createBufferSourceNodeFromFile = async (audioContext: AudioContext, file: File) => {
    const fileContent = await loadFile(file);

    const dec = await audioContext.decodeAudioData(fileContent);
    const buffer = audioContext.createBufferSource();
    buffer.buffer = dec;

    return buffer;
};


export class AudioAnalyzer {
    constructor(private readonly file: File) {
        console.log('%cThis is AudioAnalylzer with file', 'color:orange', file);
        this.intialize().then(nodes => {
            console.log("this were the nodes", ...nodes);
        })
    }

    async intialize() {
        const audioCtx = new AudioContext();

        const bufferNode = await createBufferSourceNodeFromFile(audioCtx, this.file);
        const analyserNode = audioCtx.createAnalyser();

        bufferNode.connect(analyserNode);
        return [bufferNode, analyserNode];
    }
}

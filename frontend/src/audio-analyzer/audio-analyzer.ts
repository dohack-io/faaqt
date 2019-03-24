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

const createBufferSourceNodeFromArrayBuffer = async (audioContext: AudioContext, buffer: ArrayBuffer) => {
    console.log('buffer', buffer);
    const dec = await audioContext.decodeAudioData(buffer);
    const decBuffer = dec.getChannelData(0);
    console.log(decBuffer.slice(3000000, 3000100));
    const bufferNode = audioContext.createBufferSource();
    bufferNode.buffer = dec;

    return bufferNode;
};


export class AudioAnalyzer {
    private buffer: ArrayBuffer;

    private audioContext: AudioContext;
    private bufferNode: AudioBufferSourceNode;
    private analyserNode: AnalyserNode;

    private decodedAudioData: AudioBuffer;
    private firstChannel: Float32Array;

    static async createFromFile(file: File): Promise<AudioAnalyzer> {
        const buffer = await loadFile(file);
        return AudioAnalyzer.createAudioAnalyzerFromArrayBuffer(buffer);
    }

    static async createFromUrl(url: string): Promise<AudioAnalyzer> {
        const fetched = await fetch(url);
        const bodyAsArrayBuffer = await fetched.arrayBuffer();
        return AudioAnalyzer.createAudioAnalyzerFromArrayBuffer(bodyAsArrayBuffer);
    }

    private static async createAudioAnalyzerFromArrayBuffer(buffer: ArrayBuffer) {
        const aa = new AudioAnalyzer();
        aa.buffer = buffer;

        const audioCtx = aa.audioContext = new AudioContext();

        const decodedAudioData = await audioCtx.decodeAudioData(buffer);
        const firstChannel = Float32Array.from(decodedAudioData.getChannelData(0))

        const bufferNode = audioCtx.createBufferSource();
        bufferNode.buffer = decodedAudioData;

        const analyserNode = audioCtx.createAnalyser();

        bufferNode.connect(analyserNode);
        analyserNode.connect(analyserNode.context.destination);

        aa.decodedAudioData = decodedAudioData;
        aa.firstChannel = firstChannel;
        aa.bufferNode = bufferNode;
        aa.analyserNode = analyserNode;

        console.log(aa.decodedAudioData)
        return aa;
    }

    getSample(at: number) {

        const dad = this.decodedAudioData;
        let arrayPosition = Math.floor(dad.length * at / (1000 * dad.duration));

        if (arrayPosition < 0)
            return null;
        else if (arrayPosition >= dad.length)
            return null;

        return this.firstChannel[arrayPosition];
    }

    createSamples(speed: number) {
        let ts = 0;
        let sample;
        let ret = [];
        while (sample = this.getSample(ts), ts += speed, sample != null)
            ret.push(sample);

        return ret;
    }

    createSpikeArray(speed = 100, treshhold = 0.25) {
        return this.createSamples(speed).map(v => v > treshhold || (-v) < treshhold);
    }
}

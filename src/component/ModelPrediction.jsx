import * as tf from "@tensorflow/tfjs"

export const ModelPrediction = ({gambarWajah}) => {
    async function runModel() {
        const model_url = '/models/model.json';  
        const model = await tf.loadLayersModel(model_url);

        const employeeIDs = ['FxEgusF', 'HQmm6kZ', 'falcon', 'marvel', 'hawk', 'sUKC7Jv', 'thor', 'loki'];

        const gambar = document.getElementById("gambarHasil");
        const tfTensor = tf.browser.fromPixels(gambar).resizeBilinear([64,64]).expandDims(0);
        const prediction = model.predict(tfTensor, {batchSize: 10});
        const predictedIndex = prediction.dataSync().findIndex(label => label === 1);
        console.log(employeeIDs[predictedIndex]);
        return employeeIDs[predictedIndex];
    }

    runModel();

    return(
        <div>
            <img src={gambarWajah} alt="face" hidden id="gambarHasil" />
        </div>
    )
}
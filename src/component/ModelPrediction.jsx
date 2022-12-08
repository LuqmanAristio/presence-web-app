import * as tf from "@tensorflow/tfjs"
import xxx from "../image/imageResult.png"

export const ModelPrediction = props =>{

    let model;

    async function runModel(){
        const model_url = '/models/model.json';  
        model = await tf.loadLayersModel(model_url);

        const gambar = document.getElementById("gambarHasil");
        let tfTensor = tf.browser.fromPixels(gambar).resizeBilinear([64,64]).expandDims(0);   

        const prediction = model.predict(tfTensor);
    }

    runModel();

    return(
        <div>

            <img src={xxx} hidden id="gambarHasil" />
        </div>
    )
}
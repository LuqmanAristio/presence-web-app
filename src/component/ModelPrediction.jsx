import * as tf from "@tensorflow/tfjs"
import axios from "axios"
import { useState, useEffect } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { useUser } from "./UserContext";

export const ModelPrediction = ({gambarWajah, statusAttendance, handleShot}) => {

    const currentUser = useUser();
    const [modelMl, setModel] = useSessionStorage('model', null)

    if(!modelMl) {
        loadModel()
    }

    async function loadModel(){
        const model_url = '/models/model.json';  
        const loadedModel = await tf.loadLayersModel(model_url);
        setModel(loadedModel);
    }

    const runModel = () => {
        const employeeIDs = ['FxEgusF', 'HQmm6kZ', 'WFTu5F0', 'k-1M2IA', 'nDUmAVI', 'sUKC7Jv', 'wdEwNpn', 'x695Vsp','Unknown'];

        const gambar = document.getElementById("gambarHasil");
        const tfTensor = tf.browser.fromPixels(gambar).resizeBilinear([64,64]).expandDims(0);
        const prediction = modelMl.predict(tfTensor, {batchSize: 10});
        const predictedIndex = prediction.dataSync().findIndex(label => label === 1);
        console.log(employeeIDs[predictedIndex]);
        handleShot();
    }

    if(modelMl){
        runModel();
    }

    // const cekStatus = () =>{
    //     console.log("tes");
    // }

    // useEffect(() => {
    //     cekStatus();
    // }, [modelStatus]);

    // async function addAttendance() {
    //     const serverURL = process.env.REACT_APP_SERVER_URL;
    //     const attendanceData = {
    //         employeeId : idAttendance,
    //         status : statusAttendance,
    //     };

    //     console.log("id : ", idAttendance);
    //     console.log("status : ", statusAttendance);

    //     const response = await axios.post(`${serverURL}/api/attendances`, attendanceData, {
    //         headers: {
    //             Authorization: `Bearer ${currentUser.token}`
    //         },
    //         validateStatus: () => true
    //     });
    //     console.log(response);
    
    // }

    return(
        <div>
            <img src={gambarWajah} alt="face" id="gambarHasil" />
{/* 
            {modelStatus && addAttendance()} */}
        </div>
    )
}
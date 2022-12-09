import styles from "../style/Attendance.module.css"
import {useRef, useEffect, useState} from "react"
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TimeEdit } from "./TimeEdit";
import * as tf from "@tensorflow/tfjs"
import { useUser } from "./UserContext";
import { useModel, useModelUpdate } from "./ModelContext";

export const AttendanceChecker = () =>{
    const currentUser = useUser();
    const model = useModel();
    const setModel = useModelUpdate();
    
    const [timeSaved, setTimeSaved] = useLocalStorage('timeSaved', ['08', '00']);

    const videoRef = useRef(null);
    const photoRef = useRef(null);
 
    const [hasPhoto, setHasPhoto] = useState(false);
    const [statusEmp, setStatusEmp] = useState("none");
    const [checkedEmployeeName, setCheckedEmployeeName] = useState(null);
    const [isUpdate, setUpdate] = useState();

    async function loadModel(){
        const model_url = '/models/model.json';  
        const loadedModel = await tf.loadLayersModel(model_url);
        setModel(loadedModel);
    }

    if(!model) {
        loadModel();
    }

    const getVideo = () =>{
        navigator.mediaDevices
            .getUserMedia({ 
                video: { width : 500, height: 500}
            })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(error => {
                console.error(error);
            })
    }

    const takePhoto = () =>{
        const width = 500;
        const height = 500;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video,0,0,width,height);
        setHasPhoto(true);
    }

    const downloadImage = () => {
        takePhoto();
        checkStatus();
        handleShot();
    }

    const handleShot = () => {
        if(model) {
            runModel();
        }
    };

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    const handleClick = () => {
        setUpdate(current => !current);
    };

    const timeLocalSaved = () => {
        const hour = timeSaved[0];
        const minute = timeSaved[1];

        const time = hour +" : "+ minute;

        return time;
    }

    const checkStatus = () =>{
        const hour = parseInt(timeSaved[0]);
        const minute = parseInt(timeSaved[1]);

        const today = new Date();
        const hourNow = today.getHours();
        const minuteNow = today.getMinutes();

        if(hourNow > hour) {
            setStatusEmp("late");
            // setTimeout(resetStatus, 3000); 
        }
        else if(hour === hourNow && minuteNow > minute) {
            setStatusEmp("late");
            // setTimeout(resetStatus, 3000); 
        }
        else if(hour === hourNow && minute <= minuteNow) {
            setStatusEmp("ontime");
            // setTimeout(resetStatus, 3000); 
        }
        else {
            setStatusEmp("ontime");
            // setTimeout(resetStatus, 3000); 
        }
    }

    const checkEmployee = () =>{
        if(statusEmp === "none"){
            return "Waiting Subject..."
        }
        else if(statusEmp === "ontime"){
            return "Checked : On Time"
        }
        else{
            return "Checked : Late"
        }
    }

    const resetStatus = () =>{
        setStatusEmp("none");
    }

    const runModel = () => {      
        const employeeIDs = ['FxEgusF', 'HQmm6kZ', 'WFTu5F0', 'k-1M2IA', 'nDUmAVI', 'sUKC7Jv', 'wdEwNpn', 'x695Vsp','Unknown'];
        const gambar = document.getElementById("my-canvas");    
        const tfTensor = tf.browser.fromPixels(gambar).resizeBilinear([64,64]).expandDims(0);
        const prediction = model.predict(tfTensor, {batchSize: 10}).dataSync();
        const predictedIndex = prediction.findIndex(label => label === 1);
        console.log(employeeIDs[predictedIndex]);
    }

    
    return(
        <div className={styles.attendanceChecker}>
            <div className={styles.attendanceContent}>
                <div className={styles.checkerPart}>
                    
                    <div className={styles.timeCheck}>
                        <div className={styles.timeTitle}>
                            <h3>Attendance Time</h3>
                        </div>
                        <div className={styles.timeChanger}>
                            <h3>{timeLocalSaved()}</h3>
                            <button onClick={handleClick}>
                                <FontAwesomeIcon icon={faPencil} />
                            </button>
                        </div>
                    </div>


                    <h1>SHOW YOUR FACE AT THE CAMERA</h1>                    

                    {checkedEmployeeName ? <div><h2>Luqman Aristio</h2></div> : <div className={styles.loader}></div>}
                    <h3 className={statusEmp === "none" ? styles.emptyCheck : statusEmp === "ontime" ? styles.ontimeCheck : styles.lateCheck}>{checkEmployee()}</h3>
                </div>
                <div className={styles.cameraPart}>
                    <div className={styles.cameraVideo}>
                        <video ref={videoRef}>

                        </video>
                    </div>
                    <div className={'result' + (hasPhoto ? 'hasPhoto' : '')} id={styles.buttonPhoto}>
                         <button onClick={downloadImage} className={styles.saveButton}>Take Picture</button>
                         <button onClick={getVideo} className={styles.refreshButton}>Refresh Camera</button>
                    </div>
                    <canvas ref={photoRef} hidden id="my-canvas"></canvas>
                </div>
            </div>
            {isUpdate && (
                <div>
                    <TimeEdit handleSave={handleClick} setTimeSaved={setTimeSaved}/>
                    <FontAwesomeIcon icon={faXmark} className={styles.exitButton} onClick={handleClick}/>
                </div>
            )}
        </div>
    )
}

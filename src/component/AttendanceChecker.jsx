import styles from "../style/Attendance.module.css"
import {useRef, useEffect, useState} from "react"
import { saveAs } from 'file-saver'

export const AttendanceChecker = () =>{

    const videoRef = useRef(null);
    const photoRef = useRef(null);
 
    const [hasPhoto, setHasPhoto] = useState(false);

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

        var canvas = document.getElementById("my-canvas");
        canvas.toBlob(function(blob) {
        saveAs(blob, "pretty image.png");
});
    }

    useEffect(() => {
        getVideo();
    }, [videoRef])

    return(
        <div className={styles.attendanceChecker}>
            <div className={styles.attendanceContent}>
                <div className={styles.checkerPart}>
                    <h1>SHOW YOUR FACE AT THE CAMERA</h1>

                    <h2>Muhammad Luqman Aristio</h2>

                    <h3 className={styles.ontimeCheck}>CHECKED : ON TIME</h3>
                </div>
                <div className={styles.cameraPart}>
                    <div className={styles.cameraVideo}>
                        <video ref={videoRef}>

                        </video>
                    </div>
                    <div className={'result' + (hasPhoto ? 'hasPhoto' : '')} id={styles.buttonPhoto}>
                         <canvas ref={photoRef} hidden id="my-canvas"></canvas>
                         <button onClick={downloadImage} className={styles.saveButton}>Check Status</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
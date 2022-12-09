import { useRef } from "react"
import styles from "../style/Attendance.module.css"

export const TimeEdit = ({handleSave, setTimeSaved}) =>{
    
    const hourCheck = useRef(null);
    const minuteCheck = useRef(null);

    const submitTime = () =>{

        let numberHours = hourCheck.current.value;
        let numberMinute = minuteCheck.current.value;

        if(hourCheck.current.value.length === 1){
            numberHours = `${0}${hourCheck.current.value}`;
        }
        if(minuteCheck.current.value.length === 1){
            numberMinute = `${0}${minuteCheck.current.value}`;
        }

        let timeInfo = [numberHours, numberMinute];

        setTimeSaved(timeInfo);
        handleSave();
    }

    return(
        <div className={styles.timeEdit}>
            <div className={styles.timeForm}>
                <h2>ENTER TIME</h2>

                <form onSubmit={submitTime}>
                <div className={styles.inputTime}>

                    <div className={styles.hourTime}>
                        <div className={styles.inputHour}>
                            <input ref={hourCheck} type="number" placeholder="00" min="0" max="24" required/>
                        </div>
                        <h4>Hour</h4>
                    </div>

                    <div className={styles.checkTwo}>
                        <div className={styles.spacingLine}>
                            <h3>:</h3>
                        </div>
                    </div>

                    <div className={styles.minuteTime}>
                        <div className={styles.inputMinute}>
                            <input ref={minuteCheck} type="number" placeholder="00" min="0" max="59" required/>
                        </div>
                        <h4>Minute</h4>
                    </div>
                    
                </div>

                <div className={styles.buttonTime}>
                    <button className={styles.confirmButton} type="submit">Save</button>
                    <button className={styles.cancelButton} onClick={() => handleSave()}>Cancel</button>
                </div>
                </form>
            </div>
        </div>
    )
}

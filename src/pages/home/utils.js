import React from "react";
import styles from "./styles.module.css";

const options = [
        { label: 'JS', value: 'javascript' , id:'option1' },
        { label: 'Node', value: 'node' , id:'option2' },
        { label: 'Express', value: 'express' , id:'option3' },
        { label: 'React', value: 'react' , id:'option4' }
    ]
const SelectRoomComponent =({setRoom})=>{
    return (
        <select 
            className={styles.input} 
            onChange={e => setRoom(e.target.value)}
        >
            <option>-- Select Room --</option>
            {options?.length && options.map(o => (
                <option key={o.id} value={o.value}>
                    {o.label}
                </option>
            ))}

        </select>
    );
};

export default SelectRoomComponent;
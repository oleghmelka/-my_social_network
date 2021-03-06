import React, { useState, useEffect } from 'react';


const ProfileStatus = (props) => {
   
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status] );

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div >
            { !editMode && 
                <div>
                    <b>Я сейчас: </b><span onDoubleClick={activateEditMode}>{props.status || 'не ищу новую работу'}</span>
                </div>
            }
            { editMode && 
                <div>
                    <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status}></input>
                </div>
            }
        </div>
    )
    
  }
  
  
  export default ProfileStatus;
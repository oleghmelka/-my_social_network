import { NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import s from './Dialogs.module.css';
import React from 'react';
import {addMessageInStateActionCreator, updateNewMessageTextActionCreator} from '../../redux/dialogs-reducer';





const Dialogs = (props) => {

    let state = props.dialogsPage;
    
    let dialogsElements = state.dialogs.map ( dia => <DialogItem name={dia.name}  id={dia.id} image={dia.image} /> );

    let messagesElements = state.messages.map ( mes => <Message message={mes.message} id={mes.id} /> );

    let newMessageElement = React.createRef();

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
        //props.updateNewMessageText(text_message);
        //props.dispatch( updateNewMessageTextActionCreator(text_message) );
    }

    return (
        <div className={s.dialogs} >
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <textarea ref={newMessageElement} onChange={ onMessageChange } value={props.dialogsPage.newMessageText} />
                </div>
                <div>
                    <button onClick={ onSendMessageClick }>Send</button>
                </div>
            </div>
            
        </div>
    );
  }
  
  export default Dialogs;
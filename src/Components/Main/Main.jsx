import s from './Main.module.css'
import BaseText from "../BaseText";
import { connect } from "react-redux";
import ChatItem from "../ChatItem";
import { addNewChatAC, changeSelectedChatAC, sendMessageThunk, notifiedManagerThunk } from "../../Redux/chatreducer";
import Message from "../Message";
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import AddChatForm from '../AddChatForm';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


let Main = (props) => {
    let [activeMenu, setActiveMenu] = useState(false);
    useEffect(() => {
        let interval;
        if (props.idInstance != null) {
            interval = setInterval(() => {
                props.notifiedManagerThunk(props.idInstance, props.apiTokenInstance)
            }, 4000)
        } else {
            interval = setInterval(() => {}, 10000)
        }
        return () => {
            clearInterval(interval);
          }
    })

    if (props.idInstance == null) {
        console.log('changed with ' + props.idInstance)
        return <Navigate to='/' />
    }

    let openMenu = () => {
        setActiveMenu(true);
    }

    let activeChat = props.main.chats.filter((ch) => ch.chatId == props.main.selectedChat)[0];

    return (<div className={s.wrapper}>
        <AddChatForm activeMenu={activeMenu} setActiveMenu={setActiveMenu} addNewChat={props.addNewChatAC}/>
        <div className={s.chatList}>
            <div className={s.clHeader}>
                <span>Ваши чаты:</span>
                <button onClick={openMenu}>Добавить чат</button>
            </div>
            <div className={s.chatItems}>
                {
                    props.main.chats.map((ch) => <ChatItem activeChat={activeChat} key={ch.chatId} 
                    id={ch.chatId} name={ch.chatName} selectChat={props.changeSelectedChatAC}
                    lastMessage={ch.messages.length!=0 ? ch.messages[ch.messages.length - 1].text.substr(0, 30) + '...' : 'Начните ваше общение!'} />)
                }
            </div>
        </div>
        <div className={s.messageBox}>
            {!props.main.selectedChat ? <BaseText />
                : <div className={s.messageBoxWrapper}>
                    <div className={s.mbHeader}>
                        <span>{activeChat.chatName}</span>
                    </div>
                    <div className={s.messages}>
                        {activeChat.messages.map((message) => <Message key={message.idMessage} belongUser={message.belongUser} time={message.time} text={message.text} />)}
                    </div>
                    <SendMessageForm addMessage={props.addMessageAC} 
                    sendMessage={props.sendMessageThunk} 
                    activeChatId={activeChat.chatId}
                    idInstance={props.idInstance}
                    apiTokenInstance={props.apiTokenInstance}/>
                </div>
            }
        </div>
    </div>)
}

let mapStateToProps = (state) => {
    return {
        main: state.chat,
        idInstance: state.auth.idInstance, 
        apiTokenInstance: state.auth.apiTokenInstance,
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, { changeSelectedChatAC, addNewChatAC, sendMessageThunk, notifiedManagerThunk })(Main);
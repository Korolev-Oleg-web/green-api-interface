import s from "./Main/Main.module.css"

let ChatItem = (props) => {

    let clName;

    let changeChat = () => {
        props.selectChat(props.id);
    }

    if (props.activeChat) {
        if (props.activeChat.chatId == props.id) {
            clName = [s.chatItem, s.active].join(' ');
        }
        else {
            clName = s.chatItem;
        }
    }
    else {
        clName = s.chatItem;
    }

    return <div onClick={changeChat} className={clName}>
        <div className={s.chatName}>{props.name}</div>
        <div className={s.lastMessage}>{props.lastMessage}</div>
    </div>
}

export default ChatItem;
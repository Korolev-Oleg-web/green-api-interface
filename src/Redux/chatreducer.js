import { API } from "./../api/api"

const CHANGE_SELECTED_CHAT = "chats/CHANGE_SELECTED_CHAT";
const ADD_NEW_CHAT = "chats/ADD_NEW_CHAT";
const ADD_MESSAGE = "chats/ADD_MESSAGE";

let initialState = {
    chats: [],
    selectedChat: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SELECTED_CHAT: {
            let stateCopy = { ...state, selectedChat: action.chatId };
            return stateCopy;
        }
        case ADD_NEW_CHAT: {
            let stateCopy = { ...state, chats: [...state.chats] };
            let newChat = {
                chatId: action.chatId,
                chatName: action.chatName,
                messages: []
            }

            stateCopy.chats.push(newChat);
            return stateCopy;
        }
        case ADD_MESSAGE: {
            let date = new Date();
            let message = {
                time: date.getHours() + ":" + date.getMinutes(),
                text: action.text,
                belongUser: action.belongUser,
                idMessage: action.idMessage
            }
            let stateCopy = {
                ...state,
                chats: state.chats.map(ch => {
                    if (ch.chatId == action.chatId) {
                        if (ch.messages.filter((m) => m.idMessage == action.idMessage).length == 0) {
                            return { ...ch, messages: [...ch.messages, message] }
                        }
                    }
                    return ch;
                })
            }
            return stateCopy;
        }
        default: {
            return state;
        }
    }
}

//Action Creators
export const changeSelectedChatAC = (chatId) => {
    let action = {
        type: CHANGE_SELECTED_CHAT,
        chatId: chatId
    }
    return action;
}
export const addNewChatAC = (chatName, chatId) => {
    let action = {
        type: ADD_NEW_CHAT,
        chatId: chatId,
        chatName: chatName
    }
    return action;
}
export const addMessageAC = (chatId, text, belongUser, idMessage) => {
    let action = {
        type: ADD_MESSAGE,
        chatId: chatId,
        text: text,
        belongUser: belongUser,
        idMessage: idMessage
    }
    return action;
}


//Thunk Creators
export const sendMessageThunk = (chatId, text, belongUser, idInstance, apiTokenInstance) => {
    return async (dispatch) => {
        let responce = await API.sendMessage(idInstance, apiTokenInstance, chatId, text);
        if (responce.status == '200') {
            dispatch(addMessageAC(chatId, text, belongUser, responce.data.idMessage));
        }

    }
}
export const notifiedManagerThunk = (idInstance, apiTokenInstance) => {
    return async (dispatch) => {
        let responce = await API.getNotified(idInstance, apiTokenInstance);
        if (responce != null) {
            if (responce.body.typeWebhook != 'incomingMessageReceived' || responce.body.messageData.typeMessage != 'textMessage') {
                let deleteData = await API.deleteNotified(responce.receiptId, idInstance, apiTokenInstance)
            }
            else {
                dispatch(addMessageAC(responce.body.senderData.sender, responce.body.messageData.textMessageData.textMessage, false, responce.body.idMessage));
            }
        }

    }
}

export default chatReducer;
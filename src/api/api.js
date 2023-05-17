import axios from "axios";

let data = {
    idInstance: '1101820237',
    apiTokenInstance: 'a1b0ce8e779e4d6bae1470fc2368a5553a7089b9f48c46059f',
}

export const API = {
    sendMessage: (idInstance, apiTokenInstance, chatId, text) => {
        return axios.post(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        {
            "chatId": chatId,
            "message": text
        }).then(responce => {
            return responce;
        })
    }, 
    getNotified: (idInstance, apiTokenInstance) => {
        return axios.get(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
        .then(responce => {
            return responce.data;
        })
    },
    deleteNotified: (receiptId, idInstance, apiTokenInstance) => {
        return axios.delete(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`)
        .then(responce => {
            return responce;
        })
    }
}

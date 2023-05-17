const SET_AUTH_DATA = 'auth/SET-AUTH-DATA';

let initialState = {
    idInstance: null,
    apiTokenInstance: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: {
            let stateCopy = { ...state, ...action.data };
            return stateCopy;
        }
        default: {
            return state;
        }
    }
}

export const setAuthDataAC = (idInstance, apiTokenInstance, isAuth = true) => {
    let data = {
        idInstance: idInstance,
        apiTokenInstance: apiTokenInstance,
        isAuth: isAuth
    }
    let action = {
        type: SET_AUTH_DATA,
        data: data
    }
    return action;
}

export default authReducer;
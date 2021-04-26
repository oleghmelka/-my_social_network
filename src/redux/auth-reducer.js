import { authAPI } from "../api/api";

const SET_USER_DATA = 'socialNetwork/auth/SET_USER_DATA';
const AUTENTIFICATION_ERROR = 'AUTENTIFICATION_ERROR';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    autentificationError: ''
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
                autentificationError: ''
            }
        }
        case AUTENTIFICATION_ERROR: {
            return {...state, autentificationError: action.autentificationError}
        }
        
        default:
            return state;
    }

}

// ---( Action Creators)--- 

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: {userId, email, login, isAuth} })

export const addAutentificationError = (autentificationError) => ({ type: AUTENTIFICATION_ERROR, autentificationError })


// ---С-А-Н-К-И--- (Thunks Creators)

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        dispatch(addAutentificationError(response.data.messages[0]));
        //return Promise.reject(response.data.messages[0]);
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}



export default authReducer;
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
};

// ---( Action Creators)--- 

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });


// ---С-А-Н-К-И--- (Thunks Creators)

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    // dispatch(somethingelse());
    // dispatch(somethingelse());
    // dispatch(somethingelse());
    Promise.all([promise])
        .then( () => {
            dispatch(initializedSuccess());
        });
};
 




export default appReducer;
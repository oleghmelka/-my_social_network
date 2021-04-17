import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST-IN-STATE';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_STATUS = 'UPDATE_STATUS';
const DELETE_POST = 'DELETE_POST';


let initialState = {
    posts: [
        {id: 0, message: 'Hi, how are you?', likesCount: 12 },
        {id: 1, message: 'I am okey, and you?', likesCount: 2 },
        {id: 2, message: 'what?', likesCount: 4 },
        {id: 3, message: 'nigga?', likesCount: 55 }
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST: {
            let newPost = {
                id: 8,
                message: action.description,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        default:
            return state;
    }

}

// ---( Action Creators)--- 

export const addPostActionCreator = (description) => {
    
    return {
        type: ADD_POST,
        description: description
    }
}


export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export const setStatus = (status) => ({ type: SET_STATUS, status })

export const deletePost = (postId) => ({ type: DELETE_POST, postId })


// ---С-А-Н-К-И--- (Thunks Creators)

export const getUserProfile = (userId) => {

    return (dispatch) => {
        profileAPI.getProfile(userId).then( data => { 
            dispatch(setUserProfile(data));
        } );
    } 
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then( response => { 
            dispatch(setStatus(response.data));
        } );
    } 
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then( response => { 
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        } );
    } 
}



export default profileReducer;
const initialState = {
    name: "",
    email: "",
    token: "",
    userSelected: "",
    userSelectedName: ""
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case "SET_USER" :
            return{
                ...state,
                name: action.name,
                email: action.email,
                token: action.token
            }
        case "SET_NAME" :
            return{
                ...state,
                name: action.name
            }
        case "SELECTED" :
            return {
                ...state,
                userSelected: action.userSelected,
                userSelectedName: action.userSelectedName
            }
        default:
            return state
    }
}
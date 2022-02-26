export const initialState = {
    admin : false,
    buses : ['fun'],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ADMIN':
            return {
                ...state,
                admin: action.payload,
            };
        case 'SET_BUSES':
            return {
                ...state,
                buses: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
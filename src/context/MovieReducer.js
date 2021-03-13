function reducer(state, action) {
    const {type, payload} = action;
    switch(type){
        case 'GET_MOVIES':
            return {movies: payload, seletedMovie:null}
        case 'SET_MOVIE':
            return {...state, selectedMovie: payload}
        default:
            return state;
    }
}

export default reducer;

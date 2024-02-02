// for fetching movie from db  
export const getMovieStart = ()=>({
    type:'GET_MOVIES_START'
})

export const getMovieSuccess = (movies)=>({
    type:'GET_MOVIES_SUCCESS',
    payload : movies
})
export const getMovieFailure = ()=>({
    type:'GET_MOVIES_FAILURE'
})


// for creating new movie
export const createMovieStart = ()=>({
    type:'CREATE_MOVIE_START'
})

export const createMovieSuccess = (movie)=>({
    type:'CREATE_MOVIE_SUCCESS',
    payload : movie
})
export const createMovieFailure = ()=>({
    type:'CREATE_MOVIE_FAILURE'
})

// for delete 
export const deleteMovieStart = ()=>({
    type:'DELETE_MOVIES_START'
})

export const deleteMovieSuccess = (id)=>({
    type:'DELETE_MOVIES_SUCCESS',
    payload : id
})
export const deleteMovieFailure = ()=>({
    type:'DELETE_MOVIES_FAILURE'
})

// for update
export const updateMovieStart = ()=>({
    type:'UPDATE_MOVIES_START'
})

export const updateMovieSuccess = (movie)=>({
    type:'UPDATE_MOVIES_SUCCESS',
    payload : movie
})
export const updateMovieFailure = ()=>({
    type:'UPDATE_MOVIES_FAILURE'
})
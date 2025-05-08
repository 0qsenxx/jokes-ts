import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getJokes } from "./jokesOperations";
import { JokeSchema } from "../../components/JokesList/JokesList";

interface JokesState {
    jokes: JokeSchema[],
    favourites: JokeSchema[],
}

const initialState: JokesState = {
    jokes: [],
    favourites: []
};

const jokesSlice = createSlice({
    name: "jokes",
    initialState,
    reducers: {
        addJokeToFavourite: {
            reducer(state, action) {
                // console.log(action.payload)
                state.favourites.push(action.payload);
            },
            prepare(joke: JokeSchema) {
                return {
                    payload: joke,
                    meta: undefined,
                    error: undefined,
                }
            },
        },
        setPreviousFavouritesJokes: {
            reducer(state, action) {
                state.favourites = action.payload
            },
            prepare(jokes: JokeSchema[]) {
                return {
                    payload: jokes,
                    meta: undefined,
                    error: undefined,
                }
            }
        },
        removeJokeFromFavourites: {
            reducer(state, action) {
                state.favourites = state.favourites.filter(favourite => favourite.id !== action.payload)
            },
            prepare(id: number) {
                return {
                    payload: id,
                    meta: undefined,
                    error: undefined
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getJokes.fulfilled, (state, action) => {
            state.jokes = action.payload
        })
    }
})

// export { jokesSlice }
export const jokesReducer = jokesSlice.reducer
export const { addJokeToFavourite, setPreviousFavouritesJokes, removeJokeFromFavourites } = jokesSlice.actions
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { JokeSchema } from "../../components/JokesList/JokesList";

const getJokes = createAsyncThunk<JokeSchema[]>("jokes/getJokes", async (_, thunkApi) => {
    try {
        const res = await axios.get('https://official-joke-api.appspot.com/jokes/random/20')
        return res.data
    } catch (err) {
        console.log(err)
    }
})

export { getJokes }
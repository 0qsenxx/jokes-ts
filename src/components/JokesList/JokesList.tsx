import { FC, useEffect } from "react";
import Joke from "../Joke/Joke";
import css from "./JokesList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getJokes } from "../../redux/jokes/jokesOperations";
import type { RootState, AppDispatch } from "../../redux/store";

export type JokeSchema = {
  id: number;
  type?: string;
  setup: string;
  punchline: string;
};

interface JokesListSchema {
  jokes: JokeSchema[];
}

const JokesList: FC<JokesListSchema> = ({ jokes }) => {
  const dispatch = useDispatch<AppDispatch>();
  // const jokes = useSelector((state: RootState) => state.jokes.jokes);

  useEffect(() => {
    dispatch(getJokes());
  }, [dispatch]);

  return (
    <ul className={css.jokesList}>
      {jokes.length !== 0 &&
        jokes.map((joke) => <Joke {...joke} key={joke.id} />)}
    </ul>
  );
};

export default JokesList;

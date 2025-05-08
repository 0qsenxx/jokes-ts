import React, { FC } from "react";
import { JokeSchema } from "../JokesList/JokesList";
import css from "./Joke.module.css";
import heartSvg from "../../imgs/svgs/heart-svgrepo-com.svg";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  addJokeToFavourite,
  removeJokeFromFavourites,
} from "../../redux/jokes/jokesSlice";
import filledHeartSvg from "../../imgs/svgs/filled-heart.png";
import { useSelector } from "react-redux";
// interface JokeItemData {
//   id: number;
//   setup: string;
//   punchline: string;
// }

const Joke: FC<JokeSchema> = ({ id, setup, punchline }) => {
  const dispatch = useDispatch<AppDispatch>();
  const favouritesJokes = useSelector(
    (state: RootState) => state.jokes.favourites
  );
  const isFavourite = favouritesJokes.some(
    (favouritesJoke: JokeSchema) => favouritesJoke.id === id
  );
  const handleAddJokeToFavourite = (
    evt: React.MouseEvent<HTMLButtonElement>
  ) => {
    const isAddedAlreadyExist = favouritesJokes.some(
      (favouritesJoke: JokeSchema) => favouritesJoke.id === id
    );
    if (isAddedAlreadyExist) {
      dispatch(removeJokeFromFavourites(id));
    } else {
      dispatch(
        addJokeToFavourite({
          setup,
          punchline,
          id,
        })
      );
    }
  };

  return (
    <li className={css.jokeItem}>
      <h2>{setup}</h2>
      <p>{punchline}</p>
      <span>{id}</span>
      <button
        type="button"
        className={css.addToFavoiriteBtn}
        onClick={handleAddJokeToFavourite}
      >
        {/* {favouritesJokes.map((favouritesJoke: JokeSchema) => {
          return (
            <img
              src={favouritesJoke.id === id ? filledHeartSvg : heartSvg}
              alt="heart-svg"
            />
          );
        })} */}
        <img src={isFavourite ? filledHeartSvg : heartSvg} alt="heart-svg" />
      </button>
    </li>
  );
};

export default Joke;

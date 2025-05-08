import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { JokeSchema } from "../JokesList/JokesList";
import Joke from "../Joke/Joke";
import JokesList from "../JokesList/JokesList";

const FavouritesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favouritesJokes = useSelector(
    (state: RootState) => state.jokes.favourites
  );

  return (
    <>{favouritesJokes.length !== 0 && <JokesList jokes={favouritesJokes} />}</>
  );
};

export default FavouritesList;

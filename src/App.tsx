import React, { useEffect, useState } from "react";
import JokesList from "./components/JokesList/JokesList";
import { Link, Route, Routes } from "react-router-dom";
import FavouritesList from "./components/FavouritesList/FavouritesList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { setPreviousFavouritesJokes } from "./redux/jokes/jokesSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const jokes = useSelector((state: RootState) => state.jokes.jokes);
  const favouritesJokes = useSelector(
    (state: RootState) => state.jokes.favourites
  );

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favouritesJokes");
    if (stored !== null) {
      dispatch(setPreviousFavouritesJokes(JSON.parse(stored)));
    }
    setIsInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("favouritesJokes", JSON.stringify(favouritesJokes));
    }
  }, [favouritesJokes, isInitialized]);

  return (
    <>
      <header>
        <Link to="/">Jokes</Link>
        <Link to="/favourites">Favourites</Link>
      </header>
      <Routes>
        <Route path="/" element={<JokesList jokes={jokes} />} />
        <Route path="/favourites" element={<FavouritesList />} />
      </Routes>
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { IMovie, IFavoriteMovie } from '../../utils/interfaces';
import { ERequestStatus } from '../../utils/enums';
import AddMovieForm from '../AddMovieForm/AddMovieForm';
import { getFavorites, addToFavorites } from '../../api/favorites';

const Favorites: React.FC = () => {
  const [movies, setMovies] = useState<IFavoriteMovie[]>([]);
  const [requestStatus, setRequestStatus] = useState<ERequestStatus>(ERequestStatus.LOADING);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const result = await getFavorites();
        setMovies(result);
        setRequestStatus(ERequestStatus.LOADED);
      } catch (e) {
        console.log(e);
        setRequestStatus(ERequestStatus.FAILED);
      }
    };
    loadFavorites();
  }, []);

  const onSubmit = async (name: string) => {
    try {
      const movieData: IMovie = { name };
      const movie = await addToFavorites(movieData);
      setMovies([...movies, movie]);
    } catch (e) {}
  };

  return (
    <React.Fragment>
      <h1>Favorites</h1>
      <AddMovieForm onSubmit={onSubmit} />
      {movies.map((movie: IFavoriteMovie, index: number) => (
        <p key={index}>{movie.name}</p>
      ))}
    </React.Fragment>
  );
};

export default Favorites;

import { create } from 'zustand';

export const useSearchHistoryStore = create((set) => ({
  movies: [],
  actors: [],
  directors: [],
  studios: [],
  setMovies: (param) => {
    set((state) => ({
      movies: state.movies.concat(param),
    }));
  },
  setActors: (param) => {
    set((state) => ({
      actors: state.actors.concat(param),
    }));
  },
  setDirectors: (param) => {
    set((state) => ({
      directors: [...state.directors.concat(param)],
    }));
  },
  setStudios: (param) => {
    set((state) => ({
      studios: [...state.studios.concat(param)],
    }));
  },
  resetMovies: () => set({ movies: [] }),
  resetActors: () => set({ actors: [] }),
  resetDirectors: () => set({ directors: [] }),
  resetStudios: () => set({ studios: [] }),
  resetAllSearchHistory: () =>
    set({
      movies: [],
      actors: [],
      directors: [],
      studios: [],
    }),
}));

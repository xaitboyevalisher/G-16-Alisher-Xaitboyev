import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  title: string;
  description: string;
  technologies: string;
  location: string;
  salary: string;
  phone: string;
  email: string;
  telegram: string;
  instagram: string;
  companyId: string;
}

interface MoviesState {
  movies: Movie[];
}

const initialState: MoviesState = {
  movies: [
    {
      id: 1,
      title: "Admin",
      description:
        "This article covers meaning & importance of Job Title from HRM perspective.",
      technologies: "Web",
      location: "Tashkent",
      salary: "Physical Therapist",
      phone: "+998936754532",
      email: "admin@gmail.com",
      telegram: "@Admin",
      instagram: "@Admin_01",
      companyId: "1",
    },
    {
      id: 2,
      title: "Menedjer",
      description:
        "Your job title might seem trivial, but it matters more than you think.",
      technologies: "Sotuv bo'limini loyihalash",
      location: "Uzbekistan",
      salary: "Physical",
      phone: "998973456789",
      email: "menedjer@gmail.com",
      telegram: "@Menedjer",
      instagram: "@Menedjer_02",
      companyId: "2",
    },
  ],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    deleteMovie: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    editMovie: (state, action: PayloadAction<Movie>) => {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload.id
      );
      if (index !== -1) {
        state.movies[index] = action.payload;
      }
    },
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
  },
});

export const { deleteMovie, editMovie, addMovie } = moviesSlice.actions;
export default moviesSlice.reducer;

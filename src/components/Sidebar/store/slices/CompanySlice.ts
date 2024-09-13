import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Genre {
  id: number;
  title: string;
  description: string;
  image: string;
  website: string;
}

interface GenreState {
  genres: Genre[];
}

const initialState: GenreState = {
  genres: [
    {
      id: 1,
      title: "Google",
      description:
        "Every company has a culture that can heavily impact its productivity, employee morale and overall brand reputation.",
      image:
        "https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg",
      website:
        "https://www.entrepreneur.com/growing-a-business/10-examples-of-companies-with-fantastic-cultures/249174",
    },
    {
      id: 2,
      title: "Private Limited Company",
      description:
        "Company Registration in India Private Limited Company Registration in India",
      image:
        "https://ezybizindia.in/wp-content/uploads/2016/01/Private-Limited-company.jpg",
      website:
        "https://ezybizindia.in/services/private-limited-company-registration/",
    },
    {
      id: 3,
      title: "Company",
      description:
        "What is a Company? Definition, Characteristics, Advantages, Disadvantages",
      image:
        "https://i0.wp.com/www.iedunote.com/img/23559/what-is-a-company-1.jpg?fit=1087%2C720&quality=100&ssl=1",
      website:
        "https://www.iedunote.com/company-definition-characteristics-advantages-disadvantages",
    },
  ],
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    addGenre: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        image: string;
        website: string;
      }>
    ) => {
      const nextId =
        state.genres.length > 0
          ? Math.max(...state.genres.map((g) => g.id)) + 1
          : 1;
      const newGenre: Genre = {
        id: nextId,
        title: action.payload.title,
        description: action.payload.description,
        image: action.payload.image,
        website: action.payload.website,
      };
      state.genres.push(newGenre);
    },
    editGenre: (state, action: PayloadAction<Genre>) => {
      const { id, title, description, image, website } = action.payload;
      const genre = state.genres.find((g) => g.id === id);
      if (genre) {
        genre.title = title;
        genre.description = description;
        genre.image = image;
        genre.website = website;
      }
    },
    deleteGenre: (state, action: PayloadAction<number>) => {
      state.genres = state.genres.filter((g) => g.id !== action.payload);
    },
  },
});

export const { addGenre, editGenre, deleteGenre } = genreSlice.actions;
export default genreSlice.reducer;

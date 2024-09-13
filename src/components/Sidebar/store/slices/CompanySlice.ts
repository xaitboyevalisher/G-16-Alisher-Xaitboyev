import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Company {
  id: string;
  title: string;
  description?: string;
  image?: string;
  website?: string;
}

interface CompaniesState {
  companies: Company[];
}

const initialState: CompaniesState = {
  companies: [
    {
      id: "1",
      title: "Tesla",
      description: "Electric vehicle and clean energy company.",
      image:
        "https://th.bing.com/th/id/OIP.sLMJb7kG4Ml52cOMI0zzyQHaEK?rs=1&pid=ImgDetMain",
      website: "https://www.tesla.com",
    },
    {
      id: "2",
      title: "Apple",
      description: "Technology company that designs and sells electronics.",
      image:
        "https://media.wired.com/photos/6081f4280c9b5877078878e2/master/w_2560%2Cc_limit/business_plaintext_apple_1313768378.jpg",
      website: "https://www.apple.com",
    },
    {
      id: "3",
      title: "Google",
      description: "Search engine and internet-related services company.",
      image:
        "https://th.bing.com/th/id/OIP.Z8YCot4USmiAnGGuU9wEpgHaE8?rs=1&pid=ImgDetMain",
      website: "https://www.google.com",
    },
  ],
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    deleteCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload
      );
    },
    editCompany: (state, action: PayloadAction<Company>) => {
      const index = state.companies.findIndex(
        (company) => company.id === action.payload.id
      );
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },
  },
});

export const { deleteCompany, editCompany, addCompany } =
  companiesSlice.actions;
export default companiesSlice.reducer;

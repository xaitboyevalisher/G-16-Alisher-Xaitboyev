import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Job {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  location?: string;
  salary: string;
  phone?: string;
  email?: string;
  telegram?: string;
  instagram?: string;
  companyId: number;
}

interface JobsState {
  jobs: Job[];
}

const initialState: JobsState = {
  jobs: [
    {
      id: "1",
      title: "Frontend Developer",
      description: "React va Redux asosida ishlaydigan frontend ishlab chiquvchi talab qilinadi.",
      technologies: ["React", "Redux", "JavaScript", "CSS"],
      location: "Tashkent",
      salary: "3000 USD",
      phone: "+998901234567",
      email: "example@example.com",
      telegram: "@frontenddev",
      instagram: "@dev_insta",
      companyId: 1,
    },
    {
      id: "2",
      title: "Backend Developer",
      description: "Node.js va MongoDB asosida backend ishlab chiquvchi talab qilinadi.",
      technologies: ["Node.js", "MongoDB", "Express"],
      location: "Remote",
      salary: "3500 USD",
      phone: "+998901234568",
      email: "backend@example.com",
      telegram: "@backenddev",
      instagram: "@backend_insta",
      companyId: 2,
    },
  ],
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
    editJob: (state, action: PayloadAction<Job>) => {
      const index = state.jobs.findIndex((job) => job.id === action.payload.id);
      if (index >= 0) {
        state.jobs[index] = action.payload;
      }
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
  },
});

export const { deleteJob, editJob, addJob } = jobsSlice.actions;
export default jobsSlice.reducer;

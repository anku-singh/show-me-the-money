import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface RowCell {
  Value: string;
  Attributes?: { Value: string; Id: string }[];
}

export interface TableRow {
  RowType: string;
  Title?: string;
  Cells?: RowCell[];
  Rows?: TableRow[];
}

export interface State {
  loading: boolean;
  data: TableRow[];
  error: string | null;
}

const initialState: State = {
  loading: false,
  data: [],
  error: null,
};

export const fetchData = createAsyncThunk<
  TableRow[],
  void,
  { rejectValue: string }
>("data/fetchData", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/sheet/getBalanceSheet`
    );
    return response.data.Reports[0]?.Rows || [];
  } catch (error) {
    return rejectWithValue("Error fetching data");
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error occurred";
      });
  },
});

export default dataSlice.reducer;

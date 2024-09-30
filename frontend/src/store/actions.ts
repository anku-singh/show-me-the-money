import axios from "axios";

export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data: any) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error: string) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const fetchData = () => {
  return async (dispatch: any) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/sheet/getBalanceSheet`
      );
      dispatch(fetchDataSuccess(response.data.Reports[0]?.Rows || []));
    } catch (error) {
      dispatch(fetchDataFailure("Error fetching data"));
    }
  };
};

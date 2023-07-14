import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserState, LoginState } from '../../app/type.d';
import { RootState } from '../../app/store';
/*
const initialState:UserState = {
  isLoading: false,
  errorMessage: '',
  currentUser: null,
  isOpenMenu: true,
};*/
const initialState: LoginState = {
  "message": "",
  "isSuccess": false,
  "errors": null,
  "token": "",
  "customerInformation": null,
  "userInformation": null,
  "role": {
    "id": "",
    "normalizedName": "",
    "isManager": true,
    "users": [],
  },
};
// Fetch API

export const login = createAsyncThunk(
  'user/login',
  async ({ AccountInformation, UserName, Password, link }: { "AccountInformation": string, "UserName": string, "Password": string, link: string }, { rejectWithValue }) => {
    const response = await fetch(
      link,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            AccountInformation,
            UserName,
            Password,
          }),
      }
    );

    const jsonData = await response.json();
    /*
        if (response.status < 200 || response.status >= 300) {
          return rejectWithValue(jsonData);
        }*/

    return jsonData;
  }
);



/*
export const login = createAsyncThunk(
  'user/login',
  async (data:{"Tocken":"C29B402A-7E06-4CDB-9BA6-DCFB4205AD3C","Member_Code":string}, { rejectWithValue }) => {
    const response = await fetch(
      'http://hoangthiapi.e-biz.com.vn/api/HoangThi/HoangThi/GetTrasaction',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const jsonData = await response.json();

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData);
    }
    return jsonData;
  }
);
*/
// Config slice
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: () => initialState,
    /*    setOpenMenu: (state) => { 
          //state.isOpenMenu = !state.isOpenMenu;
        },*/
  },
  extraReducers: (builder) => {
    // Start login request
    builder.addCase(login.pending, (state) => {
      //state.isLoading = true;

    });

    // Request successful
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.errors = action.payload.errors;
      state.isSuccess = action.payload.isSuccess;
      state.message = action.payload.message;
      state.customerInformation = action.payload.customerInformation;
      state.userInformation = action.payload.userInformation;
      state.role = (action.payload.userInformation) ? action.payload.userInformation.roles : {
        "id": "0",
        "normalizedName": "Customer",
        "isManager": false,
        "users": null,
      };
    });

    // Request error
    builder.addCase(login.rejected, (state, action) => {
      
      //state.isLoading = false;
      //state.errorMessage = action.payload.message;
    });
  },
});

// Export actions
export const { logout } = loginSlice.actions;

// Select state currentUser from slice
/*
export const selectUser = (state:RootState) => state.user.currentUser;
export const selectLoading = (state:RootState) => state.user.isLoading;
export const selectErrorMessage = (state:RootState) => state.user.errorMessage;
export const selectOpenMenu = (state:RootState) => state.user.isOpenMenu;
*/

export const selectSuccess = (state: RootState) => state.login.isSuccess;
export const selectMessage = (state: RootState) => state.login.message;
export const selectToken = (state: RootState) => state.login.token;
export const selectError = (state: RootState) => state.login.errors;
export const selectInformation = (state: RootState) => state.login.userInformation ? state.login.userInformation : state.login.customerInformation;
export const selectRole = (state: RootState) => state.login.role;

// Export reducer
export default loginSlice.reducer;

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { Dispatch } from "react";
import { User } from "./types";

export const GlobalStateContext = React.createContext(
  {} as { user: User; isLoggedIn: boolean }
);
export const GlobalDispatchContext = React.createContext(
  {} as Dispatch<{ type: any; payload: any }>
);

const initialState = {
  user: undefined,
  isLoggedIn: false,
};

function reducer(state: any, action: { type: any; payload: any | undefined }) {
  switch (action.type) {
    case "LOGIN_USER": {
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    }
    case "LOGOUT_USER": {
      return {
        ...state,
        user: undefined,
        isLoggedIn: false,
      };
    }

    default:
      throw new Error("Bad Action Type");
  }
}

const GlobalProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {props.children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalProvider;

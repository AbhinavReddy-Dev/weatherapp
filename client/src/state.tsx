/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { Dispatch } from "react";
import { User } from "./types";

type State = {
  user: User | undefined;
  isLoggedIn: boolean;
};

type Action =
  | { type: "LOGIN_USER"; payload: User }
  | { type: "LOGOUT_USER" }
  | { type: "ADD_CITY"; payload: string }
  | { type: "REMOVE_CITY"; payload: string };

export const GlobalStateContext = React.createContext<State>({
  user: undefined,
  isLoggedIn: false,
});

export const GlobalDispatchContext = React.createContext<Dispatch<Action>>(
  {} as Dispatch<Action>
);

const initialState: State = {
  user: undefined,
  isLoggedIn: false,
};

function reducer(state: State, action: Action): State {
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
    case "ADD_CITY": {
      return {
        ...state,
        user: {
          ...state.user!,
          cities: [...state.user!.cities, action.payload],
        },
      };
    }
    case "REMOVE_CITY": {
      return {
        ...state,
        user: {
          ...state.user!,
          cities: state.user!.cities.filter(
            (city: string) => city !== action.payload
          ),
        },
      };
    }
    default:
      throw new Error("Bad Action Type");
  }
}

const GlobalProvider = (props: { children: React.ReactNode }) => {
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

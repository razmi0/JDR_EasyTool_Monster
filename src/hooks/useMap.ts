import { useCallback, useReducer } from "react";

const initializeArr = <T extends boolean>(size: number, fillValue: T | boolean = false): T[] => {
  return new Array(size).fill(fillValue) as T[];
};

type StateName = keyof States & string;
type ActionType =
  | { type: "CREATE"; payload: { size: number; stateName: StateName } }
  | { type: "TOGGLE"; payload: { indexes: number | number[]; stateName: StateName } }
  | { type: "TOGGLE_ALL"; payload: { stateName: StateName } }
  | { type: "ADD"; payload: { size: number; stateName: StateName } }
  | { type: "REMOVE_LAST"; payload: { size: number; stateName: StateName } }
  | { type: "REMOVE_AT"; payload: { indexes: number | number[]; stateName: StateName } }
  | { type: "REMOVE_ALL"; payload: { stateName: StateName } };

type States = {
  [key: string]: boolean[];
};

const reducer = (state: States, action: ActionType): States => {
  const { type, payload } = action;

  if (!state[payload.stateName] && type !== "CREATE") {
    throw new Error(`State ${payload.stateName} does not exist`); // already exists
  }

  if (type === "TOGGLE" || type === "REMOVE_AT") {
    if (!Array.isArray(payload.indexes)) {
      payload.indexes = [payload.indexes];
    }
  }

  const { stateName } = payload;
  const currentState = state[stateName];

  switch (type) {
    case "CREATE":
      return { ...state, [stateName]: initializeArr(payload.size) };
    //

    case "TOGGLE": {
      const arr = payload.indexes as number[];
      return {
        ...state,
        [stateName]: currentState.map((item, i) => (arr.includes(i) ? !item : item)),
      };
    }

    //

    case "TOGGLE_ALL":
      return {
        ...state,
        [stateName]: currentState.map((item) => !item),
      };

    //

    case "ADD":
      return {
        ...state,
        [stateName]: [...currentState, ...initializeArr(payload.size)],
      };

    //

    case "REMOVE_LAST":
      return {
        ...state,
        [stateName]: currentState.slice(0, currentState.length - payload.size),
      };

    //

    case "REMOVE_AT": {
      const arr = payload.indexes as number[];
      return {
        ...state,
        [stateName]: currentState.filter((_, i) => !arr.includes(i)),
      };
    }

    //

    case "REMOVE_ALL":
      return {
        ...state,
        [stateName]: [],
      };

    //

    default:
      return state;
  }
};

const initializeState = (stateName: string[] | string, initialSize: number[] | number) => {
  const arrStr = Array.isArray(stateName) ? stateName : [stateName];
  const arrNum = Array.isArray(initialSize) ? initialSize : [initialSize];
  const state: States = {};

  arrStr.map((name, i) => {
    state[name] = initializeArr(arrNum[i]);
  });

  return state;
};

export const useMap = (stateName: string[] | string, initialSize: number[] | number) => {
  const [map, dispatch] = useReducer(reducer, initializeState(stateName, initialSize));

  const toggle = useCallback((indexes: number | number[], stateName: string) => {
    dispatch({ type: "TOGGLE", payload: { indexes, stateName } });
  }, []);

  const toggleAll = useCallback((stateName: string) => {
    dispatch({ type: "TOGGLE_ALL", payload: { stateName } });
  }, []);

  const add = useCallback((size: number, stateName: string) => {
    dispatch({ type: "ADD", payload: { size, stateName } });
  }, []);

  const removeLast = useCallback((size: number, stateName: string) => {
    dispatch({ type: "REMOVE_LAST", payload: { size, stateName } });
  }, []);

  const removeAt = useCallback((indexes: number | number[], stateName: string) => {
    dispatch({ type: "REMOVE_AT", payload: { indexes, stateName } });
  }, []);

  const removeAll = useCallback((stateName: string) => {
    dispatch({ type: "REMOVE_ALL", payload: { stateName } });
  }, []);

  const create = useCallback((size: number, stateName: string) => {
    dispatch({ type: "CREATE", payload: { size, stateName } });
  }, []);

  return {
    map: map,
    toggle,
    toggleAll,
    add,
    removeLast,
    removeAt,
    removeAll,
    create,
  };
};

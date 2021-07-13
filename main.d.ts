import { composeState, createState, Machineable, State } from './src/state.js';
import { createTransitions } from './src/transitions.js';
import { createTriggers } from './src/triggers.js';
declare const createProxy: <S, T extends symbol>(initialState: S & Machineable & AsyncIterable<T>, transitions: Record<T, [S & Machineable & AsyncIterable<T>, S & Machineable & AsyncIterable<T>][]>) => S & AsyncIterable<T>;
export { Machineable, createState, createProxy, composeState, createTriggers, createTransitions, State };

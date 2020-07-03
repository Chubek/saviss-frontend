import {applyMiddleware, createStore, compose} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import {AsyncStorage} from "react-native";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import {createFilter} from 'redux-persist-transform-filter';
import reducer from "./reducer";

const enhancers = [
    applyMiddleware(
        thunkMiddleware
        // createLogger({
        //   collapsed: true,
        //   // eslint-disable-next-line no-undef
        //   predicate: () => __DEV__,
        // })
    ),
];

/* eslint-disable no-undef */
const composeEnhancers =
    (__DEV__ &&
        typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

const saveSubsetFilter = createFilter(
    'listener',
    ['token']
);

const persistConfig = {
    key: "root-v17",
    storage: AsyncStorage,
    whitelist: ['listener'],
    transforms: [saveSubsetFilter]
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer, {}, enhancer);
export const persistor = persistStore(store);

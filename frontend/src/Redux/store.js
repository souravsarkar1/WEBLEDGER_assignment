import {  applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as AuthReducer } from "./AuthReducer/reducer";
import  {reducer as RecipeReducer} from './RecipeReducer/reducer'; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define the persist config
const persistConfig = {
  key: 'root', // key is required
  storage, // storage is imported from redux-persist/lib/storage
  // Optionally, you can whitelist specific reducers that you want to persist
  // whitelist: ['reducerName']
};

const rootReducer = combineReducers({
  AuthReducer,RecipeReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

// Create a persistor object
export const persistor = persistStore(store);

// Now you can use 'store' and 'persistor' in your application

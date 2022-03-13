import { combineReducers } from 'redux';

import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';

import cartReducer from './cart/cart.reducer';
import userReducer from './user/user.reducer';
import directoryReducer from './directory/directory.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], //Store slices we want to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
});

export default persistReducer(persistConfig, rootReducer);

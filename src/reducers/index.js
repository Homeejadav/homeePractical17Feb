import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import homeReducer from './homeReducer';
import detailsReducer from './detailsReducer';
import favoriteReducer from './favoriteReducer';
import cartReducer from './cartReducer';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: [
	],
	whitelist: [
		'homeReducer',
		// 'quantity'
	]
};

const logger = createLogger({
});

const rootReducer = combineReducers({
	homeReducer: persistReducer(persistConfig, homeReducer),
	detailsReducer: persistReducer(persistConfig, detailsReducer),
	favoriteReducer: persistReducer(persistConfig, favoriteReducer),
	cartReducer: persistReducer(persistConfig, cartReducer),

});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))
export const persistor = persistStore(store);
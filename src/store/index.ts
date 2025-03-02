import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categories from "@store/categories/categoriesSlice";
import products from "@store/products/productsSlice";
import cart from "@store/cart/cartSlice";
import wishlist from "@store/wishlist/wishlistSlice";
import authSlice from "./auth/authSlice";
import orders from "./orders/ordersSlice";
import toast from "./toast/toastSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const cartPersistConfig = {
  key: "cart",
  storage, // local storage
  whitelist: ["items"], // add cart items to local storage
  // blacklist: ["cart"] => add every data but cart data to loacl storage
};
const authPersistConfig = {
  key: "auth",
  storage,
  wishlist: ["accessToken", "user"]
};

const rootReducer = combineReducers({
  authSlice: persistReducer(authPersistConfig, authSlice),
  categories, 
  products, 
  cart: persistReducer(cartPersistConfig, cart), 
  wishlist,
  orders,
  toast,
});

const rootPersistConfig = {
  key: "root",
  storage,
  whiteList: ["cart", "auth"]
};
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);



// more info => search for redux persist
const store = configureStore({
  reducer: persistedReducer,
  // to skip redux toolkit checking on persist 
  // cause redux persist is not supported by redux toolkit
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

const persistor = persistStore(store);

export { store, persistor };
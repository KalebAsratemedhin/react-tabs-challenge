import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { tabsApi } from './api/tabsAPI'

export const store = configureStore({
  reducer: {
    [tabsApi.reducerPath]: tabsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tabsApi.middleware),
})

setupListeners(store.dispatch)


import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import Home from './pages/Home.jsx'
import Cart from './components/Cart/Cart.jsx'
import Wishlist from './components/Wishlist/Wishlist.jsx'
import Singlepage from './components/Singlepage/Singlepage.jsx'
import PaymentSuccess from './components/Cart/PaymentSuccess.jsx'
import App from './App.jsx'

import { Provider } from 'react-redux'
import store from './store/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index element={<Home />} />
      <Route path='wishlist' element={<Wishlist />} />
      <Route path='cart' element={<Cart />} />
      <Route path='singlepage/:id' element={<Singlepage />} />
      <Route path='paymentsuccess' element={<PaymentSuccess />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Vitrine from './pages/Vitrine.jsx'
import Carrinho from './pages/Carrinho.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import HomeLayout from './pages/HomeLayout';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/vitrine",
          element: <Vitrine />
        },
        {
          path: "/carrinho",
          element: <Carrinho />
        },
      ]
    }
  ])
  return <RouterProvider router={router} />

}

export default App

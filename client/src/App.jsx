import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Importe seus componentes exatamente como estava
import Home from './pages/Home.jsx'
import Vitrine from './pages/Vitrine.jsx'
import Carrinho from './pages/Carrinho.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import HomeLayout from './pages/HomeLayout'
import Inicial from './pages/Inicial.jsx'
import Gerenciamento from './pages/Gerenciamento.jsx'
import DetalhesProduto from './components/DetalhesProduto.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Inicial />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/gerenciamento",
      element: <Gerenciamento />,
    },
    {
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/vitrine",
          element: <Vitrine />,
        },
        {
          path: "/carrinho",
          element: <Carrinho />,
        },
        {
          path: "/produto/:id",
          element: <DetalhesProduto />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './Pages/NuevoCliente'
import Index, {loader as clientesLoader} from './Pages/Index'
import ErrorPage from './Components/ErrorPage'
import EditarCliente, {loader as editarCLienteLoader, action as editarClienteAction} from './Pages/EditarCliente'
import { action as eliminarClienteAction } from './Components/Cliente'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [      
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editarCLienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: 'clientes/:clienteId/eliminar',
        action: eliminarClienteAction
        
      }      
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider 
        router={router}    
    />
  </React.StrictMode>,
)

import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { obtenerCliente, actualizarCliente } from "../data/Clientes"
import Formulario from "../Components/Formulario"
import Error from "../Components/Error"

export async function action({request, params}){

    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email')  
  
    // Validacion  
    const errores = []
    if(Object.values(datos).includes('')){
      errores.push('Todos los campos son obligatorios')
    }
  
    // Validar Email
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  
    if(!regex.test(email)){
      errores.push('El email no es valido')
    }
  
    // Validar Errores
    if(Object.keys(errores).length){
      return errores
    }
  
    await actualizarCliente(params.clienteId,datos)
  
    return redirect('/')

}

export async function loader({params}){
    const cliente = await obtenerCliente(params.clienteId)
    if(Object.values(cliente).length === 0){
        throw new response('',{
            status: 404,
            statusText: 'No hay resultados'
        })
    }
    return cliente
    
}

function EditarCliente() {

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Edita los Campos del Cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={ () => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

        {errores?.length && errores.map( (error, i) => <Error key={i} >{error}</Error> )}

        <Form
          method='post'
          noValidate         
        >

          <Formulario 
                cliente={cliente}
          />
          <input 
            type='submit'
            className="uppercase font-bold text-white text-lg bg-blue-800 mt-5 w-full p-3 text-center hover:bg-blue-900 cursor-pointer" 
            value='Guardar Cambios'          
          />

        </Form>
        
      </div>
    </>
  )
}

export default EditarCliente
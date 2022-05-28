import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cliente from '../components/Cliente';

const Inicio = () => {

  const [clientes,SetClientes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        SetClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    }
    obtenerClientesApi();
  },[])

  const handleEliminar = async (id) => {
    const confirmarEliminacion = confirm('¿Deseas eliminar este cliente?');
    if(confirmarEliminacion){
      try {
        const url = import.meta.env.VITE_API_URL+`/${id}`;
        const respuesta = await fetch(url, {
        method:'DELETE'
        })
        await respuesta.json();  
        const confirmarEliminacion = confirm(`Se elimino el cliente ${id} exitosamente`);
        navigate('/clientes/nuevo');
      } catch (error) {
        console.log(error);
      }
      
    }
  }

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>
          Clientes
      </h1>        
      <p
        className='mt-3'
      >Administra tus clientes</p>

      <table
        className='w-full mt-5 table-auto shadow bg-white'
      >
        <thead className='bg-blue-800 text-white text-xl'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {clientes.map(cliente => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>

    </>
  )
}

export default Inicio;
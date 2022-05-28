import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const VerCliente = () => {

    const {id} = useParams();
    const [cliente,setCliente] = useState([]);
  
    useEffect(() => {
      const obtenerClienteAPI = async () => {
        try {
          const url = `http://localhost:4000/clientes/${id}`;
          const peticion = await fetch(url);
          const resultado = await peticion.json();
          setCliente(resultado);
        } catch (error) {
          console.log(error);
        }
      }
      obtenerClienteAPI();
    },[])

    return (
      <div>
          <p className='font-black text-4xl text-blue-900 mb-10 uppercase'>
            Información del cliente  
          </p>        
          {cliente.nombre && (
            <p className='text-4xl text-gray-700 mb-6'>
              <span className='uppercase font-bold'>Nombre: </span>
              {cliente.nombre}
            </p>
          )}  

          {cliente.email && (
            <p className='text-4xl text-gray-700 mb-6'>
              <span className='uppercase font-bold'>Email: </span>
              {cliente.email}
            </p>
          )}            

          {cliente.telefono && (
            <p className='text-4xl text-gray-700 mb-6'>
              <span className='uppercase font-bold'>Teléfono: </span>
              {cliente.telefono}
            </p>
          )}
           

          {cliente.empresa && (
            <p className='text-4xl text-gray-700 mb-6'>
              <span className='uppercase font-bold'>Empresa: </span>
              {cliente.empresa}
            </p>
          )}          

          {cliente.notas && (
          <p className='text-4xl text-gray-700 mb-6'>
             <span className='uppercase font-bold'>Observaciones: </span>
             {cliente.notas}
          </p>
          )}

      </div>
    )
}

export default VerCliente;
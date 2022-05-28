import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Formulario from '../components/Formulario';

const EditarCliente = () => {

  const { id } = useParams();
  const [cliente, setCliente] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL+`/${id}`;
        const peticion = await fetch(url);
        const resultado = await peticion.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };
    obtenerClienteAPI();
  }, []);

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>
            Editar cliente {cliente.length}
        </h1>  
        
        {Object.keys(cliente).length > 0 ?(
        <div>             
          <p
            className='mt-3'
          >Utiliza este formulario para editar datos de un cliente</p>          
          <Formulario
            cliente={cliente}
            upOrUpdate={false}
            cargando={cargando}
          />          
        </div>
        ): <p className='mt-3'>
            Cliente no existe or no valido 
          </p>
        }
    </>
  )
}

export default EditarCliente
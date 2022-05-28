import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import *as Yup from 'yup';
import Alerta from './Alerta';
import { useEffect, useState } from "react";

import Spinner from './Spiner';

const Formulario = (props) => {

  const {nombre, empresa, email, telefono, notas} = props.cliente;
  const navigate = useNavigate();

  const [upOrUpdate, setUpOrUpdate] = useState();

  useEffect(() => {
    setUpOrUpdate(props.upOrUpdate);
  }, []);

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
                .required('El nombre del cliente es obligatorio')
                .min(3, 'El nombre es muy corto')
                .max(20, 'El nombre es muy largo'),
    empresa: Yup.string()
                .required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
              .email('Email no válido')
              .required('El email es obligatorio'),
    telefono: Yup.number('Solo numeros')
                  .typeError('Número no válido')
                  .positive('Número no valido')
                  .integer('Número no valido')
  });

  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      const url = 'http://localhost:4000/clientes';
      if(upOrUpdate){
        //CREACION DE UN NUEVO REGISTRO
        respuesta = await fetch(url, {
          method:'POST',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else {
        //EDICION DE UN REGISTRO
        respuesta = await fetch(url+`/${props.cliente.id}`, {
          method:'PUT',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      await respuesta.json();      
      navigate('/clientes');

    } catch (error) {
      console.log(error);
      }
      
    }
  

  return (
    props.cargando ? <Spinner/> : (
    <div 
        className="bg-white mt-10 px-5 
        py-10 rounded-md shadow-md md:w-3/4 mx-auto"
    >
        <h1
            className="text-gray-600 font-bold 
            text-xl uppercase text-center"
        >
        {upOrUpdate ? 'Nuevo cliente': 'Editar cliente'}
        </h1>        
        <Formik
          initialValues={{
            nombre: upOrUpdate ? '' : nombre ,
            empresa: upOrUpdate ? '' : empresa,
            email: upOrUpdate ? '' : email,
            telefono: upOrUpdate ? '' : telefono,
            notas: upOrUpdate ? '' : notas
          }}
          enableReinitialize={true}
          onSubmit={ async (values, {resetForm}) => {
            await handleSubmit(values);
            resetForm();
          }}
          validationSchema={nuevoClienteSchema}
        >
          {({errors, touched}) => {
            return (
          <Form className="mt-10 ">            
            <div className="mb-4">
              <label
                className="text-gray-800"
                htmlFor="nombre"
              >Nombre:</label>
              <Field
                id='nombre'
                type='text'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Nombre del cliente'
                name='nombre'
              />
              {errors.nombre && touched.nombre ? 
              <Alerta>{errors.nombre}</Alerta> : null}
            </div>  
            <div className="mb-4">
              <label
                className="text-gray-800"
                htmlFor="empresa"
              >Empresa:</label>
              <Field
                id='empresa'
                type='text'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Empresa del cliente'
                name='empresa'
              />
              {errors.empresa && touched.empresa ? 
              <Alerta>{errors.empresa}</Alerta> : null}
            </div>         
            <div className="mb-4">
              <label
                className="text-gray-800"
                htmlFor="email"
              >E-mail:</label>
              <Field
                id='email'
                type='email'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='E-mail del cliente del cliente'
                name='email'
              />
              {errors.email && touched.email ? 
              <Alerta>{errors.email}</Alerta> : null}
            </div>  
            <div className="mb-4">
              <label
                className="text-gray-800"
                htmlFor="telefono"
              >Teléfono:</label>
              <Field
                id='telefono'
                type='number'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Telefóno del cliente'
                name='telefono'
              />
              {errors.telefono && touched.telefono ? 
              <Alerta>{errors.telefono}</Alerta> : null}
            </div>  
            <div className="mb-4">
              <label
                className="text-gray-800"
                htmlFor="notas"
              >Notas:</label>
              <Field
                as='textarea'
                id='notas'
                type='text'
                className='mt-2 block w-full p-3 bg-gray-50 h-40'
                placeholder='Notas del cliente'
                name='notas'
              />
            </div>  
            <input
              type='submit'
              value={upOrUpdate ? 'Nuevo cliente': 'Editar cliente'}
              className='mt-5 w-full bg-blue-800 p-3 text-white
              uppercase font-bold text-lg rounded-md'
            />
          </Form>
          )}}
        </Formik>
    </div>
    )
  )
}

Formulario.defaultProps = {
  cliente : {}
}

export default Formulario
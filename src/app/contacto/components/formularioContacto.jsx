'use client'

import './formularioContacto.css';
import { contactos } from '../page';
import { EnviarCorreo } from '@/lib/api';

import { Formik } from "formik";
import * as yup from 'yup';
import toast from 'react-hot-toast'

import { useState } from "react";

export default function FormularioContacto () {

    const schemaFormulario = yup.object().shape({
        tipoSolicitud: yup.number().min(1, "Debe seleccionar el tipo de solicitud"),
        correo: yup.string().email("Ingresar un correo válido").required("Debe ingresar un correo electrónico"),
        peticion: yup.string().required("Debe ingresar la petición").min(10, "La petición debe contener un mínimo de 10 carácteres")
    })

    const [tipoSolicitud, setTipoSolicitud] = useState(0);

    const opcionesSelect = [
        {value: -1, texto: "Seleccione"},
        {value: 1, texto: "Información"},
        {value: 2, texto: "Cotización"},
    ];

    const handleTipoSolicitud = (e) => {
        setTipoSolicitud(e.target.value);
    };

    const handleEnviarCorreo = async (values, actions) => {
        
        var correosEnvio = contactos.map(contacto => {return contacto.contactos.filter(email => email.tipo.includes("Email"))})
                           .filter(contacto => contacto.length > 0)
                           .map(contacto => {return contacto[0]});

        var asunto = `Tipo de Solicitud: ${opcionesSelect.filter(opcion => opcion.value == values.tipoSolicitud)[0].texto}`;

        var cuerpo = `Correo de Cliente:\n${values.correo}\n\n` +
                     `Petición:\n${values.peticion}`;

        var adjuntos = values.archivo ? values.archivo : null;

        var data = {correosEnvio, asunto, cuerpo, adjuntos};

        try {
            await EnviarCorreo(data);
            toast.success("Información enviada correctamente");
        }
        catch (ex) {
            toast.error("Error al enviar información, intente más tarde");
        }

        actions.resetForm();
    }

    return (

        <div className="card p-3 shadow">
            <div className="card-header">
                <h1 className="text-center fw-bold card-title">Deja tu Información</h1>
                <p className="text-center fw-bold mb-4 card-text">Nos pondremos en contacto con usted</p>
            </div>
            <div className="card-body">
                <Formik 

                    initialValues={{
                        tipoSolicitud: 0,
                        correo: '',
                        peticion: '',
                        archivo: '',
                    }}

                    onSubmit={(values, actions) => {
                        handleEnviarCorreo(values, actions);
                    }}

                    validationSchema={schemaFormulario}
                >
                    {({handleSubmit, values, handleChange, errors, touched}) => (
                        <form id="formularioContacto" onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="tipoSolicitud" className="form-label">Tipo de Solicitud</label>
                                    <select 
                                        name="tipoSolicitud" 
                                        id="tipoSolicitud" 
                                        className={`form-select ${errors.tipoSolicitud && touched.tipoSolicitud ? 'border-danger' : ''}`} 
                                        value={values.tipoSolicitud} 
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleTipoSolicitud(e);
                                        }}>
                                        {opcionesSelect.map((opcion) => (
                                            <option key={opcion.value} value={opcion.value}>{opcion.texto}</option>
                                        ))}
                                    </select>
                                    {errors.tipoSolicitud && touched.tipoSolicitud && (
                                        <p className='text-danger'>{errors.tipoSolicitud}</p>
                                    )}
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="correo" className="form-label">Correo</label>
                                    <input 
                                        name="correo" 
                                        type="text" 
                                        id="correo" 
                                        className={`form-control ${errors.correo && touched.correo ? 'border-danger' : ''}`} 
                                        placeholder="alguien@dominio.com" 
                                        value={values.correo} 
                                        onChange={handleChange}
                                    />
                                    {errors.correo && touched.correo && (
                                        <p className='text-danger'>{errors.correo}</p>
                                    )}
                                </div>
                                <div className="col-md-12 mb-4">
                                    <label htmlFor="peticion" className="form-label" >Petición</label>
                                    <textarea 
                                        name="peticion" 
                                        id="peticion" 
                                        className={`form-control ${errors.peticion && touched.peticion ? 'border-danger' : ''}`} 
                                        placeholder="Información acerca de..." 
                                        value={values.peticion}
                                        onChange={handleChange}>
                                    </textarea>
                                    {errors.peticion && touched.peticion && (
                                        <p className='text-danger'>{errors.peticion}</p>
                                    )}
                                </div>
                                {tipoSolicitud == 2 && (
                                    <div className='col-md-12 mb-4'>
                                        <label htmlFor='archivo' className='form-label'>Adjunte Archivo</label>
                                        <input 
                                            type='file' 
                                            name='archivo' 
                                            id='archivo' 
                                            className={`form-control ${errors.archivo && touched.archivo ? 'border-danger' : ''}`} 
                                            value={values.archivo}
                                            onChange={handleChange}>
                                        </input>
                                        {errors.archivo && touched.archivo && (
                                        <p className='text-danger'>{errors.archivo}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                            <button type='submit' className='btn btn-dark'>Enviar</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>

    );

}
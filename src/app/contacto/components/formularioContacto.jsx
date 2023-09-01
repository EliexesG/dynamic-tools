'use client'

import './formularioContacto.css';
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

    const [tipoSolicitud, setTipoSolicitud] = useState(-1);
    const [archivos, setArchivos] = useState(null);

    const opcionesSelect = [
        {value: -1, texto: "Seleccione"},
        {value: 1, texto: "Información"},
        {value: 2, texto: "Cotización"},
    ];

    const handleTipoSolicitud = (e) => {
        var tipoSolicitud = e.target.value;
        setTipoSolicitud(tipoSolicitud);
        setArchivos(null);
    };

    const handleArchivo = async (e) => {
        
        var archivos = e.target.files;
        var adjuntos = [];
        var tamanno = 0;

        for(var i = 0; i < archivos.length; i++) {

            const archivo = archivos[i];

            tamanno += archivo.size;

            const buffer = await archivo.arrayBuffer();

            let str = '';

            const bufferView = new Uint8Array(buffer);

            for(let i = 0; i < bufferView.length; i++) {
                str += String.fromCharCode(bufferView[i]);
            }

            const base64 = btoa(str);

            adjuntos.push({filename: archivos[i].name, content: base64, encoding: 'base64'});

        }
        
        tamanno = tamanno / 1e+6;
        setArchivos(adjuntos);
    }

    const handleEnviarCorreo = async (values, actions) => {

        var tipoSolicitud = opcionesSelect.filter(opcion => opcion.value == values.tipoSolicitud)[0].texto;

        var fecha = new Date().toLocaleString();

        var asunto = `Tipo de Solicitud: ${tipoSolicitud} | ${fecha}`;

        var cuerpo = {
            correo: values.correo, 
            peticion: values.peticion, 
            tipo: tipoSolicitud, 
            fecha: fecha,
        };

        var adjuntos = archivos ? archivos : null;

        var data = {asunto, cuerpo, adjuntos};

        const idToast = toast.loading("Enviando Solicitud...")
        
        try {
            
            const envio = await EnviarCorreo(data);

            if(envio.status === 200) {
                toast.success('Se ha enviado la solicitud correctamente', {
                    id: idToast,
                });
            }
            else if (envio.status === 400) {
                toast.error('Error al enviar solicitud, intente más tarde', {
                    id: idToast,
                });
            }
        }
        catch(err) {
            console.log(err);
            toast.error('Error al enviar solicitud, intente más tarde', {
                id: idToast,
            });
        }
            
        setTipoSolicitud(-1);
        
        actions.resetForm();
    }

    return (

        <div className="card p-3">
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
                                        className={`form-select shadow ${errors.tipoSolicitud && touched.tipoSolicitud ? 'border-danger' : ''}`} 
                                        value={values.tipoSolicitud} 
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleTipoSolicitud(e, values);
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
                                        className={`form-control shadow ${errors.correo && touched.correo ? 'border-danger' : ''}`} 
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
                                        className={`form-control shadow ${errors.peticion && touched.peticion ? 'border-danger' : ''}`} 
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
                                        <label htmlFor='archivo' className='form-label'>Adjunte Archivos</label>
                                        <input 
                                            type='file'
                                            name='archivos' 
                                            id='archivos'
                                            multiple 
                                            className="form-control shadow" 
                                            onChange={ async (e) => {
                                                await handleArchivo(e);
                                            }}>
                                        </input>
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
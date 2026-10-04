"use client";

import { EnviarCorreo } from "@/lib/api";

import { Formik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import { useState } from "react";
import { ConvertirArchivosToAdjuntos } from "@/lib/utils";

const MensajeErrorEnvio = (envio) => {
  if (envio && envio.code === "RATE_LIMITED") {
    return envio.retryAfter
      ? `Demasiadas solicitudes. Inténtalo de nuevo en ${envio.retryAfter} segundos.`
      : "Demasiadas solicitudes, inténtalo más tarde.";
  }

  return (
    envio?.error ||
    envio?.message ||
    "No se pudo enviar la solicitud, inténtalo más tarde"
  );
};

const controlBase =
  "w-full rounded-lg border bg-white px-3 py-2 text-black shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1";
const controlNormal = "border-gray-300";
const controlError = "border-red-500";

export default function FormularioContacto() {
  const schemaFormulario = yup.object().shape({
    tipoSolicitud: yup.number().min(1, "Debe seleccionar el tipo de solicitud"),
    correo: yup
      .string()
      .email("Ingresar un correo válido")
      .required("Debe ingresar un correo electrónico"),
    peticion: yup
      .string()
      .required("Debe ingresar la petición")
      .min(10, "La petición debe contener un mínimo de 10 carácteres"),
  });

  const [tipoSolicitud, setTipoSolicitud] = useState(-1);
  const [archivos, setArchivos] = useState(null);

  const opcionesSelect = [
    { value: -1, texto: "Seleccione" },
    { value: 1, texto: "Información" },
    { value: 2, texto: "Cotización" },
  ];

  const handleTipoSolicitud = (e) => {
    var tipoSolicitud = e.target.value;
    setTipoSolicitud(tipoSolicitud);
    setArchivos(null);
  };

  const handleArchivo = async (e) => {
    var archivos = e.target.files;

    var adjuntos = await ConvertirArchivosToAdjuntos(archivos);

    setArchivos(adjuntos);
  };

  const handleEnviarCorreo = async (values, actions) => {
    var tipoSolicitud = opcionesSelect.filter(
      (opcion) => opcion.value == values.tipoSolicitud
    )[0].texto;

    var fecha = new Date().toLocaleString();

    var asunto = `Tipo de Solicitud: ${tipoSolicitud} | ${fecha}`;

    var cuerpo = {
      correo: values.correo,
      peticion: values.peticion,
      tipo: tipoSolicitud,
      fecha: fecha,
    };

    var adjuntos = archivos ? archivos : null;

    var data = { asunto, cuerpo, adjuntos };

    console.log(data);

    const idToast = toast.loading("Enviando Solicitud...");

    try {
      const envio = await EnviarCorreo(data);

      if (envio.ok) {
        toast.success("Se ha enviado la solicitud correctamente", {
          id: idToast,
        });
        setTipoSolicitud(-1);
        actions.resetForm();
        return;
      }

      toast.error(MensajeErrorEnvio(envio), { id: idToast });
    } catch (err) {
      console.log(err);
      toast.error("No se pudo enviar la solicitud, inténtalo más tarde", {
        id: idToast,
      });
    }
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-md sm:p-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Deja tu Información</h2>
        <p className="font-bold text-gray-700">
          Nos pondremos en contacto con usted
        </p>
      </div>
      <Formik
        initialValues={{
          tipoSolicitud: 0,
          correo: "",
          peticion: "",
        }}
        onSubmit={(values, actions) => {
          handleEnviarCorreo(values, actions);
        }}
        validationSchema={schemaFormulario}
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <form id="formularioContacto" onSubmit={handleSubmit} noValidate>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="tipoSolicitud"
                  className="mb-1 block font-medium"
                >
                  Tipo de Solicitud
                </label>
                <select
                  name="tipoSolicitud"
                  id="tipoSolicitud"
                  className={`${controlBase} ${
                    errors.tipoSolicitud && touched.tipoSolicitud
                      ? controlError
                      : controlNormal
                  }`}
                  value={values.tipoSolicitud}
                  onChange={(e) => {
                    handleChange(e);
                    handleTipoSolicitud(e, values);
                  }}
                  aria-invalid={Boolean(
                    errors.tipoSolicitud && touched.tipoSolicitud
                  )}
                  aria-describedby={
                    errors.tipoSolicitud && touched.tipoSolicitud
                      ? "tipoSolicitud-error"
                      : undefined
                  }
                >
                  {opcionesSelect.map((opcion) => (
                    <option key={opcion.value} value={opcion.value}>
                      {opcion.texto}
                    </option>
                  ))}
                </select>
                {errors.tipoSolicitud && touched.tipoSolicitud && (
                  <p
                    id="tipoSolicitud-error"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.tipoSolicitud}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="correo" className="mb-1 block font-medium">
                  Correo
                </label>
                <input
                  name="correo"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  id="correo"
                  className={`${controlBase} ${
                    errors.correo && touched.correo ? controlError : controlNormal
                  }`}
                  placeholder="alguien@dominio.com"
                  value={values.correo}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.correo && touched.correo)}
                  aria-describedby={
                    errors.correo && touched.correo ? "correo-error" : undefined
                  }
                />
                {errors.correo && touched.correo && (
                  <p id="correo-error" className="mt-1 text-sm text-red-600">
                    {errors.correo}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="peticion" className="mb-1 block font-medium">
                  Petición
                </label>
                <textarea
                  name="peticion"
                  id="peticion"
                  className={`${controlBase} min-h-[150px] ${
                    errors.peticion && touched.peticion
                      ? controlError
                      : controlNormal
                  }`}
                  placeholder="Información acerca de..."
                  value={values.peticion}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.peticion && touched.peticion)}
                  aria-describedby={
                    errors.peticion && touched.peticion
                      ? "peticion-error"
                      : undefined
                  }
                ></textarea>
                {errors.peticion && touched.peticion && (
                  <p id="peticion-error" className="mt-1 text-sm text-red-600">
                    {errors.peticion}
                  </p>
                )}
              </div>
              {tipoSolicitud == 2 && (
                <div className="md:col-span-2">
                  <label htmlFor="archivos" className="mb-1 block font-medium">
                    Adjunte Archivos
                  </label>
                  <input
                    type="file"
                    name="archivos"
                    id="archivos"
                    multiple
                    className={`${controlBase} ${controlNormal}`}
                    onChange={async (e) => {
                      await handleArchivo(e);
                    }}
                  ></input>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="rounded-md bg-secondary px-5 py-2 font-medium text-white transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Enviar
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

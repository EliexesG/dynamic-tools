"use client";

import { sendContactRequest } from "../_lib/contact-api";

import { Formik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import { useState } from "react";
import { convertFilesToAttachments } from "../_lib/contact-attachments";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

/**
 * Builds the toast message for a failed submission response.
 *
 * @param {Object} [response] Payload returned by `sendContactRequest` on failure.
 * @param {string} [response.code] Error code (e.g. `RATE_LIMITED`).
 * @param {number} [response.retryAfter] Seconds the client should wait before retrying.
 * @param {string} [response.error] Server-provided error text.
 * @param {string} [response.message] Server-provided fallback text.
 * @returns {string} The user-facing Spanish message.
 */
const getSendErrorMessage = (response) => {
  if (response && response.code === "RATE_LIMITED") {
    return response.retryAfter
      ? `Demasiadas solicitudes. Inténtalo de nuevo en ${response.retryAfter} segundos.`
      : "Demasiadas solicitudes, inténtalo más tarde.";
  }

  return (
    response?.error ||
    response?.message ||
    "No se pudo enviar la solicitud, inténtalo más tarde"
  );
};

/** Error alert tweaks: keeps the destructive border visible and compact. */
const errorAlertClasses = "mt-1 border-destructive/30 px-3 py-2";

/**
 * Contact form card: request-type select, email and free-text request, plus
 * attachments (only for quotes). Presentation is built from `ui/` card parts
 * (header / content / footer) and form primitives; Formik + yup own the
 * validation and submission logic.
 *
 * Field names (`tipoSolicitud`, `correo`, `peticion`) and the POST payload
 * shape are the API contract with `/api/contacto` — rename those keys only
 * together with the endpoint, never as a UI tweak. Client-side validation
 * is UX-only: the server domain (`route.js` + `_lib/contact-dto.js` and
 * `_lib/contact-attachment-validation.js`)
 * is authoritative — keep the mirrored rules (correo/peticion/tipo) in sync
 * here, and do NOT share/import the server modules from this island.
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The card-wrapped contact form.
 */
export default function ContactForm() {
  const [requestType, setRequestType] = useState(-1);
  const [attachments, setAttachments] = useState(null);

  const requestTypeOptions = [
    { value: -1, texto: "Seleccione" },
    { value: 1, texto: "Información" },
    { value: 2, texto: "Cotización" },
  ];

  /**
   * Syncs the local `requestType` mirror (it drives the conditional
   * attachments field) and clears stale attachment state.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event Select change event.
   * @returns {void}
   */
  const handleRequestTypeChange = (event) => {
    setRequestType(event.target.value);
    setAttachments(null);
  };

  /**
   * Base64-encodes the picked files into the wire format expected by the
   * endpoint (see `convertFilesToAttachments` in `src/lib/attachments.js`).
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event File input change event.
   * @returns {Promise<void>}
   */
  const handleFiles = async (event) => {
    const files = event.target.files;

    const encodedAttachments = await convertFilesToAttachments(files);

    setAttachments(encodedAttachments);
  };

  /**
   * Submits the Formik values to the contact endpoint with toast feedback
   * (loading → success / failure), then resets the form on success.
   *
   * @param {Object} values Formik values (`tipoSolicitud`, `correo`, `peticion`).
   * @param {Object} actions Formik actions (only `resetForm` is used).
   * @returns {Promise<void>}
   */
  const handleSendEmail = async (values, actions) => {
    const selectedOption = requestTypeOptions.filter(
      (option) => option.value == values.tipoSolicitud,
    )[0];

    const timestamp = new Date().toLocaleString();

    const subject = `Tipo de Solicitud: ${selectedOption.texto} | ${timestamp}`;

    const body = {
      correo: values.correo,
      peticion: values.peticion,
      tipo: selectedOption.texto,
      fecha: timestamp,
    };

    const payload = {
      asunto: subject,
      cuerpo: body,
      adjuntos: attachments ?? null,
    };

    console.log(payload);

    const toastId = toast.loading("Enviando Solicitud...");

    try {
      const response = await sendContactRequest(payload);

      if (response.ok) {
        toast.success("Se ha enviado la solicitud correctamente", {
          id: toastId,
        });
        setRequestType(-1);
        actions.resetForm();
        return;
      }

      toast.error(getSendErrorMessage(response), { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo enviar la solicitud, inténtalo más tarde", {
        id: toastId,
      });
    }
  };

  const validationSchema = yup.object().shape({
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

  return (
    <Card className="gap-0 border-border shadow-md py-4 sm:py-6">
      {/* Card header — centered card title + supporting description (semantic h2/p via asChild) */}
      <CardHeader className="mb-6 text-center px-4 sm:px-6">
        <CardTitle
          asChild
          className="text-2xl font-bold text-foreground leading-tight"
        >
          <h2>Deja tu Información</h2>
        </CardTitle>
        <CardDescription asChild className="font-bold">
          <p>Nos pondremos en contacto con usted</p>
        </CardDescription>
      </CardHeader>
      {/* Card content — field grid (select, email, request text, conditional attachments) */}
      <Formik
        initialValues={{
          tipoSolicitud: 0,
          correo: "",
          peticion: "",
        }}
        onSubmit={(values, actions) => {
          handleSendEmail(values, actions);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <form id="contact-form" onSubmit={handleSubmit} noValidate>
            <CardContent className="px-4 sm:px-6">
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Request type select */}
                <div>
                  <Label htmlFor="tipoSolicitud" className="mb-1">
                    Tipo de Solicitud
                  </Label>
                  <Select
                    name="tipoSolicitud"
                    id="tipoSolicitud"
                    value={values.tipoSolicitud}
                    onChange={(e) => {
                      handleChange(e);
                      handleRequestTypeChange(e, values);
                    }}
                    aria-invalid={Boolean(
                      errors.tipoSolicitud && touched.tipoSolicitud,
                    )}
                    aria-describedby={
                      errors.tipoSolicitud && touched.tipoSolicitud
                        ? "tipoSolicitud-error"
                        : undefined
                    }
                  >
                    {requestTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.texto}
                      </option>
                    ))}
                  </Select>
                  {errors.tipoSolicitud && touched.tipoSolicitud && (
                    <Alert
                      id="tipoSolicitud-error"
                      variant="destructive"
                      className={errorAlertClasses}
                    >
                      <AlertDescription>
                        {errors.tipoSolicitud}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                {/* Email field */}
                <div>
                  <Label htmlFor="correo" className="mb-1">
                    Correo
                  </Label>
                  <Input
                    name="correo"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    id="correo"
                    placeholder="alguien@dominio.com"
                    value={values.correo}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.correo && touched.correo)}
                    aria-describedby={
                      errors.correo && touched.correo
                        ? "correo-error"
                        : undefined
                    }
                  />
                  {errors.correo && touched.correo && (
                    <Alert
                      id="correo-error"
                      variant="destructive"
                      className={errorAlertClasses}
                    >
                      <AlertDescription>{errors.correo}</AlertDescription>
                    </Alert>
                  )}
                </div>
                {/* Free-text request textarea */}
                <div className="md:col-span-2">
                  <Label htmlFor="peticion" className="mb-1">
                    Petición
                  </Label>
                  <Textarea
                    name="peticion"
                    id="peticion"
                    className="min-h-37.5"
                    placeholder="Información acerca de..."
                    value={values.peticion}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.peticion && touched.peticion)}
                    aria-describedby={
                      errors.peticion && touched.peticion
                        ? "peticion-error"
                        : undefined
                    }
                  ></Textarea>
                  {errors.peticion && touched.peticion && (
                    <Alert
                      id="peticion-error"
                      variant="destructive"
                      className={errorAlertClasses}
                    >
                      <AlertDescription>{errors.peticion}</AlertDescription>
                    </Alert>
                  )}
                </div>
                {/* Attachments — only visible for quote requests */}
                {requestType == 2 && (
                  <div className="md:col-span-2">
                    <Label htmlFor="archivos" className="mb-1">
                      Adjunte Archivos
                    </Label>
                    <Input
                      type="file"
                      name="archivos"
                      id="archivos"
                      multiple
                      onChange={async (e) => {
                        await handleFiles(e);
                      }}
                    ></Input>
                  </div>
                )}
              </div>
            </CardContent>
            {/* Card footer — live inside the form so the submit button stays a real submitter */}
            <CardFooter className="px-4 sm:px-6">
              <Button type="submit" variant="secondary" size="lg">
                Enviar
              </Button>
            </CardFooter>
          </form>
        )}
      </Formik>
    </Card>
  );
}

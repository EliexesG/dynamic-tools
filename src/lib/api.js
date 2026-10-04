export async function EnviarCorreo(data) {
  var respuesta = await fetch("/api/contacto", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  var json = {};

  try {
    json = await respuesta.json();
  } catch {
    json = {};
  }

  var retryAfterHeader = respuesta.headers.get("Retry-After");
  var retryAfter = Number(retryAfterHeader);

  return {
    ...json,
    ok: respuesta.ok,
    httpStatus: respuesta.status,
    retryAfter: Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : null,
  };
}

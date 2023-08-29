
export async function EnviarCorreo (data) {

    var respuesta = await fetch('/api/contacto', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })

    var json = await respuesta.json();
    console.log(json)
}
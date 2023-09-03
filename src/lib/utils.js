export async function ConvertirArchivosToAdjuntos(archivos) {
    
    var adjuntos = [];
    var tamanno = 0;

    for (var i = 0; i < archivos.length; i++) {

        const archivo = archivos[i];

        tamanno += archivo.size;

        const buffer = await archivo.arrayBuffer();

        let str = '';

        const bufferView = new Uint8Array(buffer);

        for (let i = 0; i < bufferView.length; i++) {
            str += String.fromCharCode(bufferView[i]);
        }

        const base64 = btoa(str);

        adjuntos.push({ filename: archivos[i].name, content: base64, encoding: 'base64' });

    }

    tamanno = tamanno / 1e+6;

    return adjuntos;
}
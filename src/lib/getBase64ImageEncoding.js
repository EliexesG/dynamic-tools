import { getPlaiceholder } from "plaiceholder";

export async function GetBase64ImageEncoding (src) {
    try {
        
        const res = await fetch(src);

        if(!res.ok) {
            throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)
        }

        const buffer = await res.arrayBuffer();

        const {base64} = await getPlaiceholder(Buffer.from(buffer));

        console.log(`base64: ${base64}`);

        return base64;
    }
    catch (err) {
        console.log(err);
    }
}
export default async function sitemap () {
    const baseURL = process.env.URL_BASE;

    return [
        {url: baseURL, lastModified: new Date()},
        {url: `${baseURL}/contactanos`, lastModified: new Date()},
        {url: `${baseURL}/maquinaria`, lastModified: new Date()},
        {url: `${baseURL}/nosotros`, lastModified: new Date()},
        {url: `${baseURL}/servicios`, lastModified: new Date()},
        {url: `${baseURL}/galeria`, lastModified: new Date()}
    ]
}
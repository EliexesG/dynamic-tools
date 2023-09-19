export default async function sitemap () {
    const baseUrl = "https://www.aymdynamictools.com";

    return [
        {url: baseUrl, lastModified: new Date()},
        {url: `${baseUrl}/contactanos`, lastModified: new Date()},
        {url: `${baseUrl}/maquinaria`, lastModified: new Date()},
        {url: `${baseUrl}/nosotros`, lastModified: new Date()},
        {url: `${baseUrl}/servicios`, lastModified: new Date()}
    ]
}
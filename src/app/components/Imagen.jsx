'use client'

import Image from "next/image";

export default function Imagen ({id, src, width, height, className, alt}) {

    return (
        <Image id={id} src={src} alt={alt} width={width} height={height} className={className} placeholder="blur" blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNU0lCqBwABzQDtAzswxwAAAABJRU5ErkJggg==" />
    );
}
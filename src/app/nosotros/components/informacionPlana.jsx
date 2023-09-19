import './informacionPlana.css'

export default function InformacionPlana ({id, titulo, descripcion, className}) {
    return (
            <section className={`mb-4 ${className}`}>
                <h2 id={id} className="text-center p-3 rounded bg-primary text-white fw-bold mb-4">{titulo}</h2>
                <article className='row'>
                    <div className='col-md-12 p-3'>
                        {descripcion.split('|').map((parrafo, index) => (
                            <p className={`${index === 0 ? "fw-bold text-center fs-5 border-bottom border-secondary" : "parrafo"}`} key={index}>{parrafo}</p>
                        ))}
                    </div>
                </article>
            </section>
    );
}
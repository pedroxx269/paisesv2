import './sobre.css'

const sobre = ({h2 , texto, texto2 }) =>{
    return(
     <div className='Sobre'>
       <h2>{h2}</h2>
        <p>{texto}</p> 
        <br />
        <p>{texto2}</p>
     </div> 
      

    )
}

export default sobre;
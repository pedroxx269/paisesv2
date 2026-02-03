import './cards.css'
import {Link } from 'react-router-dom';
import Lixeira from '../Lixeira';


const Cards = ({ nome, imagem, paragrafo, rota, remover }) => {

  return (
    <section className="Card">
      <div className="Foto">
        <img src={imagem} alt={nome} />
      </div>
      <h4>{nome}</h4>
      <p>{paragrafo}</p>
      <div className='botoes'>
      <Link to={rota} className="botao">Ver Mais</Link>
       <Lixeira onDelete={remover} />
       </div>
      
    </section>
  )
}

export default Cards;

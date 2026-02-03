import './cabecalho.css'
import dia from '../../imagens/day.png'
import noite from '../../imagens/night.png'




 const cabecalho = ({h1,  tema, setTema}) =>{

  const Alternar_claro_escuro =()=>{
    tema == 'dia'? setTema('noite'):setTema('dia')

  }
    return(
         <div className='cabecalho'>
          <h1>{h1}</h1> 
          <img  onClick={()=>{Alternar_claro_escuro()}}src={tema == 'dia' ?  noite : dia } alt="" className='alternancia'/>
          </div>
          
        
    )
}

export default cabecalho;
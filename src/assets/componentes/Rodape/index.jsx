import './rodape.css'
import git from '../../imagens/git.png'
import Insta from '../../imagens/insta.png'

const Rodape = () =>{

    return (        
    <>
    <p className='para'>Entre em contato comigo pelo git ou pelo Instagram</p>
    <a href="https://github.com/pedroxx269">
    <img src={git} alt="Github" />
    </a>
    <a href="https://www.instagram.com/pedro_zxrl/"><img src={Insta} alt="Instagram" /></a>
         
      </>
    )
}

export default Rodape
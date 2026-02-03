import { useState , useEffect } from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css'
import Cabecalho from './assets/componentes/Cabecalho'
import Sobre from './assets/componentes/Sobre/sobre'
import Cards from './assets/componentes/Cards'
import Conversor from './assets/componentes/Conversor'
import Rodape from './assets/componentes/Rodape'
import China from './assets/imagens/china.png'
import Brasil from './assets/imagens/Brasil.png'
import Estados from './assets/imagens/Estados.png'
import Italia from './assets/imagens/italia.png'
import Russia from './assets/imagens/russia.png'
import Reino_unido from './assets/imagens/reino.png'
import Info_Brasil from './assets/Pages/Pais_info/Info_Brasil'
import Info_China from './assets/Pages/Pais_info/Info_China'
import Info_Estados from './assets/Pages/Pais_info/Info_Estados-unidos'
import Info_Reino from './assets/Pages/Pais_info/Info_Reino'
import Info_Italia from './assets/Pages/Pais_info/Info_Italia'
import Info_Russia from './assets/Pages/Pais_info/Info_Russia'

function App() {
  const tema_atual = localStorage.getItem('tema_atual')
  const [tema, setTema] = useState(tema_atual? tema_atual : 'dia');
  const Moedas =[
    {
      moeda: 'BRL'
    },
    {
      moeda: 'USD'
    },
    {
     moeda: 'EUR'
    },
    {
     moeda: 'JPY'
    }
  ]
  
  const Paises = [
    {
      nome: 'Brasil',
      imagem: Brasil,
      rota: '/brasil'
    },
    {
      nome: 'Reino-Unido',
      imagem: Reino_unido,
      rota: '/inglaterra'
    },
    {
      nome:'Estados Unidos',
      imagem: Estados,
      rota: '/estados'
    },
    {
      nome: 'Russia',
      imagem: Russia,
      rota: '/russia'
    },
    {
      nome: 'Italia',
      imagem: Italia,
      rota: '/italia'
    },
    {
      nome: 'China',
      imagem: China,
      rota: '/china'
    },
  ];
  
  const removerPais = (nome) => {
  setPaisesState(prev => {
    const paisRemovido = prev.find(p => p.nome === nome)

    if (paisRemovido) {
      setPaisesRemovidos(old => [...old, paisRemovido])
    }

    return prev.filter(p => p.nome !== nome)
  })
}
const restaurarPaises = () => {
  setPaisesState(Paises)
  setPaisesRemovidos([])
}


const [paisesState, setPaisesState] = useState(Paises)
const [paisesRemovidos, setPaisesRemovidos] = useState([])



  useEffect(()=>{
   localStorage.setItem('tema_atual', tema);
  },[tema])

const [amount, setAmount] = useState(1)
const [moedaFrom, setMoedaFrom] = useState("BRL")
const [moedaTo, setMoedaTo] = useState("USD")
const [resultado, setResultado] = useState(0)

useEffect(() => {
  const controller = new AbortController()

  async function getValores() {
    if (amount <= 0) {
      setResultado(0)
      return
    }

    if (moedaFrom === moedaTo) {
      setResultado(amount)
      return
    }

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${moedaFrom}&to=${moedaTo}`,
        { signal: controller.signal }
      )
      const data = await res.json()
      setResultado(Number(data.rates[moedaTo].toFixed(2)))
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Erro ao converter moeda:", error)
      }
    }
  }

  getValores()
  return () => controller.abort()
}, [amount, moedaFrom, moedaTo])


  return (
  <>
    <Routes>
      <Route
        path="/"
        element={
          <div className={`container ${tema}`}>
            <nav>
              <Cabecalho
                h1="Explore o mundo 🌎"
                tema={tema}
                setTema={setTema}
                id='Inicio'
              />
            </nav>

            <div className="Cards">
              <h2>Paises e suas Informações</h2>

              {paisesRemovidos.length > 0 && (
  <button className="restaurar" onClick={restaurarPaises}>♻️ Restaurar países</button>)}

              {paisesState.map(pais => (

                <Cards
                  key={pais.nome}
                  nome={pais.nome}
                  imagem={pais.imagem}
                  rota={pais.rota}
                  paragrafo="Clique aqui para ver mais sobre o país"
                  id="Cards"
                  remover={() => removerPais(pais.nome)}
                />
              ))}
            </div>

            <div className="Sobre">
              <Sobre
                h2="Sobre o site"
                texto="Explore os Países é um aplicativo web interativo que permite visualizar informações geográficas de diferentes países de forma simples e intuitiva. Ao selecionar um país, o usuário tem acesso a dados como capital, população, área, idioma e curiosidades, todos obtidos por meio de uma API externa." texto2='O app também conta com um sistema de conversão de moeda em tempo real, facilitando a comparação entre a moeda local do país escolhido e o real brasileiro. Além disso, existe uma área de gerenciamento que permite excluir países da lista, tornando a experiência dinâmica e personalizável'
                id="Sobre"
              />
            </div>

            <Conversor
              amount={amount}
              setAmount={setAmount}
              moedaFrom={moedaFrom}
              setMoedaFrom={setMoedaFrom}
              moedaTo={moedaTo}
              setMoedaTo={setMoedaTo}
              resultado={resultado}
              moedas={Moedas}
            />

            <nav className="rodape">
              <Rodape />
            </nav>
          </div>
        }
      />

      
      <Route path="/brasil" element={<Info_Brasil />} />
      <Route path="/russia" element={<Info_Russia/>} />
      <Route path="/italia" element={<Info_Italia/>} />
      <Route path="/china" element={<Info_China/>} />
      <Route path="/estados" element={<Info_Estados/>} />
      <Route path="/inglaterra" element={<Info_Reino/>} /> 
    </Routes>
  </>
)

}

export default App

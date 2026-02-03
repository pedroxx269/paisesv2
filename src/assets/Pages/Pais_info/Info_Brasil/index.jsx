import { useState, useEffect } from 'react';
import './brasil.css'
const Info_Brasil = () => {
  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function buscarBrasil() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/name/brazil?fullText=true"
        );
        const data = await res.json();
        setPais(data[0]);
      } catch (error) {
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    buscarBrasil();
  }, []);

  if (loading) return <p>Carregando informações do Brasil...</p>;
  if (erro) return <p>Erro ao carregar dados.</p>;
  if (!pais) return null;

  return (
   <>
    
    <main className="Brasil">
      <h1>{pais.name.common}</h1>
      <h3>{pais.name.official}</h3>

      <p>Bandeira e Brasao do pais</p>
      <div className='imagens'><img src={pais.flags.svg} alt={`Bandeira do ${pais.name.common}`} className="bandeira" />
      {pais.coatOfArms?.svg && (
        <img src={pais.coatOfArms.svg} alt="Brasão do Brasil" className="brasao" />
      )}
</div>
      <div className="info">
    <p>O Brasil, nome official de <b>{pais.name.official}</b> e o maior país da <b>{pais.continents.join(", ")}</b>,tendo sua capital como <b>{pais.capital?.[0]}</b> sendo assim um dos maiores Países do mundo,seu tamanho e avaliado em <b>{pais.area.toLocaleString()} km²</b>.</p>   <br/> 
    <p>O Brasil por se um país tão grande assim ele tem regiões e sub regiões sendo elas <b>{pais.region}- {pais.subregion}</b>.O Brasil por outro lado tambem e o maior país do mundo inteiro a falar o idioma <b>{Object.values(pais.languages || {}).join(", ")}</b> e tambem sendo uma gigante nação de <b>{pais.population.toLocaleString()}</b> habitantes .</p> <br />
    <p>A moeda oficial do Brasil atualmente e <b>{" "} {Object.values(pais.currencies || {}) .map(m => `${m.name} (${m.symbol})`).join(", ")}</b>. Por ser um País muito grando, o Brasil se divide em fusios-horarios sendo eles <b>{pais.timezones.join(", ")}</b>, em 1822 o Dom Pedro I proclamou a independencia do brasil por tanto o Brasil segue Indepente  <b>{" "}{pais.independent ? "Sim" : "Não"}</b></p>      
         <br/>
    <p>Um fato curioso do Brasil e que o lado do carro e diferente sendo ele <b>{pais.car?.side}</b></p>
    
      
      
      </div>
    </main>
    <footer>
      <div className='pec'> <a href="http://localhost:5173/">Voltar</a></div>
    </footer>
    </>
  );
};
export default Info_Brasil;

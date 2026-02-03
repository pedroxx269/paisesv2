import { useState, useEffect } from 'react';
import './italia.css'
const Info_Italia = () => {
  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function buscarItalia() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/name/italy?fullText=true"
        );
        const data = await res.json();
        setPais(data[0]);
      } catch (error) {
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    buscarItalia();
  }, []);

  if (loading) return <p>Carregando informações do Italia...</p>;
  if (erro) return <p>Erro ao carregar dados.</p>;
  if (!pais) return null;

  return (
    <>
    <main className="Italia">
      <h1>{pais.name.common}</h1>
      <h3>{pais.name.official}</h3>
         <p>Bandeira e Brasão do país</p>
      <img src={pais.flags.svg} alt={`Bandeira do ${pais.name.common}`} className="bandeira" />
      {pais.coatOfArms?.svg && (
        <img src={pais.coatOfArms.svg} alt="Brasão do Italia" className="brasao" />
      )}

     
      
<div className="info">
  <p>
    A Itália, nome oficial de <b>{pais.name.official}</b>, está localizada na 
    <b> {pais.continents.join(", ")}</b>, tendo sua capital como 
    <b> {pais.capital?.[0]}</b>, com uma área de 
    <b> {pais.area.toLocaleString()} km²</b>.
  </p><br/>

  <p>
    Mesmo sendo um país menor, a Itália possui regiões e sub-regiões como 
    <b> {pais.region} - {pais.subregion}</b>. 
    O idioma oficial é 
    <b> {Object.values(pais.languages || {}).join(", ")}</b> 
    e sua população é de 
    <b> {pais.population.toLocaleString()}</b> habitantes.
  </p><br/>

  <p>
    A moeda oficial da Itália é 
    <b> {Object.values(pais.currencies || {})
      .map(m => `${m.name} (${m.symbol})`).join(", ")}</b>, 
    e o país é independente? <b>{pais.independent ? "Sim" : "Não"}</b>
  </p><br/>

  <p>
    Um fato curioso da Itália é que o lado de condução dos veículos é pela 
    <b> {pais.car?.side}</b>.
  </p>
</div>
    </main>
  <footer>
      <div className='pe'> <a href="http://localhost:5173/">Voltar</a></div>
    </footer>

    </>
  );
};
 export default Info_Italia;
import { useState, useEffect } from 'react';
import './Reino.css'
const Info_Reino = () => {
  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function buscarReino() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/name/United%20Kingdom?fullText=true"
        );
        const data = await res.json();
        setPais(data[0]);
      } catch (error) {
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    buscarReino();
  }, []);

  if (loading) return <p>Carregando informações do Reino-unido...</p>;
  if (erro) return <p>Erro ao carregar dados.</p>;
  if (!pais) return null;

  return (
    <>
    <main className="Inglaterra">
      <h1>{pais.name.common}</h1>
      <h3>{pais.name.official}</h3>
        <p>Bandeira e Brasão do país</p>
      <img src={pais.flags.svg} alt={`Bandeira do ${pais.name.common}`} className="bandeira" />
      {pais.coatOfArms?.svg && (
        <img src={pais.coatOfArms.svg} alt="Brasão do Reino-unido" className="brasao" />
      )}

      
       <div className="info">
  <p>
    O Reino-unido faz parte do <b>{pais.name.official}</b>, localizado na 
    <b> {pais.continents.join(", ")}</b>, tendo sua capital como 
    <b> {pais.capital?.[0]}</b>, com uma área de 
    <b> {pais.area.toLocaleString()} km²</b>.
  </p><br/>

  <p>
    O país pertence à região 
    <b> {pais.region} - {pais.subregion}</b>, 
    tendo como idioma principal 
    <b> {Object.values(pais.languages || {}).join(", ")}</b> 
    e uma população de 
    <b> {pais.population.toLocaleString()}</b> habitantes.
  </p><br/>

  <p>
    A moeda utilizada é 
    <b> {Object.values(pais.currencies || {})
      .map(m => `${m.name} (${m.symbol})`).join(", ")}</b>, 
    e o país é independente? <b>{pais.independent ? "Sim" : "Não"}</b>
  </p><br/>

  <p>
    Um fato curioso da Reino-unido é que o lado de condução dos veículos é pela 
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
export default Info_Reino;
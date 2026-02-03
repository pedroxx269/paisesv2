import { useState, useEffect } from 'react';
import './estados.css'
const Info_Estados = () => {
  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function buscarEua() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/name/United%20States?fullText=true"
        );
        const data = await res.json();
        setPais(data[0]);
      } catch (error) {
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    buscarEua();
  }, []);

  if (loading) return <p>Carregando informações do Eua...</p>;
  if (erro) return <p>Erro ao carregar dados.</p>;
  if (!pais) return null;

  return (
    <>
    <main className="Eua">
      <h1>{pais.name.common}</h1>
      <h3>{pais.name.official}</h3>
          <p>Bandeira e Brasão do país</p>
      <img src={pais.flags.svg} alt={`Bandeira do ${pais.name.common}`} className="bandeira" />
      {pais.coatOfArms?.svg && (
        <img src={pais.coatOfArms.svg} alt="Brasão do Eua" className="brasao" />
      )}

      <div className="info">
  <p>
    Os Estados Unidos da América, nome oficial de <b>{pais.name.official}</b>, são um dos maiores países da 
    <b> {pais.continents.join(", ")}</b>, tendo sua capital como 
    <b> {pais.capital?.[0]}</b>, com uma área total de 
    <b> {pais.area.toLocaleString()} km²</b>.
  </p><br/>
  <p>
    Por ser um país de grande extensão, os EUA possuem regiões e sub-regiões como 
    <b> {pais.region} - {pais.subregion}</b>. 
    O idioma predominante é 
    <b> {Object.values(pais.languages || {}).join(", ")}</b>, 
    e sua população ultrapassa 
    <b> {pais.population.toLocaleString()}</b> habitantes.
  </p><br/>
  <p>
    A moeda oficial dos Estados Unidos é 
    <b> {Object.values(pais.currencies || {})
      .map(m => `${m.name} (${m.symbol})`).join(", ")}</b>. 
    O país possui vários fusos horários, sendo eles 
    <b> {pais.timezones.join(", ")}</b>, 
    e é um país independente? <b>{pais.independent ? "Sim" : "Não"}</b>
  </p><br/>
  <p>
    Um fato curioso dos EUA é que o lado de condução dos veículos é pela 
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
export default Info_Estados;
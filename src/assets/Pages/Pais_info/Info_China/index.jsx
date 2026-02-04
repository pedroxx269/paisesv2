import { useState, useEffect } from 'react';
import './china.css'
const Info_China = () => {
  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function buscarChina() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/name/china?fullText=true"
        );
        const data = await res.json();
        setPais(data[0]);
      } catch (error) {
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    buscarChina();
  }, []);

  if (loading) return <p>Carregando informações do Brasil...</p>;
  if (erro) return <p>Erro ao carregar dados.</p>;
  if (!pais) return null;

  return (
   <>
   <main className="China">
      <h1>{pais.name.common}</h1>
      <h3>{pais.name.official}</h3>
       <p>Bandeira e Brasão do país</p>
      <div className='imagens'><img src={pais.flags.svg} alt={`Bandeira do ${pais.name.common}`} className="bandeira" />
      {pais.coatOfArms?.svg && (
        <img src={pais.coatOfArms.svg} alt="Brasão do Brasil" className="brasao" />
      )}
</div>
      

      <div className="info">
  <p>
    A China, nome oficial de <b>{pais.name.official}</b>, é o maior país da <b> {pais.continents.join(", ")}</b>,  e o segundo país mais populoso do mundo tendo  <b> {pais.population.toLocaleString()}</b> habitantes.
    tendo sua capital como 
    <b> {pais.capital?.[0]}</b>, a China tem seu tamanho avaliado em <b>{pais.area.toLocaleString()} km²</b>.
  </p><br/>

  <p>
    A China, por ser um país muito grande, possui regiões e sub-regiões, sendo elas 
    <b> {pais.region} - {pais.subregion}</b>. 
    O país também possui como idioma  próprio e oficial sendo ele o 
    <b> {Object.values(pais.languages || {}).join(", ")}</b> 
  </p><br/>

  <p>
    A moeda oficial da China atualmente é 
    <b> {Object.values(pais.currencies || {})
      .map(m => `${m.name} (${m.symbol})`).join(", ")}</b>. 
    Devido a seu grande tamanho territorial, a China possui diferentes fusos horários, como 
    <b> {pais.timezones.join(", ")}</b>. 
    O país segue independente <b>{pais.independent ? "Sim" : "Não"}</b>
  </p><br/>

  <p>
    Um fato curioso da China é que o lado de condução dos veículos é pela 
    <b> {pais.car?.side}</b>.
  </p>
</div>

    </main>
    <footer>
      <div className='pec'> <a href="https://paisesv2.vercel.app/">Voltar</a></div>
    </footer></>
  );
};
export default Info_China;

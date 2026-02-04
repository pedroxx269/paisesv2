import { useEffect, useState } from "react";
import './russia.css'

const Info_Russia = () => {
  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function buscarRussia() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/name/russia?fullText=true"
        );
        const data = await res.json();
        setPais(data[0]);
      } catch (error) {
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    buscarRussia();
  }, []);

  if (loading) return <p>Carregando informações do Russia...</p>;
  if (erro) return <p>Erro ao carregar dados.</p>;
  if (!pais) return null;

  return (
    <>
    <main className="Russia">
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
    A Rússia, nome oficial de <b>{pais.name.official}</b>, é o maior país do mundo e está localizada entre a 
    <b> {pais.continents.join(", ")}</b>, tendo sua capital como 
    <b> {pais.capital?.[0]}</b>, Russia por ser o maior país do mundo esta avaliada em 
    <b> {pais.area.toLocaleString()} km²</b>.
  </p><br/>

  <p>
    Devido ao seu enorme território, a Rússia possui regiões e sub-regiões como 
    <b> {pais.region} - {pais.subregion}</b>. 
    O idioma oficial do país é 
    <b> {Object.values(pais.languages || {}).join(", ")}</b> 
    e sua população é de aproximadamente 
    <b> {pais.population.toLocaleString()}</b> habitantes.
  </p><br/>

  <p>
    A moeda oficial da Rússia é 
    <b> {Object.values(pais.currencies || {})
      .map(m => `${m.name} (${m.symbol})`).join(", ")}</b>. 
    O país por ser imenso possui diversos fusos horários, sendo eles 
    <b> {pais.timezones.join(", ")}</b>, 
    e é independente? <b>{pais.independent ? "Sim" : "Não"}</b>
  </p><br/>

  <p>
    Um fato curioso da Rússia é que o lado de condução dos veículos é pela 
    <b> {pais.car?.side}</b>.
  </p>
</div>
    </main>
     <footer>
      <div className='pec'> <a href="http://localhost:5173/">Voltar</a></div>
    </footer>
    </>
  );
};

export default Info_Russia;

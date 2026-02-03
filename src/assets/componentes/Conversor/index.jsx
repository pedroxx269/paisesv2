import './Conversor.css'

const Conversor = ({
  amount,
  setAmount,
  moedaFrom,
  setMoedaFrom,
  moedaTo,
  setMoedaTo,
  resultado,
  moedas
}) => {

  return (
    <div className="conversor">
      <h1>Conversor</h1>

      <input
        type="number"
        min="0"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
      />

      <select
        value={moedaFrom}
        onChange={e => setMoedaFrom(e.target.value)}
      >
        {moedas.map(m => (
          <option key={`from-${m.moeda}`} value={m.moeda}>
            {m.moeda}
          </option>
        ))}
      </select>

      <select
        value={moedaTo}
        onChange={e => setMoedaTo(e.target.value)}
      >
        {moedas.map(m => (
          <option key={`to-${m.moeda}`} value={m.moeda}>
            {m.moeda}
          </option>
        ))}
      </select>
     <p className="resultado"> {amount} {moedaFrom} = <strong>{resultado}</strong> {moedaTo} </p>
    </div>
  )
}

export default Conversor

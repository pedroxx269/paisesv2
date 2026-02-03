import './lixeira.css'
const Lixeira = ({ onDelete }) => {
  return (
    <button
      className="lixeira"
      onClick={onDelete}
      title="Remover item"
    >
      <span>Remover</span>

      
    </button>
  )
}

export default Lixeira

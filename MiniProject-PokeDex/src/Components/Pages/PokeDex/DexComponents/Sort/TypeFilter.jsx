import PropTypes from 'prop-types'

export const TypeFilter = ({ 
    selectedType='', 
    setSelectedType='' 
}) => {
  const types = [
    { value: '', label: 'All Types' },
    { value: 'bug', label: 'Bug' },
    { value: 'dark', label: 'Dark' },
    { value: 'dragon', label: 'Dragon' },
    { value: 'electric', label: 'Electric' },
    { value: 'fairy', label: 'Fairy' },
    { value: 'fighting', label: 'Fighting' },
    { value: 'fire', label: 'Fire' },
    { value: 'flying', label: 'Flying' },
    { value: 'ghost', label: 'Ghost' },
    { value: 'grass', label: 'Grass' },
    { value: 'ground', label: 'Ground' },
    { value: 'ice', label: 'Ice' },
    { value: 'normal', label: 'Normal' },
    { value: 'poison', label: 'Poison' },
    { value: 'psychic', label: 'Psychic' },
    { value: 'rock', label: 'Rock' },
    { value: 'water', label: 'Water' },
  ]

  return (
    <div className="section">
      <label htmlFor="type-select">Type:</label>
      <select
        id="type-select"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {types.map(type => (
          <option key={type.value} value={type.value}>{type.label}</option>
        ))}
      </select>
    </div>
  )
}

TypeFilter.propTypes = {
  selectedType: PropTypes.string.isRequired,
  setSelectedType: PropTypes.func.isRequired,
}

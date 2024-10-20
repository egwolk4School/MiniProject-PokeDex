
import PropTypes from 'prop-types'

export const RegionFilter = ({ 
    selectedRegion='', 
    setSelectedRegion='' 
}) => {
  const regions = [
    { value: '', label: 'All Regions' },
    { value: 'Kanto', label: 'Kanto' },
    { value: 'Johto', label: 'Johto' },
    { value: 'Hoenn', label: 'Hoenn' },
    { value: 'Sinnoh', label: 'Sinnoh' },
    { value: 'Unova', label: 'Unova' },
    { value: 'Kalos', label: 'Kalos' },
    { value: 'Alola', label: 'Alola' },
    { value: 'Galar', label: 'Galar' },
    { value: 'Hisui', label: 'Hisui' },
    { value: 'Paldea', label: 'Paldea' },
    { value: 'Kitakami', label: 'Kitakami' },
    { value: 'Unknown', label: 'Unknown' },
  ]

  return (
    <div className="section">
      <label htmlFor="region-select">Region:</label>
      <select
        id="region-select"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        {regions.map(region => (
          <option key={region.value} value={region.value}>{region.label}</option>
        ))}
      </select>
    </div>
  )
}

RegionFilter.propTypes = {
  selectedRegion: PropTypes.string.isRequired,
  setSelectedRegion: PropTypes.func.isRequired,
}



import PropTypes from 'prop-types'
export const Search = ({
    search='',
    setSearch='',
    fetchData=null
}) => {
    const handleSearch = () => {
        fetchData(search)
      }
      
  return (
    <>
    <input 
    type="text"
    placeholder='Search Pokemon'
    value={search}
    onChange={(e) => setSearch(e.target.value)} 
    onKeyDown={handleSearch}
    />
    
    </>
  )
}
Search.propTypes={
    search:PropTypes.string,
    setSearch:PropTypes.func,
    fetchData:PropTypes.func
}

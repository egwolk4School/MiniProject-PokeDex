import { Cards, Pagination, Search, fetchPokemonData, RegionFilter, TypeFilter } from "../DexComponents"
import './Dex.css'
import { useDebounce } from 'use-debounce'
import { useState, useEffect, useCallback, useMemo } from "react"
import axios from 'axios'
import logo from '../../../../assets/loading.gif'

export const Dex = () => {
  useEffect(()=>{
    document.title='PokeDex | Home'
},[])
  const [allPokemon, setAllPokemon] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(75)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')

  const fetchData = useCallback(async () => {
    const controller = new AbortController()
    setLoading(true)
    try {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=10277` 
      const res = await axios.get(url, { signal: controller.signal })

      if (res.status < 200 || res.status > 299) {
        throw new Error("Could not fetch resource")
      }

      const pokemonData = await fetchPokemonData(res.data.results)
      setAllPokemon(pokemonData)
      setFilteredPokemon(pokemonData)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled: ", error.message)
      } else {
        console.error("Error fetching data: ", error)
        setMessage('Error fetching Pokémon data. Please try again later.')
      }
    } finally {
      setLoading(false)
    }

    return () => controller.abort()
  }, [])

  useEffect(() => {
    fetchData() 
  }, [fetchData])

  const handleSearchClick = () => {
    applyFilters() 
  }

  const [debouncedSearch] = useDebounce(search, 300)
  const applyFilters = useCallback(() => {
    let filtered = allPokemon

    if (selectedRegion) {
      filtered = filtered.filter(p => p.region === selectedRegion)
    }

    if (selectedType) {
      filtered = filtered.filter(p => p.type.includes(selectedType))
    }

    if (debouncedSearch) {
      const searchValue = debouncedSearch.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchValue) || 
        p.id.toString()=== searchValue 
      )
    }

    if (filtered.length === 0) {
      setMessage('No Pokémon found')
    } else {
      setMessage('')
    }

    setFilteredPokemon(filtered)
    setCurrentPage(1)
  }, [selectedRegion, selectedType, allPokemon, debouncedSearch])

  useEffect(() => {
    applyFilters() 
  }, [selectedRegion, selectedType, debouncedSearch, allPokemon, applyFilters])

  const indexOfLastPokemon = currentPage * itemsPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage
  const currentPokemon = useMemo(() => filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon), [filteredPokemon, indexOfFirstPokemon, indexOfLastPokemon])
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage)

  return (
    <>
      <div className="section">
        <Search
          search={search}
          setSearch={setSearch}
          onSearchClick={handleSearchClick} 
        />
      </div>
      <div className="filterz">
      <RegionFilter
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
      <TypeFilter
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      </div>
      <div className="section">
        {loading ? (
          <div className="pokeMsg"><img src={logo} alt="" /></div>
        ) : currentPokemon.length > 0 ? (
          <div className="cardsAll">
            <Cards pokemon={currentPokemon} />
          </div>
        ) : (
          <div className="pokeMsg">{message}</div>
        )}
      </div>
      <div className="section">
        {!loading && message === '' && currentPokemon.length > 0 && totalPages && (
          <Pagination
            current={currentPage}
            totalItems={filteredPokemon.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  )
}

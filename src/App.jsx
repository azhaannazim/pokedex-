import { useState } from 'react'
import { Header } from './component/Header'
import { PokeCard } from './component/PokeCard'
import { SideNav} from './component/SideNav'
 
function App() {
  const [selectedPokemon , setSelectedPokemon] = useState(0)
  const [showSideMenu , setShowSideMenu] = useState(true)
  function ToggleMenu(){
    setShowSideMenu(!showSideMenu);
  }
  function CloseMenu(){
    setShowSideMenu(false);
  }
  return (
    <>
      <Header ToggleMenu={ToggleMenu}/>
      <SideNav 
        selectedPokemon={selectedPokemon} 
        setSelectedPokemon={setSelectedPokemon} 
        showSideMenu={showSideMenu}
        ToggleMenu={ToggleMenu}
      />
      <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}

export default App

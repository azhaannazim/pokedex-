import { useState } from 'react';
import { getFullPokedexNumber } from '../utils';
import { first151Pokemon } from '../utils';

export function SideNav(props) {
    const { selectedPokemon, setSelectedPokemon ,showSideMenu,
        ToggleMenu } = props;

    const [searchValue, setSearchValue] = useState('');

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        if (getFullPokedexNumber(eleIndex).toString().includes(searchValue)) {
            return true;
        }
        if (ele.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    });

    return (
        <nav className={' ' + (!showSideMenu ? ' open' : '' )}>
            <div className={'header ' + (!showSideMenu ? ' open' : '' )}>
                <button onClick={ToggleMenu} className='open-nav-button'>
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className="text-gradient">Pokedex</h1>
            </div>
            <input
                placeholder='Eg. 001 or Bulba...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            {filteredPokemon.map((pokemon, pokemonIndex) => {
                const trueIndex = first151Pokemon.indexOf(pokemon)
                return (
                    <button
                        onClick={() => {
                            setSelectedPokemon(trueIndex)
                            ToggleMenu()
                        }}
                        key={pokemonIndex}
                        className={
                            'nav-card ' +
                            (pokemonIndex === selectedPokemon
                                ? 'nav-card-selected'
                                : '')
                        }
                    >
                        <p>{getFullPokedexNumber(trueIndex)}</p>
                        <p>{pokemon}</p>
                    </button>
                );
            })}
        </nav>
    );
}

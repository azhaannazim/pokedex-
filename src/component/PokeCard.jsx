import { useEffect, useState } from "react";
import { getFullPokedexNumber , getPokedexNumber } from '../utils'
import {TypeCard} from "./TypeCard"
import { Modal } from "./Modal";

export function PokeCard(props){
    const {selectedPokemon} = props;
    const [data , setData] = useState(null)
    const [loading , setLoading] = useState(false)
    const [skill , setSkill] = useState(null)
    const [loadingSkill , setLoadingSkill] = useState(false)

    const {name , height ,abilities , stats , types , moves , sprites} = data || {}

    const imgList = Object.keys(sprites || {}).filter(key => {
        if(!sprites[key]){ return false; }
        if(['versions','other'].includes(key)){ return false; }
        return true;
    })

    async function fetchMoveData(move , moveUrl){
        if(loadingSkill || !localStorage || !moveUrl){ return false; }

        let c = {}
        if(localStorage.getItem('pokemon-moves')){
            c = JSON.parse(localStorage.getItem('pokemon-moves'));
        }

        if(move in c){
            setSkill(c[move]);
            console.log("move data found in cache");
            return;
        }
        try {
            setLoadingSkill(true)
            const res = await fetch(moveUrl)
            const moveData = await res.json();
            console.log("fecthed move data");
            const description = moveData?.flavor_text_entries.filter(
                val => {
                    return val.version_group.name = 'firered-leafgreen'
                }
            )[0].flavor_text

            const skillData = {
                name : move,
                description : description
            }
            setSkill(skillData)
            c[move] = skillData
            localStorage.setItem('pokemon-moves', JSON.stringify(c))

        } catch (error) {
            console.error(error.message);
        }finally{
            setLoadingSkill(false);
        }
    }
    
    
    useEffect(() => {
        if(loading || !localStorage){ return; }

        let cache = {}
        if(localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }
        if(selectedPokemon in cache){
            setData(cache[selectedPokemon]);
            console.log("pokemon data found in cache");
            return;
        }
        async function fetchPokemonData(){
            setLoading(true);
            try {
                const basedURL = 'https://pokeapi.co/api/v2/'
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon);
                const finalURL = basedURL + suffix
                const res = await fetch(finalURL)
                const pokemonData = await res.json()
                
                setData(pokemonData)
                console.log("pokemon data fetched successfully");
                
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex',JSON.stringify(cache))
                
            } catch (error) {
                localStorage.removeItem('pokedex');
                console.error(error.message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchPokemonData();
    } , [loading , selectedPokemon]);

    if(loading || !data){
        return(
            <div>
                <h4>loading...</h4>
            </div>
        )
    }

    return (
        <div className="poke-card"> 
            {/* conditional redering  */}
            {skill && (
                <Modal CloseModal={() => { setSkill(null) }}>
                    <div>
                        <h6>Name</h6>
                        <h2 className="skill-name">{skill.name.replaceAll('-',' ')}</h2>
                    </div>
                    <div>
                        <h6>description</h6>
                        <p>{skill.description.replaceAll('-',' ')}</p>
                    </div>
                </Modal>
            )}
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div>
                {types?.map((typeObj , typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={typeObj?.type?.name}/>
                    )
                })}
            </div>
            <img className="default-img" src={'/pokemon/' 
            + getFullPokedexNumber(selectedPokemon) + '.png'}
            alt={`${name}-large-img`} />
            <div className="img-container">
                {imgList.map((spriteUrl , spriteIndex) => {
                    const imgUrl = sprites[spriteUrl]
                    return (
                        <img key={spriteIndex} src={imgUrl}
                        alt={`${name}-img-${spriteUrl}`} />
                    )
                })}
            </div>
            <h3>stats</h3>
            <div className="stats-card">
                {stats.map((statObject , statIndex) => {
                    const {base_stat , stat} = statObject
                    return (
                        <div key={statIndex} className="stat-item">
                            <p>{stat?.name.replaceAll('-',' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <h3>Moves</h3>
            <div className="pokemon-move-grid">
                {moves.map((moveObj , moveIndex) => {
                    return(
                        <button className="button-card pokemon-move"
                        key={moveIndex} onClick={() => {
                            fetchMoveData(moveObj?.move?.name ,
                                moveObj?.move?.url)
                         }}>
                            <p>{moveObj?.move?.name.replaceAll('-',' ')}</p>
                        </button>
                    )
                })}
            </div>
        </div>
        
    )
}
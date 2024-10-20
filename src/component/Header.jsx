export function Header(props){
    const { ToggleMenu} = props;
    return (
        <header>
            <button onClick={ToggleMenu} className="open-nav-button">
                <i className="fa-solid fa-bars"></i>
                <h1 className="text-gradient">Pokedex</h1>
            </button>
        </header>
    )
}
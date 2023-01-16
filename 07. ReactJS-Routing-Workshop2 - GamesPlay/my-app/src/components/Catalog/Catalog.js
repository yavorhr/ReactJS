import { CatalogGame } from "./CatalogGame.js";


export const Catalog = ({
    games
}) => {
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
    
            {games.length > 0
                ? games.map(game => <CatalogGame game={game} key={game._id}></CatalogGame>)
                : <h3 className="no-articles">No articles yet</h3>}
        </section>
    );
}
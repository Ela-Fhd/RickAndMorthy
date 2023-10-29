import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar, { Favorites, Search, SearchResult } from "./Navbar/Navbar";
import CharacterList from "./Body/CharacterList/CharacterList";
import CharacterDetaile from "./Body/CharacterDetail/CharacterDetaile";
import "./Main.css";
import useCharacters from "../../hooks/useCharacters";
import useLocalStorage from "../../hooks/useLocalStorage";

function Main() {
  const [characterId, setCharacterId] = useState(null);
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [offsetTopCharacter, setOffsetTopCharacter] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("Favorites", []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((result) => {
  //       if (!result.ok) throw new Error("somthing went wrong");
  //       return result.json();
  //     })
  //     .then((data) => {
  //       setCharacters(data.results.slice(0, 4));
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get("https://rickandmortyapi.com/api/character")
  //     .then(({ data }) => {
  //       // console.log(data);
  //       setCharacters(data.results.slice(0, 4));
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  //example clean up function =>
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const timer = setInterval(() => setCount((c) => c + 1), 1000);
  //   // return anonymous function
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [count]);

  // useEffect(()=>{
  //   async function fetchData (){
  //     try{
  //       setIsLoading(true)
  //       const result = await fetch("https://rickandmortyapi.com/api/character")
  //       if(!result.ok) throw new Error("something went wrong")
  //       const data = await result.json()
  //       setCharacters(data.results.slice(0,4))
  //     }
  //     catch (err){
  //       toast.error(err.message)
  //     }
  //     finally{
  //       setIsLoading(false)
  //     }
  //   }
  //   fetchData()
  // } ,[])

  const onSelectCharacter = (id) => {
    setCharacterId((prevId) => (prevId === id ? "null" : id));
  };

  const getOffsetTop = (e) => {
    const elem = e.target;
    const rect = elem.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;
    const absoluteY = scrollTop + rect.top - 10;
    setOffsetTopCharacter(absoluteY);
  };

  const hanleAddFavorite = (favoritesChar) => {
    setFavorites((prevFav) => [...prevFav, favoritesChar]);
  };

  const isAddToFaves = favorites.map((faves) => faves.id).includes(characterId);

  const onDeleteFavorite = (id) => {
    setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  return (
    <div className="main">
      {/*counter => <div style={{ color: "white" }}>{count}</div> */}
      <Toaster />
      <div className="main-nav">
        <Navbar>
          <Search query={query} setQuery={setQuery} />
          <SearchResult numOfCharacters={characters.length} />
          <Favorites
            favorites={favorites}
            onDeleteFavorite={onDeleteFavorite}
          />
        </Navbar>
      </div>

      <div className="main-body">
        <CharacterList
          characterId={characterId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={onSelectCharacter}
          getOffsetTop={getOffsetTop}
        />
        <CharacterDetaile
          characterId={characterId}
          offsetTopCharacter={offsetTopCharacter}
          onAddFavorite={hanleAddFavorite}
          isAddToFaves={isAddToFaves}
        />
      </div>
    </div>
  );
}

export default Main;

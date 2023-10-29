import "./Navbar.css";
import { HiOutlineHeart } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";
import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import { Character } from "../Body/CharacterList/CharacterList";

function Navbar({ children }) {
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <h3>rick and morty</h3>
        </div>
        {children}
      </div>
    </>
  );
}

export default Navbar;

export function Search({ query, setQuery }) {
  return (
    <div className="navbar-search">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
}

export function SearchResult({ numOfCharacters }) {
  return (
    <div className="navbar-result">
      <span>Found {numOfCharacters} Characters</span>
    </div>
  );
}

export function Favorites({ favorites, onDeleteFavorite }) {
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showFavorites ? "hidden" : "auto";
  }, [showFavorites]);

  return (
    <>
      <Modal
        setShowFavorites={setShowFavorites}
        showFavorites={showFavorites}
        favorites={favorites}
        title="list of favorites"
      >
        {favorites.map((favorite) => {
          return (
            <Character
              key={favorite.id}
              character={favorite}
              onSelectCharacter={() => {}}
              getOffsetTop={() => {}}
            >
              <button
                className="delete-fav-character"
                onClick={() => onDeleteFavorite(favorite.id)}
              >
                <BsTrash />
              </button>
            </Character>
          );
        })}
      </Modal>

      <button
        className="navbar-favorite"
        onClick={() => setShowFavorites(true)}
      >
        <HiOutlineHeart className="heart-icon red" />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
}

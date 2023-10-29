import "./CharacterList.css";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FcBusinesswoman } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import Loading from "../../Loading/Loading";

function CharacterList({
  characters,
  isLoading,
  onSelectCharacter,
  characterId,
  getOffsetTop,
}) {
  if (isLoading) {
    return (
      <div className="character-list">
        <Loading />
      </div>
    );
  }

  return (
    <div className="character-list">
      {characters.map((character) => {
        return (
          <Character
            character={character}
            key={character.id}
            onSelectCharacter={onSelectCharacter}
            getOffsetTop={getOffsetTop}
          >
            <button className="character-action">
              {characterId === character.id ? (
                <HiOutlineEyeOff className="eye-icon red" />
              ) : (
                <HiOutlineEye className="eye-icon red" />
              )}
            </button>
          </Character>
        );
      })}
    </div>
  );
}

export default CharacterList;

export function Character({
  character,
  onSelectCharacter,
  getOffsetTop,
  children,
}) {
  return (
    <div
      className="character"
      onClick={(e) => {
        onSelectCharacter(character.id);
        getOffsetTop(e);
      }}
    >
      <div className="character-detail">
        <img
          className="character-image"
          src={character.image}
          alt={character.name}
        />
        <div className="character-info">
          <h4 className="character-name">
            {" "}
            {character.gender === "Male" ? (
              <FcManager />
            ) : (
              <FcBusinesswoman />
            )}{" "}
            {character.name}
          </h4>
          <div
            className={`status ${character.status === "Dead" ? "bgred" : ""}`}
          >
            {character.status} - {character.species}{" "}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

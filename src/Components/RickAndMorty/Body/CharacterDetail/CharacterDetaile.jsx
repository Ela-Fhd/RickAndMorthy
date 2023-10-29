import "./CharacterDetaile.css";
// import { character } from "./../../Data/Data.js";
// import { episodes } from "./../../Data/Data.js";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FcBusinesswoman } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Loading/Loading";
import toast, { Toaster } from "react-hot-toast";
import { animateScroll } from "react-scroll";

function CharacterDetaile({
  characterId,
  offsetTopCharacter,
  onAddFavorite,
  isAddToFaves,
}) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function getCharacterDetail() {
      try {
        setIsLoading(true);
        setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        setCharacter(data);
        const episodeId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        setEpisodes([episodeData].flat());
        if (window.innerWidth >= 800)
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });

        if (window.innerWidth < 800) {
          const options = {
            duration: 500,
            smooth: true,
            containerId: "character-detaile",
          };
          animateScroll.scrollToBottom(options);
        }
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (characterId) getCharacterDetail();
  }, [characterId]);

  if (!character || !characterId)
    return (
      <div className="character-detaile">
        <h4 style={{ color: "#fff", textAlign: "center" }}>
          Please Select a Character...
        </h4>
      </div>
    );

  if (isLoading) return <Loading />;

  const scrollHandler = () => {
    window.scrollTo({
      top: offsetTopCharacter,
      behavior: "smooth",
    });
  };

  return (
    <div className="character-detaile" id="character-detaile">
      <CharacterInfo
        character={character}
        isAddToFaves={isAddToFaves}
        onAddFavorite={onAddFavorite}
        scrollHandler={scrollHandler}
      />
      <Episodes episodes={episodes} />
    </div>
  );
}

export default CharacterDetaile;

function CharacterInfo({
  character,
  isAddToFaves,
  onAddFavorite,
  scrollHandler,
}) {
  return (
    <div className="character-detaile-item">
      <img
        src={character.image}
        alt={character.name}
        className="character-detaile-image"
      />
      <div className="character-detaile-info">
        <h3>
          {character.gender === "Male" ? <FcManager /> : <FcBusinesswoman />}
          {character.name}
        </h3>
        <div className={`status ${character.status === "Dead" ? "bgred" : ""}`}>
          <span>{character.status}&nbsp;</span>-
          <span>&nbsp;{character.species} </span>
        </div>
        <div className="character-location">
          <span className="last-location">Last Known Location : </span>
          <h4>{character.location.name}</h4>
        </div>
        <div className="control-btns">
          {isAddToFaves ? (
            <p className="isAddToFave">
              Already Added To Favorite
              <AiOutlineCheckCircle className="fave-icon" />
            </p>
          ) : (
            <button
              className="add-to-favorite"
              onClick={() => onAddFavorite(character)}
            >
              <strong>Add to Favorite</strong>
            </button>
          )}
          <button className="go-to-character" onClick={scrollHandler}>
            <strong>Go to Character</strong>
            <BsFillArrowDownCircleFill className="go-to-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Episodes({ episodes }) {
  //first ascending --> true
  // decending --> false
  const [sortBy, setSortBy] = useState(false);
  // console.log(sortBy);

  let sortedEpisodes;
  if (sortBy) {
    //sort ascending
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    //sort descending
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  // console.log(sortedEpisodes);
  // console.log(new Date(episodes[0].created));

  return (
    <div className="episode-list">
      <div className="episode-list-header">
        <h3>List of Episode : </h3>
        <button
          className="sort-episodes"
          onClick={() => setSortBy((is) => !is)}
        >
          <BsFillArrowDownCircleFill className="arrow-down-icon" />
        </button>
      </div>
      <div className="episode-list-footer">
        {sortedEpisodes.map((episode, index) => (
          <div className="episode-item" key={index}>
            <li className="episode-name">
              <span className="episode-number">
                {String(index + 1).padStart(2, "0")}
              </span>{" "}
              -<span>{episode.episode} : </span>
              <strong>{episode.name}</strong>
            </li>
            <li className="episode-date">
              <h5>{episode.air_date}</h5>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}

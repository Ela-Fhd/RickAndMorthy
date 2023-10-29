import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcBusinesswoman } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import "./Modal.css";

function Modal({ title, showFavorites, setShowFavorites, children }) {
  if (!showFavorites) return null;
  return (
    <>
      <div
        className="modal-backdrop"
        onClick={() => setShowFavorites(false)}
      ></div>
      <div className="modal">
        <div className="modal-header">
          <p className="modal-header-title">{title}</p>
          <button
            onClick={() => setShowFavorites(false)}
            className="close-modal"
          >
            <AiOutlineCloseCircle className="close-modal-icon" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </>
  );
}

export default Modal;

// export function ModalItem({ favorite, filteredFavorite }) {
//   return (
//     <div className="character fav-character">
//       <div className="character-detail">
//         <img
//           className="character-image"
//           src={favorite.image}
//           alt={favorite.name}
//         />
//         <div className="character-info">
//           <h4 className="character-name">
//             {favorite.gender === "Male" ? <FcManager /> : <FcBusinesswoman />}{" "}
//             {favorite.name}
//           </h4>
//           <div
//             className={`status ${favorite.status === "Dead" ? "bgred" : ""}`}
//           >
//             {favorite.status} - {favorite.species}{" "}
//           </div>
//         </div>
//       </div>
//       <div className="delete-fav-character">
//         <button onClick={() => filteredFavorite(favorite.id)}>
//           <BsTrash />
//         </button>
//       </div>
//     </div>
//   );
// }

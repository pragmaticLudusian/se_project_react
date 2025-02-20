import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection(props) {
  return (
    <section className="clothes">
      <div className="clothes__header">
        <p className="clothes__header-text">Your items</p>
        <button
          type="button"
          className="clothes__add-btn"
          onClick={props.onAddClothesClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes__grid">
        {props.clothesArray.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={props.onCardClick}
              itemCardData={props.itemCardData}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;

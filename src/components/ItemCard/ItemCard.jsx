import "./ItemCard.css";

function ItemCard(props) {
  const { name, imageUrl } = props.item; // clicked card essentials

  function handleCardClick() {
    // onClick's the actual html-js event handler, so avoiding naming props after event handlers; pass the prop set object for itemCardData to use to return to Main and then to App and ItemModal
    props.openItemModal();
    props.itemCardData(props.item);
  }

  return (
    <li
      className="card"
      onClick={handleCardClick} // for performance reasons it's recommended to pass a callback instead of an anon/arrow func
    >
      <img src={imageUrl} alt={name} className="card__image" />
      <div className="card__header">
        <div className="card__name">{name}</div>
      </div>
    </li>
  );
}

export default ItemCard;

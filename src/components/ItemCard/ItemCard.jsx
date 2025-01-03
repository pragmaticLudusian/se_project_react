import "./ItemCard.css";

function ItemCard(props) {
  const bgImage = {
    background: `url(${new URL(
      props.image,
      import.meta.url
    )}) no-repeat center/cover`,
  }; // questionable if bg state supposed to be changed with inline styles

  function handleCardClick(card) {
    props.openItemModal();
    props.itemCardData(card);
  }

  return (
    <li
      className="item-card"
      key={props.i}
      style={bgImage}
      onClick={() => {
        handleCardClick(props);
      }} // actual html-js event handler; pass the prop set object for itemCardData to use to return to Main and then to App and ItemModal
    >
      <div className="item-card__header">
        <div className="item-card__name">{props.name}</div>
        <button type="button" className="item-card__like" />
      </div>
    </li>
  );
}

export default ItemCard;

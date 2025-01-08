import "./ItemCard.css";

function ItemCard(props) {
  const { name, link } = props.item;
  const bgImage = {
    background: `url(${new URL(link, import.meta.url)}) no-repeat center/cover`,
  }; // questionable if bg state supposed to be changed with inline styles

  function handleCardClick(card) {
    props.openItemModal();
    props.itemCardData(card);
  }

  return (
    <li className="card">
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={() => {
          handleCardClick(props.item);
        }} // actual html-js event handler; pass the prop set object for itemCardData to use to return to Main and then to App and ItemModal
      />
      <div className="card__header">
        <div className="card__name">{name}</div>
        <button type="button" className="card__like" />
      </div>
    </li>
  );
}

export default ItemCard;

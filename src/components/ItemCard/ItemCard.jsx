import "./ItemCard.css";

function ItemCard(props) {
  const bgImage = {
    background: `url(${new URL(
      props.image,
      import.meta.url
    )}) no-repeat center/cover`,
  }; // questionable if bg state supposed to be changed with inline styles

  return (
    <li className="item-card" key={props.i} style={bgImage}>
      <div className="item-card__container">
        <div className="item-card__name">{props.name}</div>
        <button type="button" className="item-card__like" />
      </div>
    </li>
  );
}

export default ItemCard;

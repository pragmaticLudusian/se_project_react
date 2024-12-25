import "./ItemCard.css";

function ItemCard(props) {
  const bgImage = {
    background: `url(${new URL(
      props.image,
      import.meta.url
    )}) no-repeat center/cover`,
  };

  return (
    <li className="itemcard" key={props.i} style={bgImage}>
      <div className="itemcard__container">
        <div className="itemcard__name">{props.name}</div>
        <button type="button" className="itemcard__like" />
      </div>
    </li>
  );
}

export default ItemCard;

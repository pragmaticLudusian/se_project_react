import "./ItemModal.css";

function ItemModal(props) {
  return (
    <div className="item-modal">
      <div className="item-modal__window">
        <button type="button" className="item-modal__close-button" />
        <div className="item-modal__image">
          <div className="item-modal__name">Capper</div>
        </div>
        <div className="item-modal__description">Weather: hot</div>
      </div>
    </div>
  );
}

export default ItemModal;

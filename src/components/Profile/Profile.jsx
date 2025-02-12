import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile(props) {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        clothesArray={props.clothesArray}
        openFormModal={props.openFormModal}
        openItemModal={props.openItemModal}
        itemCardData={props.itemCardData}
      />
    </main>
  );
}

export default Profile;

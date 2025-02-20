import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import { useEffect } from "react";

function Profile(props) {
  useEffect(() => {
    props.onCloseMobileMenuClick();
  }, []);

  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        clothesArray={props.clothesArray}
        onAddClothesClick={props.onAddClothesClick}
        onCardClick={props.onCardClick}
        itemCardData={props.itemCardData}
      />
    </main>
  );
}

export default Profile;

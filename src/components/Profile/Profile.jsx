import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import { useEffect } from "react";

function Profile(props) {
  useEffect(() => {
    props.closeMobileMenu();
  }, []);

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

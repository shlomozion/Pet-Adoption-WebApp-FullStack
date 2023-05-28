import React, { useEffect, useRef, useContext } from "react";
// import { UserContextInstance } from "../../Context/UserContext";
// import axios from "axios";
// import Container from "react-bootstrap/Container";
import AdminLink from "../Footer/AdminLink";

import Carousels from "./Carousel";

// import UserProfile from "./UserProfile";
// import AllPets from "./AllPets";
// import PetPage from "./PetPage";
// import AdvancedSearchModal from "./AdvancedSearchModal";
// import AdminHomePage from "./AdminHomePage";
// import AdminAddPetForm from "./AdminAddPetForm";
// import { Routes, Route } from "react-router-dom";

export default function Homepage() {
  // const { setCurrentUser, setIsSignedIn } = useContext(UserContextInstance);

  // const {
  //   refreshStates,
  //   isSignedIn,
  //   setIsSignedIn,
  //   currentUser,
  //   setCurrentUser,
  // } = useContext(UserContext);

  // const isInitialMount = useRef(true);

  // const errorHandler = (response) => {
  // if (response.status === 201) {
  // return console.log("response from server", response.data);
  // }
  // if (response.status === 200) {
  // setCurrentUser(response.data[1]);

  // setIsSignedIn(true);
  // console.log("response from server", response.data);
  // return;
  // }
  // if (response.status === 409) {
  // return console.log("response from server", response.data);
  // }
  // if (response.status === 404) {
  // return console.log("response from server", response.data);
  // }
  // if (response.status === 403) {
  // return console.log("response from server", response.data);
  // }
  // };

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //   }
  // }, []);

  return (
    <div className="border">
      <Carousels />
      <AdminLink />

      {/* <UserProfile /> */}

      {/* <AllPets /> */}
      {/* <PetPage /> */}
      {/* <AdvancedSearchModal /> */}
      {/* <AdminAddPetForm /> */}
      {/* <AdminHomePage /> */}

      {/* <div>
        our mission is to find a home for every pet *add charts and statistics*
      </div> */}
    </div>
  );
}

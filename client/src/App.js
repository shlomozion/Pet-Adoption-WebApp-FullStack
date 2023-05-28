import "./App.scss";
import { UserContext } from "./Context/UserContext";
import { AuthContext } from "./Context/AuthContext";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import AdoptAPet from "./Components/NavBar/AdoptAPet";
import About from "./Components/NavBar/About";
import Contact from "./Components/NavBar/Contact";
import BrowsePets from "./Components/NavBar/BrowsePets";
import Homepage from "./Components/HomePage/Homepage";
import AdminHomePage from "./Components/Admin/AdminHomePage";
import SignUp from "./Components/LoginSignup/SignUp";
import Login from "./Components/LoginSignup/Login";
import UserProfilePage from "./Components/UserProfile/UserProfilePage";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminAddPetPage from "./Components/Admin/Pets/AdminAddPetForm";
import AdminUserList from "./Components/Admin/Users/AdminUserList";
import AdminPetList from "./Components/Admin/Pets/AdminPetList";
import PetPage from "./Components/PetPage";
import UserMyPets from "./Components/UserProfile/UserMyPets";
import { PetContext } from "./Context/petContext";

function App() {
  return (
    <PetContext>
      <UserContext>
        <AuthContext>
          <div className="App">
            <NavBar />

            <Routes>
              <Route index element={<Homepage />} />
              <Route path="'/AdminHomePage" element={<AdminHomePage />} />
              <Route path="/adoptAPet" element={<AdoptAPet />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/browsePets" element={<BrowsePets />} />
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/user/myPets/:id" element={<UserMyPets />}></Route>
              <Route path="/petPage/:id" element={<PetPage />}></Route>
              <Route
                path="/userProfile/:id"
                element={<UserProfilePage />}
              ></Route>
              <Route path="/adminLogin" element={<AdminLogin />}></Route>
              <Route path="/adminHomePage" element={<AdminHomePage />}></Route>
              <Route path="/adminAddPet" element={<AdminAddPetPage />}></Route>
              <Route path="/adminUsersList" element={<AdminUserList />}></Route>
              <Route path="/adminPetsList" element={<AdminPetList />}></Route>
            </Routes>
          </div>
        </AuthContext>
      </UserContext>
    </PetContext>
  );
}

export default App;

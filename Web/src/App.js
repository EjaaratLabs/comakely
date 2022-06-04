import React from 'react';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, } from "react-router-dom";
import { Landing } from './views/Landing';
import { Login } from './views/Login';
import { SignUp } from './views/LoginSignUp';
import { BusinessLanding } from './views/BusinessLanding';
import { VendorLanding } from './views/VendorLanding';
import { BusinessAd } from './views/BusinessAd';
import { VendorAd } from './views/VendorAd';

import { AdDetails } from './views/AdDetails';
import { ProfileDetails } from './views/ProfileDetails';
import { ProfileManagement } from './views/ProfileManagement';
import { AlliedLanding } from './views/AlliedLanding';
import { Blog } from './views/Blogs';
import { NewProduct } from './views/NewProduct';

function App() {

  //const token = useSelector(getToken);
  return (
    <div className="App" style={{ minHeight: "100%" }}>
      <Router>
        <Routes>
         

           <Route path="/" element={<Landing />} />
           <Route path="login" element={<Login />} />
           <Route path="signup" element={<SignUp />} />
           <Route path="business" element={<BusinessLanding />} />
           <Route path="vendor" element={<VendorLanding />} />
           <Route path="vendor/:vendorCategory" element={<VendorLanding />} />
           <Route path="allied-services" element={<AlliedLanding />} />
           <Route path="post-vendor-ad" element={<VendorAd />} />
           <Route path="post-business-ad" element={<BusinessAd />} />
           <Route path="details/:postId" element={<AdDetails />} />
           <Route path="profile/:vendorId" element={<ProfileDetails  />} />
           <Route path="profile-management" element={<ProfileManagement  />} />
           <Route path="blog" element={<Blog />} />
           <Route path="add-product" element={<NewProduct />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

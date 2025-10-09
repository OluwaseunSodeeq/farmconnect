"use client";

import {LoginPage} from "../Components/LoginPage";

export default function Page({setAuthentication}) {
 
  

  return (
    <div >
      <LoginPage setAuthentication={setAuthentication} />
    </div>
  );
}

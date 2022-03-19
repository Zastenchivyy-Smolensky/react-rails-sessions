import React, { useContext } from "react";
import { AuthContext } from "../App";

function Home() {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  return (
    <div>
      {isSignedIn && currentUser ? (
        <>
          <h1>Successfully!</h1>
          <h2>Email:{currentUser?.email}</h2>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </div>
  );
}

export default Home;

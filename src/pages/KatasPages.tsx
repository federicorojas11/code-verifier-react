import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const KatasPage = () => {
  let loggedIn = useSessionStorage("sessionJWToken");
  let navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    }
  }, [loggedIn]);

  /**
   * Method to navigate to Kata details
   * @param id of Kata to navigate to
   */
  const navigateToKataDetail = (id: number) => {
    navigate(`/katas/${id}`);
  };

  return (
    <div>
      <h1>Katas Page</h1>
      {/* // TODO Real Katas */}
      <ul>
        {/* // TODO Export to isolated component */}
        <li onClick={() => navigateToKataDetail(1)}>First Kata</li>

        <li onClick={() => navigateToKataDetail(2)}>Second Kata</li>
      </ul>
    </div>
  );
};

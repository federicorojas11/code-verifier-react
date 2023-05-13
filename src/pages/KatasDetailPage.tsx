import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Editor } from "../components/editor/Editor";

// React Router DOM Imports

export const KatasDetailPage = () => {
  let loggedIn = useSessionStorage("sessionJWToken");

  // Variable to navigate between stack of routes
  let navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    }
  }, [loggedIn]);

  // Find id from params
  let { id } = useParams();

  return (
    <div>
      <h1>Katas Detail Page: {id}</h1>
      <Editor></Editor>
    </div>
  );
};

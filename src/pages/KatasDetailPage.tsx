import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Editor } from "../components/editor/Editor";
import { getKataByID } from "../services/katasService";
import { AxiosResponse } from "axios";
import { log } from "console";
import { Kata } from "../utils/types/Kata.type";

// React Router DOM Imports

export const KatasDetailPage = () => {
  let loggedIn = useSessionStorage("sessionJWToken");

  // Variable to navigate between stack of routes
  let navigate = useNavigate();

  // Find id from params
  let { id } = useParams();
  const [kata, setkata] = useState<Kata | undefined>(undefined);

  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    } else {
      if (id) {
        getKataByID(loggedIn, id)
          .then((response: AxiosResponse) => {
            console.log(response);
            if (response.status === 200 && response.data) {
              let kataData: Kata = {
                _id: response.data.id,
                name: response.data.name,
                description: response.data.description,
                level: response.data.level,
                user: response.data.user,
                chances: response.data.chances,
                valoration: response.data.valoration,
              };
              setkata(kataData);
              console.table(kataData);
            }
          })
          .catch((error) => {
            console.error(`[Kata by ID] something where wrong: ${error}`);
          });
      } else navigate("katas");
    }
  }, [loggedIn]);

  return (
    <div>
      <h1>Katas Detail Page: {id}</h1>
      {kata ? (
        <div className="kata-data">
          <h2>{kata.description}</h2>
          <h3>valoration: {kata.level}</h3>
          {showSolution ? null : <Editor solution={kata?.description}></Editor>}
        </div>
      ) : (
        <h2>Loading data...</h2>
      )}
      <button onClick={() => setShowSolution(!showSolution)}>
        {showSolution ? "Hide solution" : "Show solution"}
      </button>
    </div>
  );
};

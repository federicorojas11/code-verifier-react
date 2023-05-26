import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { getAllKatas } from "../services/katasService";
import { AxiosResponse } from "axios";
import { Kata } from "../utils/types/Kata.type";

export const KatasPage = () => {
  let loggedIn = useSessionStorage("sessionJWToken");
  let navigate = useNavigate();

  // State of component
  const [katas, setKatas] = useState([]); // initial state katas is empty
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    } else {
      getAllKatas(loggedIn, 2, 1)
        .then((response: AxiosResponse) => {
          if (
            response.status === 200 &&
            response.data.katas &&
            response.data.totalPages &&
            response.data.currentPage
          ) {
            //
            console.table(response.data);
            let { katas, totalPages, currentPage } = response.data;
            setKatas(katas);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
          } else {
            throw new Error(
              `Error obtaining katas: ${JSON.stringify(response.data)}`
            );
          }
        })
        .catch((error) => {
          console.error(`[Get all katas error]: ${error}]`);
        });
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

      {katas.length > 0 ? (
        <div>
          <ul>
            {katas.map((kata: Kata) => (
              <li key={kata._id}>
                <h3 onClick={() => navigateToKataDetail(kata._id)}>
                  Kata {kata.name}
                </h3>
                <h5>Creator: {kata.user}</h5>
                <p>
                  rating:{" "}
                  {kata.valoration
                    ? `/${kata.valoration.length}`
                    : "no valoration"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h5>No katas found</h5>
        </div>
      )}

      <ul>
        {/* // TODO Export to isolated component */}
        <li onClick={() => navigateToKataDetail(1)}>First Kata</li>

        <li onClick={() => navigateToKataDetail(2)}>Second Kata</li>
      </ul>
    </div>
  );
};

import React from "react";
import axios from "axios";
import { NASA_API_KEY, NASA_URL } from "./URL";
import { useState, useEffect } from "react";
import NoPicture from "./NoPicture";

const ApodApi = ({ date }) => {
  // Creamos el State para la APOD y el use Effect para la llamada
  const [apod, setApod] = useState();

  useEffect(() => {
    const getAstronomicPicture = async () => {
      try {
        const response = await axios.get(
          `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
        );
        console.log(response);
        return response;
      } catch (error) {
        console.log();
        const response = [];
        return response;
      }
    };

    const handleNoPicture = (data) => {
      try {
        return (
          <>
            <h2>{data.title}</h2>
            <p>{data.explanation}</p>
            {data.media_type === "image" ? (
              <img src={data.url} />
            ) : (
              <iframe src={data.url} width="90%" height="600px"></iframe>
            )}
            <div>
              <p>
                Date: {data.date} <b>||</b> Copyright: {data.copyright}
              </p>
            </div>
          </>
        );
      } catch (error) {
        return <NoPicture />;
      }
    };

    getAstronomicPicture().then((ev) => {
      setApod(handleNoPicture(ev.data))
    console.log(ev.data);
    }
      );
  }, [date]);

  return (
    <>
   {apod}
    </>
  )
  
};

export default ApodApi;

import React from "react";
import axios from "axios";
import { NASA_API_KEY, NASA_URL } from "./URL";
import { useState, useEffect } from "react";
import NoPicture from "./NoPicture";

const RoverAPI = ({ date }) => {
  // Creamos el State para el Rover y el use Effect para la llamada
  const [rover, setRover] = useState();

  useEffect(() => {
    const getAstronomicPicture = async () => {
      try {
        const response = await axios.get(
          `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`
        );
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
    };

    const handleNoPicture = (data) => {
        try {
          return (
            <>
              <div>
                <p>Cámara: {data.photos[0].camera.full_name}</p>
              </div>
              <img src={data.photos[0].img_src} alt="image" />
            </>
          );
        } catch (error) {
          return <NoPicture />;
        }
      };

    getAstronomicPicture().then((ev) => {
        setRover(handleNoPicture(ev.data))

    });
  }, [date]);  

  return (
    <>
      <h2>Fotos del Rovers de Marte</h2>
      {rover}
    </>
  );
};

export default RoverAPI;

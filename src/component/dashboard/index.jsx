import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadWeatherRequest,
  loadWeatherSuccess,
  loadWeatherrFail,
} from "../../redux/weatherStateSlice";
import axios from "axios";
import "./index.css";
import { CircularProgress, Slide, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { debounce } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";

const DashBoard = () => {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("Delhi");
  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { loading, Weather, error } = useSelector((state) => state);
  console.log(loading, Weather, error);

  const getWeatherData = async () => {
    try {
      await dispatch(loadWeatherRequest());

      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=189271b827844bff7388350c44848615&units=metric`
        )
        .then((weather) => {
          dispatch(loadWeatherSuccess(weather.data));
        });
    } catch (error) {
      dispatch(loadWeatherrFail(error?.response?.data?.message));
      toast.error(error?.response?.data?.message);
    }
  };
  // Define your debounce function with a delay (e.g., 500ms)
  const debouncedSearch = debounce(getWeatherData, 500);

  useEffect(() => {
    getWeatherData();
  }, [cityName]);

  function capitalizeFirstLetter(str) {
    // Check if the input string is empty or null
    if (!str) {
      return "";
    }

    // Capitalize the first letter and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityName(capitalizeFirstLetter(e.target.value));
      debouncedSearch(); // Trigger the debounced API call
      setInputText("");
    }
  };

  return (
    <div>
      <div className="bg_img">
        {!loading ? (
          <>
            <TextField
              variant="filled"
              label="Search location"
              className="input"
              error={error}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <h1 className="city">{Weather?.name}</h1>
            <div className="group">
              <img
                src={`http://openweathermap.org/img/wn/${Weather?.weather[0].icon}@2x.png`}
                alt=""
              />
              <h1>{Weather?.weather[0].main}</h1>
            </div>

            <h1 className="temp">{Weather?.main.temp.toFixed()}°C</h1>

            <Slide direction="right" timeout={800} in={!loading}>
              <div className="box_container">
                <div className="box">
                  <p>Humidity</p>
                  <h1>{Weather?.main.humidity.toFixed()}%</h1>
                </div>

                <div className="box">
                  <p>Wind</p>
                  <h1>{Weather?.wind.speed.toFixed()} km/h</h1>
                </div>

                <div className="box ">
                  <p>Feels Like</p>
                  <h1>{Weather?.main.feels_like.toFixed()}°C</h1>
                </div>
                <div
                  className="box1"
                  onClick={() => {
                    navigate("/globe");
                  }}
                >
                  <span>Want to see 3D </span>
                  <span>
                    <BsBoxArrowRight />
                  </span>
                </div>
              </div>
            </Slide>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default DashBoard;

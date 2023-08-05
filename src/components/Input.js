import React, { useEffect, useState } from "react";
import "./Card.css";
function Input() {
  const [country, setCountry] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("Baku");
  const [name, setName] = useState("");

  const getData = () => {
    setIsLoading(true);
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=399f0a506174442e9fc101923222212&q=${search}&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCountry(data.current);

        setName(data);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChange = () => {
    // setSearch(userInput);
    console.log(search);
    getData();
  };

  return (
    <div className="Card-container">
      <div className="input">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          style={{
            cursor: "pointer",
          }}
          onClick={handleChange}
        >
          {" "}
          Get Weather{" "}
        </button>
      </div>
      {isLoading ? (
        <div className="loader-cont">
          <span className="loader"></span>
        </div>
      ) : country ? (
        <div className="Card">
          <h2>{name?.location?.name}</h2>
          <img src={country?.condition?.icon} />
          <p> {country?.condition?.text}</p>
          <div>
            <h2>{country?.temp_c}&#8451;</h2>
            <h3>{country?.is_day}&#8451;</h3>
          </div>
          <div className="info">
            <p>Humidity: {country?.humidity}</p>
            <p>Wind: {country?.wind_kph} kph</p>
            <p>Pressure: {country?.pressure_in}</p>
            <p>Feels Like: {country?.feelslike_c} &#8451;</p>
          </div>
        </div>
      ) : (
        <h1>Please Search A city in which located in the planet earth</h1>
      )}
    </div>
  );
}

export default Input;

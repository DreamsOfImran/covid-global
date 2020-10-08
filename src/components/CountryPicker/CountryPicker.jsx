import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange, darkMode }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };
    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <FormControl>
      <NativeSelect
        style={{ color: `${darkMode ? "white" : "black"}` }}
        defaultValue=""      
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="" style={{ background: `${darkMode ? "rgb(26, 25, 25)" : "#fff"}` }}>Global</option>
        {fetchedCountries.map((country, i) => (
          <option key={i} value={country} style={{ background: `${darkMode ? "rgb(26, 25, 25)" : "#fff"}`}}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;

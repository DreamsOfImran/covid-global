import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import coronaImage from "./images/image.png";
import { fetchData } from "./api";
import Switch from '@material-ui/core/Switch';

class App extends React.Component {
  state = {
    data: {},
    country: "",
    darkMode: true,
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };

  toggleMode = () => {
    this.setState({darkMode: !this.state.darkMode})
  }

  render() {
    const { data, country, darkMode } = this.state;
    return (
      <div className={`${!darkMode ? styles.container : styles.container__darkMode}`}>
        <img className={`${!darkMode ? styles.image : styles.image__darkMode}`} src={coronaImage} alt="COVID-19" />
        <Switch
          checked={darkMode}
          onChange={this.toggleMode}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} darkMode={darkMode} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;

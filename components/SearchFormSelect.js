// Import Dependencies
import React, { Component } from "react";

const options = [
  { value: 'ign', label: 'ign' },
  { value: 'bbc-news', label: 'bbc-news' },
  { value: 'espn', label: 'espn' }
];

//
// Define SearchForm Class
//
export default class SearchForm extends Component {
  // constructor accepts props and initialises state
  constructor(props) {
    super(props);

    this.state = {
        selectedOption: ""
    };
  }

  //
  // an event handler for form submit
  //
  handleChange = (selectedOption) => {
      this.props.setNewsSource(selectedOption.value);
      console.log(`Option Selected`, selectedOption);
  }

  // Render the form
  render() {
      const{ selectedOption } = this.state.selectedOption;
    return (
      <div>
        {/* Search Input */}
        <div id="search">
          <h3>Enter newsapi.org source</h3>
          {/* Note event handler */}
          <form onSubmit={this.formSubmitted}>
            {/* The input field */}
            <input
              name="newsSource"
              placeholder="News Source name"
              type="text"
            />
            {/* Button click will trigger submit */}
            <button>Update News</button>
          </form>
        </div>
      </div>
    );
  }
}

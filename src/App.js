import React, { useState } from "react";
import update from "immutability-helper";
import math from "mathjs";
import "./App.css";
import Display from "./Display";
import Button from "./Button";
import "./calculator-wrapper.css";

const App = () => {
  // set state
  const [operations, setOperations] = useState([]);

  // create function to calculate operations
  const calculateOperations = () => {
    let result = operations.join("");
    if (result) {
      result = math.eval(result);
      result = math.format(result, { precision: 14 });
      result = String(result);
      setOperations([result]);
    }
  };

  // create function to handle click
  const handleClick = (event) => {
    const value = event.target.getAttribute("data-value");
    switch (value) {
      case "clear":
        setOperations([]);
        break;
      case "C":
        operations.pop(); // fix update bug
        break;
      case "equal":
        calculateOperations();
        break;
      default:
        const newOperations = update(operations, {
          $push: [value]
        });
        setOperations(newOperations);
        break;
    }
  };

  // generate buttons for calculator
  const generateButtons = () => {
    return "C7410/852.*963".split("").map((char) => (
      <Button key={char} value={char} label={char} onClick={handleClick}>
        {char}
      </Button>
    ));
  };

  return (
    <div className="App">
      <div className="calculator-wrapper">
        <Display data={operations} />
        <section className="Buttons">
          {generateButtons()}

          <Button onClick={handleClick} label="CE" value="clear" />
          <Button onClick={handleClick} label="-" value="-" />
          <Button onClick={handleClick} label="+" size="2" value="+" />
          <Button onClick={handleClick} label="=" size="2" value="equal" />
        </section>
      </div>
    </div>
  );
};

export default App;

import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

const fetchCategories = () => {
  return fetch("https://api.publicapis.org/categories")
    .then((resp) => resp.json())
    .then((json) => json);
};
function App() {
  const [inputVal, setInputVal] = useState("");

  const [categories, setCategories] = useState();

  useEffect(() => {
    (async () => {
      const data = await fetchCategories();
      setCategories(data);
    })();
  }, []);
  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  return (
    <div className="App">
      <input type="text" onChange={handleChange} />
      {categories && (
        <section>
          <table>
            {categories
              .filter((cat) =>
                cat.toLowerCase().includes(inputVal.toLowerCase())
              )
              .map((cat) => (
                <tr>
                  <td>{cat}</td>
                </tr>
              ))}
          </table>
        </section>
      )}
    </div>
  );
}

export default App;

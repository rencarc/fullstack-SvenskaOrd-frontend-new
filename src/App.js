import React, { useState, useEffect } from "react";
import SvenskaOrd from "./components/SvenskaOrd";
import { getAllSvenskaOrd, addSvenskaOrd, updateSvenskaOrd, deleteSvenskaOrd } from "./utils/HandleApi";
import axios from "axios";

function App() {
  const [svenskaOrdList, setSvenskaOrdList] = useState([]);
  const [swedish, setSwedish] = useState("");
  const [english, setEnglish] = useState("");
  const [example, setExample] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    getAllSvenskaOrd(setSvenskaOrdList);
  }, []);

  const handleAddOrUpdate = () => {
    if (!swedish.trim() || !english.trim() || !example.trim()) return;

    if (isUpdating) {
      axios
        .post("http://localhost:3000/api/svenska/update", {
          _id: currentId,
          swedish,
          english,
          example,
        })
        .then(() => {
          setSvenskaOrdList((prev) =>
            prev.map((item) => (item._id === currentId ? { ...item, swedish, english, example } : item))
          );
          resetFields();
        })
        .catch((err) => console.error("Error updating word:", err));
    } else {
      axios
        .post("http://localhost:3000/api/svenska/save", {
          swedish,
          english,
          example,
        })
        .then((res) => {
          setSvenskaOrdList([...svenskaOrdList, res.data]);
          resetFields();
        })
        .catch((err) => console.error("Error adding word:", err));
    }
  };

  const handleEdit = (id, swedishText, englishText, exampleText) => {
    setSwedish(swedishText);
    setEnglish(englishText);
    setExample(exampleText);
    setCurrentId(id);
    setIsUpdating(true);
  };

  const resetFields = () => {
    setSwedish("");
    setEnglish("");
    setExample("");
    setIsUpdating(false);
    setCurrentId(null);
  };

  const filteredWords = svenskaOrdList.filter((word) =>
    word.swedish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="container">
        <h1>Lär dig svenska bättre!</h1>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="🔍 Sök efter svenska eller engelska..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="top">
        <input type="text" placeholder="Svenska..." value={swedish} onChange={(e) => setSwedish(e.target.value)} />
        <input type="text" placeholder="Engelska..." value={english} onChange={(e) => setEnglish(e.target.value)} />
        <input type="text" placeholder="Exempel..." value={example} onChange={(e) => setExample(e.target.value)} />
      </div>

      <div className="button-container">
        <button className="add" onClick={handleAddOrUpdate}>{isUpdating ? "Uppdatera" : "Lägg till"}</button>
      </div>

      <div className="list">
        {filteredWords.map((svenskaOrd) => (
          <SvenskaOrd
            key={svenskaOrd._id}
            swedish={svenskaOrd.swedish}
            english={svenskaOrd.english}
            example={svenskaOrd.example}
            updateMode={() => handleEdit(svenskaOrd._id, svenskaOrd.swedish, svenskaOrd.english, svenskaOrd.example)}
            deleteSvenskaOrd={() => deleteSvenskaOrd(svenskaOrd._id, setSvenskaOrdList)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

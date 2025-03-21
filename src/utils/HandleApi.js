import axios from "axios";

const baseUrl = "https://fullstack-svenskaord-backend-new.onrender.com";

// 获取所有单词
export const getAllSvenskaOrd = (setSvenskaOrd) => {
  axios
    .get(`${baseUrl}/getSvenskaOrd`)
    .then(({ data }) => {
      console.log("✅ Hämtade ord:", data);
      setSvenskaOrd(data);
    })
    .catch((error) => console.log("❌ Fel vid hämtning:", error));
};

// 添加单词
export const addSvenskaOrd = (swedish, english, example, setSwedish, setEnglish, setExample, setSvenskaOrd) => {
  if (!swedish.trim()) return;

  axios
    .post(`${baseUrl}/save`, { swedish, english, example })
    .then(({ data }) => {
      console.log("✅ Ord tillagt:", data);
      setSvenskaOrd((prev) => [...prev, data]);
      setSwedish("");
      setEnglish("");
      setExample("");
    })
    .catch((error) => console.log("❌ Fel vid tillägg:", error));
};

// 更新单词
export const updateSvenskaOrd = (id, swedish, english, example, setSwedish, setEnglish, setExample, setSvenskaOrd, setIsUpdating) => {
  if (!swedish.trim() || !id) return;

  axios
    .post(`${baseUrl}/update`, { _id: id, swedish, english, example })
    .then(() => {
      console.log("🔄 Uppdaterade ordet:", swedish);
      setSvenskaOrd((prev) => 
        prev.map((item) => (item._id === id ? { ...item, swedish, english, example } : item))
      );
      setSwedish("");
      setEnglish("");
      setExample("");
      setIsUpdating(false);
    })
    .catch((error) => console.log("❌ Fel vid uppdatering:", error));
};

// 删除单词
export const deleteSvenskaOrd = (id, setSvenskaOrd) => {
  if (!id) return;

  axios
    .post(`${baseUrl}/delete`, { _id: id })
    .then(() => {
      console.log("🗑️ Ord raderat");
      setSvenskaOrd((prev) => prev.filter((item) => item._id !== id));
    })
    .catch((error) => console.log("❌ Fel vid radering:", error));
};

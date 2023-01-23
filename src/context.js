import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficult=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const fetchQuestions = async url => {
    setLoading(true);
    setWaiting(false);

    try {
      const res = await axios(url).catch(err => console.log(err));

      if (res) {
        const data = await res.data.results;

        if (data.length > 0) {
          setQuestions(data);
          setLoading(false);
          setWaiting(false);
          setError(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      } else setWaiting(true);
    } catch (err) {
      console.log(err);
    }
  };

  const nextQuestion = () => {
    if (index >= questions.length - 1) {
      openModal();
      setIndex(0);
    } else setIndex(prevIndex => prevIndex + 1);
  };

  const checkAnswer = value => {
    if (value) setCorrect(prevState => prevState + 1);
    nextQuestion();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setModalOpen(false);
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  // useEffect(() => {
  //   fetchQuestions(tempUrl);
  // }, []);

  const value = {
    waiting,
    loading,
    questions,
    index,
    correct,
    error,
    modalOpen,
    nextQuestion,
    checkAnswer,
    openModal,
    closeModal,
    quiz,
    handleChange,
    handleSubmit,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

// 65 ka na

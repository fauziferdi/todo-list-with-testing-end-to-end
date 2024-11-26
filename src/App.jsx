import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { changeLang } from "../src/redux/slices/langSlice";

const App = () => {
  const { lang } = useSelector((state) => state.lang);
  const dispatch = useDispatch();

  const toggleLang = () => {
    const newLang = lang === "id" ? "en" : "id";
    dispatch(changeLang(newLang));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <button
            cy-data="button-changeLang"
            onClick={toggleLang}
            className="btn btn-outline-primary mb-4"
            name="language"
          >
            {lang === "id" ? "Indonesia" : "English"}
          </button>
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4" cy-data="app-title">
                {lang === "id" ? "Daftar Tugas" : "Todo List"}
              </h1>
              <TodoInput />
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

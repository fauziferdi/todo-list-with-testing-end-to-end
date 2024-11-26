// src/components/TodoInput.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../redux/async/todoSlice";
import { addTodo } from "../redux/async/todoSlice";
import { v4 as uuidv4 } from "uuid";

const TodoInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { isUpdate, todo, loading } = useSelector((state) => state.todos);
  const { lang } = useSelector((state) => state.lang);

  useEffect(() => {
    if (todo?.id) {
      setText(todo.text);
    } else {
      setText("");
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      if (isUpdate) {
        dispatch(updateTodo({ ...todo, text }));
      } else {
        dispatch(
          addTodo({
            id: uuidv4(),
            text,
            completed: false,
          })
        );
      }
      setText("");
    }
  };

  return (
    <div className="mb-3">
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          cy-data="input-form"
          type="text"
          className="form-control"
          placeholder={
            lang === "id" ? "Tambah tugas baru..." : "Add a new task..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          cy-data="input-button"
          type="submit"
          disabled={loading}
          className={isUpdate ? `btn btn-warning` : `btn btn-success`}
        >
          {isUpdate
            ? lang === "id"
              ? "Edit"
              : "Update"
            : lang === "id"
            ? "Tambah"
            : "Add"}
        </button>
      </form>
    </div>
  );
};

export default TodoInput;

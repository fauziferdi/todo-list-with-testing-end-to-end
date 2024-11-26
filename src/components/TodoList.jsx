import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  deleteTodo,
  toggleTodo,
  currentTodo,
} from "../redux/async/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error, isSuccess } = useSelector(
    (state) => state.todos
  );
  const { lang } = useSelector((state) => state.lang);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchTodos());
    }
  }, [dispatch, isSuccess]);

  if (todos.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        <p cy-data="notif-empty">
          {lang === "id" ? "Tidak ada tugas yang ditemukan." : "No todos found"}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="alert alert-primary text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          onClick={() => dispatch(toggleTodo(todo))}
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-secondary" : ""
          }`}
        >
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <div>
            <button
              cy-data="edit-button"
              onClick={(e) => dispatch(currentTodo(todo), e.stopPropagation())}
              className="btn btn-warning btn-sm me-2"
            >
              {lang === "id" ? "Edit" : "Update"}
            </button>
            <button
              cy-data="delete-button"
              onClick={(e) =>
                dispatch(deleteTodo(todo.id), e.stopPropagation())
              }
              className="btn btn-danger btn-sm "
            >
              {lang === "id" ? "Hapus" : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

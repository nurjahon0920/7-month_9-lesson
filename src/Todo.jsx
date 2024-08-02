import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "./redux/todoSlicer";
import { useEffect } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import Dark from "./components/Dark";
import { Button } from "@mui/material";
import { Input } from "antd";

const Todo = () => {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.todo);
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  console.log(data);
  return (
    <div>
      <div className="todo_top">
        <Input.Search placeholder="Searching ..." />
        <Button variant="contained" color="primary" className="addTodo">
          Add
        </Button>
        <Dark />
      </div>
      <div className="enclosingTable">
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div className="loader"></div>
            ) : error ? (
              <h1>Error: {error}</h1>
            ) : (
              data.map((todo) => {
                return (
                  <>
                    <tr key={todo.id}>
                      <td>{todo.id}</td>
                      <td>{todo.title}</td>
                      <td>{todo.completed ? "✅" : "❌"}</td>
                      <td className="actions">
                        <Button
                          variant="contained"
                          color="success"
                          className="">
                          Edit
                        </Button>
                        <Button variant="contained" color="error" className="">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Todo;

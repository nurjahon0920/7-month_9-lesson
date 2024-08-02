import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "./redux/todoSlicer";
import { useEffect } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";

const Todo = () => {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.todo);
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  console.log(data);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Completed</th>
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
                  </tr>
                </>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Todo;

import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "./redux/todoSlicer";
import { useEffect } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import Dark from "./components/Dark";

const Todo = () => {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.todo);
  useEffect(() => {
    dispatch(fetchTodo());
    alert("Loading qo'shilgan");
  }, [dispatch]);

  console.log(data);
  return (
    <div>
      <Dark />
      <div className="enclosingTable">
        <Table striped bordered hover className="table">
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
    </div>
  );
};

export default Todo;

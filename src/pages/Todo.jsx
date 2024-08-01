import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Modal, Table, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../redux/todoSlice";

const Todo = () => {
  const [searchTodo, setSearchTodo] = useState("");
  const [modalState, setModalState] = useState({ isOpen: false, item: null });

  const dispatch = useDispatch();
  const { todos, status, error } = useSelector((state) => state.todo);

  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleSearchTodo = (e) => {
    setSearchTodo(e.target.value.toLowerCase());
  };

  const filteredData = todos.filter((todo) => {
    return (
      todo.firstName.toLowerCase().includes(searchTodo) ||
      todo.level.toLowerCase().includes(searchTodo)
    );
  });

  const onSubmit = (data) => {
    if (modalState.item) {
      dispatch(updateTodo({ id: modalState.item.id, ...data }));
      message.success("Todo updated successfully");
      setModalState({ isOpen: false, item: null });
    } else {
      dispatch(addTodo(data));
      message.success("Todo added successfully");
      setModalState({ isOpen: false, item: null });
    }
    reset();
  };

  const updateItem = (item) => {
    reset(item);
    setModalState({ isOpen: true, item });
  };

  const deleteItem = (id) => {
    dispatch(deleteTodo(id));
    message.success("Todo deleted successfully");
  };

  const showModal = () => {
    reset();
    setModalState({ isOpen: true, item: null });
  };

  const handleCancel = () => {
    setModalState({ isOpen: false, item: null });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          <Button type="primary" onClick={() => updateItem(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => deleteItem(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container2">
      <div className="content">
        <div className="search-add">
          <Input.Search
            placeholder="Search"
            allowClear
            onChange={handleSearchTodo}
          />
          <Button onClick={showModal} type="primary">
            Add Todo
          </Button>
        </div>
        <Table dataSource={filteredData} columns={columns} className="Table" />
        <Modal
          title={modalState.item ? "Edit Todo" : "Add Todo"}
          open={modalState.isOpen}
          onOk={handleSubmit(onSubmit)}
          onCancel={handleCancel}>
          <form className="form">
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="First Name"
                  maxLength={20}
                  required
                />
              )}
            />
            <Controller
              name="level"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="Level" maxLength={20} required />
              )}
            />
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Todo;

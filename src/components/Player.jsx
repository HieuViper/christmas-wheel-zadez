import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import {
  Container,
  IconButton,
  InputBase,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import { useState } from "react";

const Player = ({ setPlayer }) => {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  const [isEdited, setIsEdited] = useState(false);
  const [editElement, setEditElement] = useState(null);

  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    if (!isEdited) {
      setTodos([
        ...todos,
        { count: count + 1, val: inputVal, id: new Date().getTime() },
      ]);
      setCount((count) => count + 1);
    } else {
      const newArray = [...todos];
      const indexToEdit = newArray.findIndex(
        (item) => editElement.id === item.id
      );
      if (indexToEdit !== -1) {
        newArray[indexToEdit].val = inputVal;
        newArray[indexToEdit].id = editElement.id;
        newArray[indexToEdit].count = editElement.count;
      }

      setTodos(newArray);
    }
    setInputVal("");
    setIsEdited(false);
  };

  const onDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = (todo) => {
    setEditElement(todo);
    setInputVal(todo.val);
    setIsEdited(true);
  };
  return (
    <div className="bg-[#d0dae4] rounded-xl p-3">
      <Container component="main">
        <div className="flex items-center">
          <Paper
            // component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 280,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              onChange={onChange}
              value={inputVal}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClick();
                }
              }}
              placeholder="Type Name Player"
              inputProps={{ "aria-label": "Type Name Player" }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleClick}
              disabled={inputVal ? false : true}
            >
              <AddIcon />
            </IconButton>
          </Paper>
        </div>
        <List>
          {todos.map((todo, index) => {
            return (
              <>
                <ListItem
                  divider="bool"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    key={todo.id}
                    className="hover:cursor-pointer hover:text-red-600 font-[500]"
                    onClick={() => {
                      setPlayer(todo.val);
                      onDelete(todo.id);
                    }}
                  >
                    {todo.count}.{todo.val}
                  </div>
                  <div className="">
                    <IconButton
                      color="primary"
                      type="button"
                      onClick={() => handleEdit(todo)}
                    >
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      type="button"
                      onClick={() => onDelete(todo.id)}
                    >
                      <RemoveCircleOutlineOutlinedIcon />
                    </IconButton>
                  </div>
                </ListItem>
              </>
            );
          })}
        </List>
      </Container>
    </div>
  );
};

export default Player;

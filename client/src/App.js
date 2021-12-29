import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "./components/Taskform";
import TaskList from "./components/Tasklist";
import Menu from "./components/Navbar";
import { Container } from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
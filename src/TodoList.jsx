import { useState } from "react";

function TodoList() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState("");

  function agregarTarea() {
    if (input.trim() === "") return;
    setTareas([...tareas, { id: Date.now(), texto: input, completada: false }]);
    setInput("");
  }

  function toggleCompletada(id) {
    setTareas(tareas.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t
    ));
  }

  function eliminarTarea(id) {
    setTareas(tareas.filter((t) => t.id !== id));
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: "#0a3d2e" }}>✔</div>
        <span className="card-title">Lista de tareas</span>
      </div>

      <div className="todo-row">
        <input
          className="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
          placeholder="Nueva tarea..."
        />
        <button className="btn-agregar" onClick={agregarTarea}>+ Agregar</button>
      </div>

      <div className="todo-items">
        {tareas.map((tarea) => (
          <div className="todo-item" key={tarea.id}>
            <div
              className={`todo-check ${tarea.completada ? "completada" : ""}`}
              onClick={() => toggleCompletada(tarea.id)}
            >
              {tarea.completada && "✓"}
            </div>
            <span
              className={`todo-texto ${tarea.completada ? "completada" : ""}`}
              onClick={() => toggleCompletada(tarea.id)}
            >
              {tarea.texto}
            </span>
            <button className="btn-eliminar" onClick={() => eliminarTarea(tarea.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
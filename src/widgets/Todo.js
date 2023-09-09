import { reactive, html } from "https://esm.sh/@arrow-js/core";

const todoTemplate = document.createElement("template");

export class TodoWidget extends HTMLElement {
  constructor() {
    super();
    this.append(todoTemplate.content.cloneNode(true));
    this.todoInput;
    this.todosContainer;
    this.todoBtn;

    this.todosInfo = reactive({
      todos: [],
    });
  }

  _addTask() {
    this.todosInfo.todos.push({ task: this.todoInput.value, done: false });
  }

  _renderTasks() {
    return this.todosInfo.todos.map(({ task, done }, idx) => {
      return html`<li class="todo-item round">${task}</li>`;
    });
  }

  _submitInput() {
    //Handling for Enter and button press
    this.todoBtn.addEventListener("click", () => {
      if (this.todoInput.value !== "") {
        this._addTask();
        this.todoInput.value = "";
      }
    });

    this.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.todoBtn.click();
      }
    });
  }

  connectedCallback() {
    //Pre Render
    this.render();
    //Post Render
    this.todoInput = this.querySelector("#todo-input");
    this.todosContainer = this.querySelector("#todos-container");
    this.todoBtn = this.querySelector("#todo-input-btn");

    this._submitInput();
  }

  render() {
    const todoContent = html`<style>
        #todo-input-container {
          display: flex;
          width: 100%;
          gap: 0.5rem;
        }

        #todo-input {
          width: 85%;
          font-size: 1.25rem;
          outline: none;
          color: white;
          transition: background-color 300ms ease;
          padding: 0.5rem;
          background: transparent;
        }

        #todo-input:focus {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.15)
          );
        }

        #todo-input-btn {
          flex-grow: 1;
          font-size: 1.5rem;
          text-align: center;
          outline: none;
          color: #70e000;
          cursor: pointer;
          transition: all 300ms ease;

          background: transparent;
        }

        #todos-container {
          position: relative;
          height: 100%;
          margin: 0.5rem 0;

          overflow: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2);
        }

        #todo-input-btn:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.15)
          );
        }

        .todo-item {
          color: white;
          border: 1px solid white;
          list-style: none;
          padding: 0.25rem;
          margin: 0.5rem 0.25rem;
        }
      </style>

      <div id="todo-input-container">
        <input
          class="glass-card round"
          id="todo-input"
          type="text"
          placeholder="Add todo..."
        />
        <button class="glass-card round" id="todo-input-btn"><b>+</b></button>
      </div>
      <ul id="todos-container">
        ${() => this._renderTasks()}
      </ul>`;

    todoContent(this);
  }
}

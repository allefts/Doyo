import { reactive, html } from "https://esm.sh/@arrow-js/core";

const todoTemplate = document.createElement("template");

export class TodoWidget extends HTMLElement {
  constructor() {
    super();
    this.append(todoTemplate.content.cloneNode(true));
    this.todoInput;
    this.todosContainer;
    this.todoBtn;
    this.currId = 0;

    this.todosInfo = reactive({
      todos: [],
    });
  }

  _addTask() {
    this.todosInfo.todos.push({
      task: this.todoInput.value,
      done: false,
      id: this.currId,
    });

    this.currId += 1;
  }

  _renderTasks() {
    return this.todosInfo.todos.map(({ task, done, id }) => {
      return html`<li class="todo-item round" data-id=${id}>
        <p class="task">${task}</p>
        <button
          class="round todo-item-btn done-btn"
          @click="${this._handleCompleteTask.bind(this)}"
        >
          ✔️
        </button>
        <button
          class="round todo-item-btn remove-btn"
          @click="${this._handleRemoveTask.bind(this)}"
        >
          ❌
        </button>
      </li>`.key(id);
    });
  }

  _handleCompleteTask(e) {
    const itemId = parseInt(e.target.parentNode.dataset.id);
    const parentElement = e.target.parentNode;

    const foundItemIdx = this.todosInfo.todos.findIndex(
      ({ id }) => id === itemId
    );

    //Logic Change
    this.todosInfo.todos[foundItemIdx].done =
      !this.todosInfo.todos[foundItemIdx].done;

    //Styling change
    parentElement.classList.toggle("completedTaskParent");
    parentElement.children[0].classList.toggle("completedTaskChild");
  }

  _handleRemoveTask(e) {
    const itemId = parseInt(e.target.parentNode.dataset.id);
    this.todosInfo.todos = this.todosInfo.todos.filter(
      (todo) => todo.id !== itemId
    );
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
          color: rgba(112, 224, 0, 1);
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
          border: 1px solid rgba(255, 255, 255, 0.2);
          list-style: none;
          padding: 0.25rem;
          margin: 0.5rem 0.25rem;

          display: flex;

          position: relative;

          transition: all 300ms ease;
        }

        .task {
          margin-right: auto;

          word-break: break-word;
          white-space: normal;
        }

        .todo-item-btn {
          border: none;
          outline: none;
          background: transparent;
          cursor: pointer;
          opacity: 0;
          margin: 0 0.25rem;

          transition: all 300ms ease;
        }

        .todo-item-btn:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.15)
          );
        }

        .todo-item:hover .todo-item-btn {
          opacity: 1;
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

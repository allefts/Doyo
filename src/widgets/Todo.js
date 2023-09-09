import { reactive, html } from "https://esm.sh/@arrow-js/core";

const todoTemplate = document.createElement("template");

export class TodoWidget extends HTMLElement {
  constructor() {
    super();
    this.append(todoTemplate.content.cloneNode(true));
    this.todoInfo = reactive({
      todos: [],
    });
  }

  connectedCallback() {
    //Pre Render
    this.render();
    //Post Render
    this.todoInput = this.querySelector("#todo-input");
    this.todosContainer = this.querySelector("#todos-container");
  }

  render() {
    this.innerHTML = `
    <style>
        #todo-input-container {
            display: flex;
            width: 100%;
            gap: .5rem;
            padding: .25rem;
        }      

        #todo-input {
            width: 85%;
            font-size: 1.25rem;
            outline: none;
            color: white;
            transition: background-color 300ms ease;
            padding: .5rem;
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

        #todo-input-btn:hover {
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.2),
                rgba(255, 255, 255, 0.15)
              );
        }

        .todo {
            color: white;
            padding: .5rem;
            margin: .5rem 0;
        }
    </style>

    <div id="todo-input-container">
        <input class="glass-card round" id="todo-input" type="text" placeholder="Add todo..." />
        <button class="glass-card round" id="todo-input-btn"><b>+</b></button>
    </div>
    <div id="todos-container">

    </div>
`;
  }
}

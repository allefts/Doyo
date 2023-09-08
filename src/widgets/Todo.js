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
    this.innerHTML = `
        <h1>Todo List</h1>
    `;
  }
}

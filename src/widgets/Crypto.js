const cryptoTemplate = document.createElement("template");

export class CryptoWidget extends HTMLElement {
  constructor() {
    super();
    this.append(cryptoTemplate.content.cloneNode(true));
  }
}

const cryptoTemplate = document.createElement("template");

export class CryptoWidget extends HTMLElement {
  constructor() {
    super();
    this.append(cryptoTemplate.content.cloneNode(true));
  }

  async connectedCallback() {
    this.renderDefault();
    const data = await this.getCrypto();
  }

  async getCrypto() {
    const KEY = "";
    const ENDPOINT = "";

    // const res = fetch(ENDPOINT, {});
    // console.log(res);
    return;
  }

  renderDefault() {
    this.innerHTML = `
    <style>
      h1,
      h2,
      h3 {
        padding: 0;
        margin: 0;
        color: white;
      }

      #crypto-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .bitcoin-emoji {
        color: yellow;
      }
    </style>
     
    <div id="crypto-content">
      <h1 class="bitcoin-emoji">₿</h1>
    </div>
    `;
  }
}

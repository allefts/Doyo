const cryptoTemplate = document.createElement("template");

export class CryptoWidget extends HTMLElement {
  constructor() {
    super();
    this.append(cryptoTemplate.content.cloneNode(true));

    this.coinPrices = [];
  }

  async connectedCallback() {
    this.renderDefault();
    await this.getCrypto();
  }

  async getCrypto() {
    const KEY = "k73Ay5xhvZmOcsGM+3HC7g==qxXJC2A6cphr41IW";
    const SYMBOLS = ["BTCUSD", "ETHUSD", "LTCUSD", "DOGEUSD"];
    const ENDPOINT = "https://api.api-ninjas.com/v1/cryptoprice?symbol=BTCUSD";

    const res = await fetch(ENDPOINT, {
      headers: { "X-Api-Key": KEY },
    });
    const data = await res.json();

    if (!data.symbol) {
      this.renderDefault();
    } else {
      this.coinPrices.push({
        symbol: data.symbol,
        price: Math.floor(data.price),
      });
    }

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

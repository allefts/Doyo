const cryptoTemplate = document.createElement("template");

export class CryptoWidget extends HTMLElement {
  constructor() {
    super();
    this.append(cryptoTemplate.content.cloneNode(true));

    this.coinPrices = [];
    this.currentCoin = {};
    this.cryptoBtns = [];
    this.activeBtn;
  }

  async connectedCallback() {
    this.renderDefault();
    await this.getCrypto();
    this.cryptoBtns = document.querySelectorAll(".crypto-btn");
    this.activeBtn = this.cryptoBtns[0];

    this.cryptoBtns.forEach((btn, idx) => {
      btn.addEventListener("click", (e) => {
        this.activeBtn.classList.toggle("crypto-active");
        this.activeBtn = e.target;
        this.activeBtn.classList.toggle("crypto-active");
        this.currentCoin = this.coinPrices[idx];
      });
    });
  }

  async getCrypto() {
    const KEY = "k73Ay5xhvZmOcsGM+3HC7g==qxXJC2A6cphr41IW";
    const SYMBOLS = ["BTCUSD", "ETHUSD", "LTCUSD"];

    for (const symbol of SYMBOLS) {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/cryptoprice?symbol=${symbol}`,
        {
          headers: { "X-Api-Key": KEY },
        }
      );
      const data = await res.json();
      if (!data.symbol) {
        this.renderDefault();
        return;
      } else {
        this.coinPrices.push({
          symbol: data.symbol,
          price: Math.floor(data.price),
        });
      }
    }

    this.currentCoin = this.coinPrices[0];
    this.render();

    return;
  }

  render() {
    this.innerHTML = `
    <style>
        #crypto-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        #crypto-toolbar {
          text-align: center;
          display: flex;
          justify-content: center;
        }

        .crypto-active {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.15)
          );
        }

        #btc-btn {
          color: yellow;
          border-right: 1px solid grey;
          border-radius: 8px 0 0 8px;
        }
        
        #eth-btn {
          color: purple;
          border-right: 1px solid grey;
        }
        
        #ltc-btn {
          color: grey;
          border-radius: 0 8px 8px 0;
        }

        #btc-btn, #eth-btn, #ltc-btn {
          cursor: pointer;
          padding: 2px 4px;
          font-size: .75rem;
          transition: all 300ms ease;
        }

        #btc-btn:hover, #eth-btn:hover, #ltc-btn:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.15)
          );
        }

    </style>

    <div id="crypto-content">
        <div class="glass-card round" id="crypto-toolbar">
          <span class="crypto-btn crypto-active" id="btc-btn">BTC</span>
          <span class="crypto-btn" id="eth-btn">ETH</span>
          <span class="crypto-btn" id="ltc-btn">LTC</span>
        </div>
        <div id="crypto-info">
          <h5>${this.currentCoin.symbol}</h5>
          <h3>${this.currentCoin.price}</h3>
        </div>
    </div>
    `;
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

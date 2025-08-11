
# Hardhat ile BSC Testnet Token Deploy & Verify Rehberi

Bu rehber, sıfırdan başlayarak Hardhat kullanarak Binance Smart Chain testnet üzerinde ERC20 token oluşturma, deploy ve doğrulama işlemlerini adım adım açıklar.

---

## Ön Koşullar

- Node.js ve npm yüklü olmalı.
- Metamask veya başka bir cüzdan ile BSC testnet hesabınız ve private key’iniz hazır olmalı.
- BscScan API key alınmalı: https://bscscan.com/myapikey

---

## 1. Proje Oluşturma ve Gerekli Paketlerin Kurulumu

```bash
mkdir aidefi-token
cd aidefi-token

npm init -y

npm install --save-dev hardhat @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan ethers @openzeppelin/contracts
```

---

## 2. Hardhat Projesi Başlatma

```bash
npx hardhat
```

- Açılan menüde: `Create a basic sample project` seçeneğini seç
- Diğer sorulara varsayılan olarak Enter ile devam et
- Gerekli dosyalar otomatik oluşturulur

---

## 3. `hardhat.config.js` Dosyasını Düzenleme

```js
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.28",
  networks: {
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: ["PRIVATE_KEYİNİZ"],  // 0x olmadan yazın
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: "BSC_SCAN_API_KEYİNİZ",
    },
  },
};
```

---

## 4. `contracts/AIDEFIToken.sol` Dosyasını Oluşturma

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract AIDEFIToken is ERC20Permit {
    string private _version;

    constructor(uint256 initialSupply, string memory version_) ERC20("AIDEFI", "AIDEFI") ERC20Permit("AIDEFI") {
        _version = version_;
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function version() public view returns (string memory) {
        return _version;
    }
}
```

---

## 5. `scripts/deploy.js` Dosyasını Oluşturma

```js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const initialSupply = ethers.utils.parseUnits("1000000", 18);
  const Token = await ethers.getContractFactory("AIDEFIToken");
  const token = await Token.deploy(initialSupply, "v1");

  await token.deployed();

  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

---

## 6. Deploy İşlemi

```bash
npx hardhat run scripts/deploy.js --network bscTestnet
```

- Terminalde “Token deployed to: 0x...” şeklinde bir adres görmelisiniz

---

## 7. Doğrulama (Verify) İşlemi

```bash
npx hardhat verify --network bscTestnet TOKEN_ADRESİ 1000000 "v1"
```

- `TOKEN_ADRESİ`: Deploy sonucu aldığınız adres
- `1000000`: Deploy sırasında kullanılan initial supply
- `"v1"`: Constructor’a gönderilen version parametresi

---

## Sık Karşılaşılan Hatalar ve Çözümleri

### Hata: `Cannot find module '@nomiclabs/hardhat-ethers'`

```bash
npm install --save-dev @nomiclabs/hardhat-ethers ethers
```

---

### Hata: `File not found` (OpenZeppelin import hatası)

```bash
npm install @openzeppelin/contracts
```

---

### Hata: `The Solidity version pragma statement ... doesn't match compiler version`

- `hardhat.config.js` ve sözleşme dosyasındaki pragma sürümlerinin aynı olduğundan emin olun.

---

### Hata: `ReferenceError: ethers is not defined`

- Deploy scriptinde:

```js
const { ethers } = require("hardhat");
```

ekli olduğundan emin olun.

---

### Hata: `MODULE_NOT_FOUND` veya `Error occurred: [object Object]`

- Gerekli tüm paketlerin yüklü olduğundan emin olun.
- Gerekirse `node_modules` silip `npm install` yeniden çalıştırın.

---

## Özet

1. Proje oluştur ve paketleri yükle  
2. Hardhat yapılandırmasını yap  
3. Token sözleşmeni yaz  
4. Deploy scriptini oluştur  
5. Deploy et  
6. Doğrula (verify)  

---

Bu rehberi README olarak ekleyip her seferinde aynısını yapabilirsin. İstersen ismini, token adını ve parametreleri değiştirebilirsin.

İyi çalışmalar! 🚀

const hre = require("hardhat");

async function main() {
  // Komut satırından argümanları alıyoruz:
  // node deploy.js 1000000 v1
  const args = process.argv.slice(2);
  const initialSupply = args[0] || "1000000";  // default değer atadık
  const version = args[1] || "v1";

  console.log("Deploying with initialSupply:", initialSupply, "and version:", version);

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(initialSupply, version);

  await token.deployed();

  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

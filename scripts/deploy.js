const hre = require("hardhat");

async function main() {
  const initialSupply = 1000000
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(initialSupply, "v1");

  await token.deployed();

  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

import { v4 as uuidv4 } from "uuid";

const generateToken = () => {
  //generate token using uuid
  const tokenOnlyLowercase = uuidv4().replace(/-/g, "").slice(0, 16);
  let tokenUpperAndLowercase = "";

  // convert some characters to uppercase
  for (let i = 0; i < tokenOnlyLowercase.length; i++) {
    const character = tokenOnlyLowercase[i];
    const isUppercase = Math.random() < 0.4; // 50% de probabilidad de ser mayúscula

    // changes to uppercase always "isUppercase" is true
    const modifiedCharacter = isUppercase
      ? character.toUpperCase()
      : character.toLowerCase();

    tokenUpperAndLowercase += modifiedCharacter;
  }
  return tokenUpperAndLowercase;
};

export { generateToken };

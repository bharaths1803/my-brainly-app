import crypto from "crypto";

const hashString = () => {
  const randomHash = crypto.randomBytes(32).toString('hex');
  console.log(randomHash)
  return randomHash
}

export default hashString
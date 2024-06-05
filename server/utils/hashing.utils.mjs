import * as bcrypt from "bcrypt";

const saltRounds = 10;

export async function checkPassword(password, hashed) {
  return await bcrypt.compare(password, hashed);
}

export async function hashPassword(password) {
  try {
    let hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

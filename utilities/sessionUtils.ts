import jwt from 'jsonwebtoken';
import crypto, { randomBytes } from 'crypto';

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomBytes = crypto.randomBytes(1);
      const randomIndex =  randomBytes[0] % characters.length;
      randomString += characters[randomIndex];
    }
  
    return randomString;
  }

export function generateSessionToken(userId: string): string {
  const secret = generateRandomString(32); // Replace with your secret key
  const expiration = '50m';// Session expiration time in seconds (e.g., 50 minutes)

  const token = jwt.sign({ userId }, secret, { expiresIn: expiration });
  console.log(token)
  return token;
}
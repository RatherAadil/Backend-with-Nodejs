import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';

const fileContent = await readFile('./loan-agreement-signed.md', 'utf-8');
const [newFileContent, Signature] = fileContent.split('Signature:');
const mySecretKey = 'my-super-secret-key';

const newSignature = crypto
  .createHash('sha256')
  .update(newFileContent + 'Signature:\r\n')
  .update(mySecretKey)
  .digest('base64url');

if (Signature.trim() === newSignature) {
  console.log('Perfect,the letter is valid. Here is your money');
} else {
  console.log('Oh no, the letter has been modified. I can"t give you money.');
}

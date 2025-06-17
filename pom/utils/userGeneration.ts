import { generateName, generateLastName } from './nameGeneration';
import { generateEmail } from './emailGeneration';
import { generateStrongPassword } from './passwordGeneration';

// Опис типу результату
interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function fillValidRegistrationForm(): RegistrationForm {
  const firstName: string = generateName();
  const lastName: string = generateLastName();
  const email: string = generateEmail(firstName);
  const password: string = generateStrongPassword();

  return { firstName, lastName, email, password };
}
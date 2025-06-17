export function generateStrongPassword(): string {
  const upper: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower: string  = 'abcdefghijklmnopqrstuvwxyz';
  const digits: string  = '0123456789';
  const getRand = (str: string): string => str[Math.floor(Math.random() * str.length)];

  let password: string = getRand(upper) + getRand(lower) + getRand(digits);
  for (let i = 0; i < 7; i++) {
    password += getRand(upper + lower + digits);
  }
  return password;
}
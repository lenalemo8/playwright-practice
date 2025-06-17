export function generateEmail(name: string): string {
  const domains: string[] = ['example.com', 'testmail.com', 'myapp.dev'];
  const randomNum: number = Math.floor(Math.random() * 1000);
  const randomDomain: string = domains[Math.floor(Math.random() * domains.length)];

  return `${name.toLowerCase()}${randomNum}@${randomDomain}`;
}
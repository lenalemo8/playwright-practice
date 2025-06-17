export function generateName(): string {
  const names: string[] = ['John', 'Helen', 'Alice', 'Max', 'Olivia', 'Liam', 'Emma'];
  return names[Math.floor(Math.random() * names.length)];
}

export function generateLastName(): string {
  const namesLast: string [] = ['Smith', 'Johnson', 'Brown', 'Williams', 'Taylor'];
  return namesLast[Math.floor(Math.random() * namesLast.length)];
}
export class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    authorities: Authority[];
}

interface Authority{
  id: number,
  name: string,
}

export class Hero {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = ''
  ) {}
}

export class Villain {
  constructor(
    public id: number,
    public name: string = '',
    public description: string = '',
    public quantity: number = 0
  ) {}
}

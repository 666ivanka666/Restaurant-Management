export class MenuItem {
  constructor(
    public id: string,
    public restaurantId: string,
    public menuId: string,
    public name: string,
    public description: string,
    public price: number,
  ) {}
}

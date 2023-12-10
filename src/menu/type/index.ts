// export interface MenuItems {
//   // // definicija vašeg tipa MenuItems   pitati marka dali je to ok
// }  pitati merka koje je ispravno

import { MenuItem } from 'src/menu_item/type';
export class Menu {
  constructor(
    public id: string,
    public restaurantId: string,
    public title: string,
    public description: string,
    public menusItems: MenuItem[],
  ) {}
}

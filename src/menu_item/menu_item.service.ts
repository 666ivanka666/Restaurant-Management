import { Injectable, NotAcceptableException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { MenuItem } from './type';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { MenuService } from 'src/menu/menu.service';

@Injectable()
export class MenuItemService {
  private menuItems: MenuItem[] = [];
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly menuService: MenuService,
  ) {}

  insertMenuItem(
    restaurantId: string,
    menuId: string,
    name: string,
    description: string,
    price: number,
  ): string {
    const menuItemId = uuidv4();
    this.restaurantService.findRestaurant(restaurantId);
    this.menuService.findMenu(menuId);

    this.menuItems.push(
      new MenuItem(menuItemId, restaurantId, menuId, name, description, price),
    );
    return menuItemId;
  }

  getMenuItem(): MenuItem[] {
    return this.menuItems;
  }
  getSingleMenuItem(menuItemId: string): MenuItem {
    const [menuItem] = this.findMenuItem(menuItemId);
    return menuItem;
  }

  updateMenuItem(
    menuItemId: string,
    restaurantId: string,
    menuId: string,
    name: string,
    description: string,
    price: number,
  ): MenuItem {
    this.restaurantService.findRestaurant(restaurantId);
    this.menuService.findMenu(menuId);
    const [menuItem] = this.findMenuItem(menuItemId);

    if (restaurantId) {
      menuItem.restaurantId = restaurantId;
    }
    if (menuId) {
      menuItem.menuId = menuId;
    }
    if (name) {
      menuItem.name = name;
    }

    if (description) {
      menuItem.description = description;
    }

    if (price) {
      menuItem.price = price;
    }

    return menuItem;
  }

  deleteMenuItem(menuItemId: string): { message: string } {
    const [, index] = this.findMenuItem(menuItemId);
    this.menuItems.splice(index, 1);
    return { message: 'Uspijesno izbrisano' };
  }

  findMenuItem(id: string): [MenuItem, number] {
    const menuItemIndex = this.menuItems.findIndex(
      (menuItem) => menuItem.id === id,
    );
    if (menuItemIndex === -1) {
      throw new NotAcceptableException(` MenuItem with ID ${id} not found`);
    }

    return [this.menuItems[menuItemIndex], menuItemIndex];
  }
}

import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MenuItemService } from './menu_item.service';
import { MenuItem } from './type';
import { IdDto } from 'src/common/decorators';
import { MenuItemDto } from './dto';

@Controller('menuitem')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  addMenuItem(@Body() body: MenuItemDto): { id: string } {
    const generatedId = this.menuItemService.insertMenuItem(
      body.menuId,
      body.restaurantId,
      body.name,
      body.description,
      body.price,
    );
    return { id: generatedId };
  }

  @Get()
  getAllMenuItem(): MenuItem[] {
    return this.menuItemService.getMenuItem();
  }

  @Get(':id')
  getMenuItemById(@Param() params: IdDto): MenuItem {
    return this.menuItemService.getSingleMenuItem(params.id);
  }

  @Put(':id')
  updateMenuItem(@Param() params: IdDto, @Body() body: MenuItemDto): MenuItem {
    const { id } = params;
    return this.menuItemService.updateMenuItem(
      id,
      body.restaurantId,
      body.menuId,
      body.name,
      body.description,
      body.price,
    );
  }

  @Delete(':id')
  deleteMenuItemById(@Param() params: IdDto): { message: string } {
    return this.menuItemService.deleteMenuItem(params.id);
  }
}

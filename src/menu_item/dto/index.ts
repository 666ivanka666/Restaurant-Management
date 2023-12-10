import { IsNotEmpty, IsString, IsNumber, IsUUID } from 'class-validator';

export class MenuItemDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  menuId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

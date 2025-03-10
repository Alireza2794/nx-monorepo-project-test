import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService, ProductModel } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('product')
  getProductData(@Query('query') query: string): { data: ProductModel[] } {
    return this.appService.getProductData(query);
  }

  @Post('product')
  insertProduct(@Body() body: ProductModel) {
    const newProduct = this.appService.insertProduct(body);
    return {
      message: 'Product inserted successfully',
      data: newProduct,
      result: true,
    };
  }

  @Put('product/:id')
  updateProduct(@Param('id') id: number, @Body() body: ProductModel) {
    const updatedProduct = this.appService.updateProduct(Number(id), body);
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product updated successfully', data: updatedProduct };
  }

  @Delete('product/:id')
  deleteProduct(@Param('id') id: number) {
    const isDeleted = this.appService.deleteProduct(Number(id));
    if (!isDeleted) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product deleted successfully' };
  }
}

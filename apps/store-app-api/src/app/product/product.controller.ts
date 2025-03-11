import { DeleteStatue, ProductModel, ProductService } from './product.service';
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  getProductData(@Query('query') query: string): { data: ProductModel[] } {
    return this.productService.getProductData(query);
  }

  @Post('')
  insertProduct(@Body() body: ProductModel) {
    const newProduct = this.productService.insertProduct(body);
    return {
      message: 'Product inserted successfully',
      data: newProduct,
      result: true,
    };
  }

  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() body: ProductModel) {
    const updatedProduct = this.productService.updateProduct(Number(id), body);
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product updated successfully', data: updatedProduct };
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    const status = this.productService.deleteProduct(Number(id));
    if (status === DeleteStatue.NotFount) {
      throw new NotFoundException('Product not found');
    } else if (status === DeleteStatue.inCart) {
      throw new ConflictException(
        'This product is in the shopping cart and cannot be removed.'
      );
    }
    return { message: 'Product deleted successfully' };
  }
}

import type { Meta, StoryObj } from '@storybook/angular';
import { UiCardProductStoreComponent } from './ui-card-product-store.component';
import { action } from '@storybook/addon-actions';

const meta: Meta<UiCardProductStoreComponent> = {
  component: UiCardProductStoreComponent,
  title: 'UiCardProductStoreComponent',
  // در صورت نیاز، moduleMetadata رو هم می‌توانید اضافه کنید
  argTypes: {
    addToCart: { action: 'addToCart' },
    edit: { action: 'edit' },
    remove: { action: 'remove' },
    removeFromCart: { action: 'removeFromCart' },
  },
};
export default meta;
type Story = StoryObj<UiCardProductStoreComponent>;

// استوری زمانی که محصول هنوز به سبد اضافه نشده (دکمه Add To Cart نمایش داده شود)
export const Primary: Story = {
  args: {
    Product: {
      id: 1,
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Product Test',
      price: '100',
      description:
        'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain.',
      countSelected: 0, // وقتی ۰ یا نال باشد، دکمه Add To Cart نمایش داده می‌شود
    },
  },
};

// استوری زمانی که محصول به سبد اضافه شده (دکمه Remove From Cart نمایش داده شود)
export const InCart: Story = {
  args: {
    Product: {
      id: 2,
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Product Dog',
      price: '120',
      description:
        'The Shiba Inu is a small, agile dog originally bred for hunting in Japan.',
      countSelected: 1, // عدد بزرگتر از صفر باعث نمایش دکمه Remove From Cart می‌شود
    },
  },
};

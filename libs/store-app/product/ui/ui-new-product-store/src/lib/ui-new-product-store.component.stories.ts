import type { Meta, StoryObj } from '@storybook/angular';
import { UiNewProductStoreComponent } from './ui-new-product-store.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UiNewProductStoreComponent> = {
  component: UiNewProductStoreComponent,
  title: 'UiNewProductStoreComponent',
};
export default meta;
type Story = StoryObj<UiNewProductStoreComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/ui-new-product-store works!/gi)).toBeTruthy();
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { UiCardProductStoreComponent } from './ui-card-product-store.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UiCardProductStoreComponent> = {
  component: UiCardProductStoreComponent,
  title: 'UiCardProductStoreComponent',
};
export default meta;
type Story = StoryObj<UiCardProductStoreComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/ui-card-product-store works!/gi)).toBeTruthy();
  },
};

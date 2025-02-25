import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'MyButtonComponent',
};
export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    text: 'Click me!',
    padding: 10,
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    primary: false,
  },
};

export const Heading: Story = {
  args: {
    text: 'Click me!',
    padding: 10,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/button works!/gi)).toBeTruthy();
  },
};

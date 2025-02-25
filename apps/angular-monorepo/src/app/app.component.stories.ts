import type { Meta, StoryObj } from '@storybook/angular';
import { AppComponent } from './app.component';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AppComponent> = {
  component: AppComponent,
  title: 'AppComponent',
};
export default meta;
type Story = StoryObj<AppComponent>;

export const Primary: Story = {
  args: {
    title: 'angular-monorepo',
    loading: false,
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/app works!/gi)).toBeTruthy();
  },
};


export const ClickExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));
  },
};

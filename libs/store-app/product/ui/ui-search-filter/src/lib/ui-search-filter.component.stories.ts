import type { Meta, StoryObj } from '@storybook/angular';
import { UiSearchFilterComponent } from './ui-search-filter.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UiSearchFilterComponent> = {
  component: UiSearchFilterComponent,
  title: 'UiSearchFilterComponent',
};
export default meta;
type Story = StoryObj<UiSearchFilterComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/ui-search-filter works!/gi)).toBeTruthy();
  },
};

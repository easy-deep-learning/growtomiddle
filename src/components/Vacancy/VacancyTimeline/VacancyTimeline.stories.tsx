import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Meta, StoryObj } from '@storybook/react';

import { VacancyTimeline, type VacancyStatus } from './VacancyTimeline';

const meta: Meta<typeof VacancyTimeline> = {
  title: 'Components/Vacancy/VacancyTimeline',
  component: VacancyTimeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A timeline component that displays the progression of a vacancy application through different stages: Bookmarked, Applying, Applied, Interviewing, Negotiating, and Accepted.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AntdRegistry>
        <Story />
      </AntdRegistry>
    ),
  ],
  argTypes: {
    currentStatus: {
      control: 'select',
      options: ['BOOKMARKED', 'APPLYING', 'APPLIED', 'INTERVIEWING', 'NEGOTIATING', 'ACCEPTED'],
      description: 'The current status of the vacancy application',
    },
    mode: {
      control: 'select',
      options: ['left', 'alternate', 'right'],
      description: 'The layout mode of the timeline',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VacancyTimeline>;

export const Bookmarked: Story = {
  args: {
    currentStatus: 'BOOKMARKED',
    mode: 'left',
  },
};

export const Applying: Story = {
  args: {
    currentStatus: 'APPLYING',
    mode: 'left',
  },
};

export const Applied: Story = {
  args: {
    currentStatus: 'APPLIED',
    mode: 'left',
  },
};

export const Interviewing: Story = {
  args: {
    currentStatus: 'INTERVIEWING',
    mode: 'left',
  },
};

export const Negotiating: Story = {
  args: {
    currentStatus: 'NEGOTIATING',
    mode: 'left',
  },
};

export const Accepted: Story = {
  args: {
    currentStatus: 'ACCEPTED',
    mode: 'left',
  },
};

export const AlternateMode: Story = {
  args: {
    currentStatus: 'INTERVIEWING',
    mode: 'alternate',
  },
};

export const RightMode: Story = {
  args: {
    currentStatus: 'APPLIED',
    mode: 'right',
  },
};

export const AllStages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Bookmarked</h3>
        <VacancyTimeline currentStatus="BOOKMARKED" />
      </div>
      <div>
        <h3>Applying</h3>
        <VacancyTimeline currentStatus="APPLYING" />
      </div>
      <div>
        <h3>Applied</h3>
        <VacancyTimeline currentStatus="APPLIED" />
      </div>
      <div>
        <h3>Interviewing</h3>
        <VacancyTimeline currentStatus="INTERVIEWING" />
      </div>
      <div>
        <h3>Negotiating</h3>
        <VacancyTimeline currentStatus="NEGOTIATING" />
      </div>
      <div>
        <h3>Accepted</h3>
        <VacancyTimeline currentStatus="ACCEPTED" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All stages of the vacancy timeline displayed together for comparison.',
      },
    },
  },
};

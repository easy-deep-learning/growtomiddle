'use client';

import React from 'react';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Timeline, Typography } from 'antd';

import styles from './VacancyTimeline.module.css';

const { Text } = Typography;

export type VacancyStatus =
  | 'BOOKMARKED'
  | 'APPLYING'
  | 'APPLIED'
  | 'INTERVIEWING'
  | 'NEGOTIATING'
  | 'ACCEPTED';

interface VacancyTimelineProps {
  currentStatus: VacancyStatus;
  className?: string;
  mode?: 'left' | 'alternate' | 'right';
}

const STATUS_ORDER: VacancyStatus[] = [
  'BOOKMARKED',
  'APPLYING',
  'APPLIED',
  'INTERVIEWING',
  'NEGOTIATING',
  'ACCEPTED',
];

const STATUS_LABELS: Record<VacancyStatus, string> = {
  BOOKMARKED: 'Bookmarked',
  APPLYING: 'Applying',
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  NEGOTIATING: 'Negotiating',
  ACCEPTED: 'Accepted',
};

export const VacancyTimeline: React.FC<VacancyTimelineProps> = ({
  currentStatus,
  className,
  mode = 'left',
}) => {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  const getStatusColor = (index: number) => {
    if (index < currentIndex) {
      return 'green'; // Completed
    }
    if (index === currentIndex) {
      return 'blue'; // Current
    }
    return 'gray'; // Pending
  };

  const getStatusIcon = (index: number) => {
    if (index < currentIndex) {
      return <CheckCircleOutlined />;
    }
    if (index === currentIndex) {
      return <ClockCircleOutlined />;
    }
    return null;
  };

  const timelineItems = STATUS_ORDER.map((status, index) => {
    const isCompleted = index < currentIndex;
    const isCurrent = index === currentIndex;
    const isPending = index > currentIndex;

    return {
      color: getStatusColor(index),
      dot: getStatusIcon(index),
      children: (
        <div className={styles.timelineItem}>
          <Text
            strong={isCurrent || isCompleted}
            type={isPending ? 'secondary' : undefined}
            className={isCurrent ? styles.currentStatus : ''}
          >
            {STATUS_LABELS[status]}
          </Text>
          {isCurrent && (
            <Text type="secondary" className={styles.currentBadge}>
              Current
            </Text>
          )}
        </div>
      ),
    };
  });

  return (
    <div className={`${styles.timelineContainer} ${className || ''}`}>
      <Timeline items={timelineItems} mode={mode} />
    </div>
  );
};

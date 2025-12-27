'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Flex, Space, Spin, Tabs } from 'antd';
import Link from 'next/link';

import type { IVacancy } from '@/database/models/Vacancy';

import { VacancyCard } from './VacancyCard';

interface VacancyListProps {
  vacancies: IVacancy[];
}

export const VacancyList: React.FC<VacancyListProps> = ({ vacancies }) => {
  return (
    <div>
      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy._id} vacancy={vacancy} />
      ))}
    </div>
  );
};

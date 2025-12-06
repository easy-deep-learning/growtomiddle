'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Flex, Space, Spin, Tabs } from 'antd';

import type { IVacancy } from '@/database/models/Vacancy';

import { VacancyCard } from './VacancyCard';

interface VacancyListProps {
  vacancies: IVacancy[];
  loading?: boolean;
  onEdit: (vacancy: IVacancy) => void;
  onDelete: (id: string) => void;
  onToggleSave: (id: string, isSaved: boolean) => void;
  onCreateNew: () => void;
}

export const VacancyList: React.FC<VacancyListProps> = ({
  vacancies,
  loading = false,
  onEdit,
  onDelete,
  onToggleSave,
  onCreateNew,
}) => {
  const savedVacancies = vacancies.filter((v) => v.isSaved);
  const allVacancies = vacancies;

  const tabItems = [
    {
      key: 'all',
      label: `All (${allVacancies.length})`,
      children:
        allVacancies.length === 0 ? (
          <Empty description="No vacancies found" />
        ) : (
          <Flex vertical gap="middle">
            {allVacancies.map((vacancy) => (
              <VacancyCard
                key={vacancy._id}
                vacancy={vacancy}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleSave={onToggleSave}
              />
            ))}
          </Flex>
        ),
    },
    {
      key: 'saved',
      label: `Saved (${savedVacancies.length})`,
      children:
        savedVacancies.length === 0 ? (
          <Empty description="No saved vacancies" />
        ) : (
          <Flex vertical gap="middle">
            {savedVacancies.map((vacancy) => (
              <VacancyCard
                key={vacancy._id}
                vacancy={vacancy}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleSave={onToggleSave}
              />
            ))}
          </Flex>
        ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>Vacancies</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreateNew} size="large">
          Add New Vacancy
        </Button>
      </Space>
      <Tabs items={tabItems} />
    </div>
  );
};

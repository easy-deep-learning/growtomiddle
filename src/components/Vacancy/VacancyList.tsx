'use client';

import type { IVacancy } from '@/database/models/Vacancy';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, List, Space, Spin, Tabs } from 'antd';

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
      children: (
        <List
          dataSource={allVacancies}
          renderItem={(vacancy) => (
            <List.Item key={vacancy._id}>
              <VacancyCard
                vacancy={vacancy}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleSave={onToggleSave}
              />
            </List.Item>
          )}
          locale={{ emptyText: <Empty description="No vacancies found" /> }}
        />
      ),
    },
    {
      key: 'saved',
      label: `Saved (${savedVacancies.length})`,
      children: (
        <List
          dataSource={savedVacancies}
          renderItem={(vacancy) => (
            <List.Item key={vacancy._id}>
              <VacancyCard
                vacancy={vacancy}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleSave={onToggleSave}
              />
            </List.Item>
          )}
          locale={{ emptyText: <Empty description="No saved vacancies" /> }}
        />
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

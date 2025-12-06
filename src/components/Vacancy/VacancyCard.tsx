'use client';

import { BookOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Space, Tag, Typography } from 'antd';

import type { IVacancy } from '@/database/models/Vacancy';

const { Title, Text, Paragraph } = Typography;

interface VacancyCardProps {
  vacancy: IVacancy;
  onEdit: (vacancy: IVacancy) => void;
  onDelete: (id: string) => void;
  onToggleSave: (id: string, isSaved: boolean) => void;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({
  vacancy,
  onEdit,
  onDelete,
  onToggleSave,
}) => {
  const formatSalary = () => {
    if (!vacancy.salaryRange) return null;
    const { from, to, currency = 'EUR', gross } = vacancy.salaryRange;
    if (!from && !to) return null;

    const salary = to ? `${from || ''} - ${to}` : `${from}`;
    return `${salary} ${currency}${gross ? ' (gross)' : ' (net)'}`;
  };

  const getSizeColor = (size: string) => {
    switch (size) {
      case 'small':
        return 'blue';
      case 'medium':
        return 'orange';
      case 'large':
        return 'red';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'startup':
        return 'cyan';
      case 'enterprise':
        return 'purple';
      case 'government':
        return 'green';
      case 'non-profit':
        return 'volcano';
      default:
        return 'default';
    }
  };

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'junior':
        return 'lime';
      case 'middle':
        return 'orange';
      case 'senior':
        return 'red';
      case 'lead':
        return 'magenta';
      default:
        return 'default';
    }
  };

  return (
    <Card
      hoverable
      style={{ marginBottom: 16 }}
      actions={[
        <Button
          key="save"
          type={vacancy.isSaved ? 'primary' : 'default'}
          icon={<BookOutlined />}
          onClick={() => onToggleSave(vacancy._id, !vacancy.isSaved)}
        >
          {vacancy.isSaved ? 'Saved' : 'Save'}
        </Button>,
        <Button key="edit" icon={<EditOutlined />} onClick={() => onEdit(vacancy)}>
          Edit
        </Button>,
        <Button key="delete" danger icon={<DeleteOutlined />} onClick={() => onDelete(vacancy._id)}>
          Delete
        </Button>,
      ]}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Title level={4} style={{ margin: 0 }}>
            {vacancy.title}
          </Title>
          {vacancy.isSaved && (
            <Tag color="gold" icon={<BookOutlined />}>
              Saved
            </Tag>
          )}
        </div>

        <Space wrap size="small">
          <Tag color={getSizeColor(vacancy.size)}>{vacancy.size}</Tag>
          <Tag color={getTypeColor(vacancy.type)}>{vacancy.type}</Tag>
          {vacancy.level && <Tag color={getLevelColor(vacancy.level)}>{vacancy.level}</Tag>}
          {vacancy.employmentType && <Tag>{vacancy.employmentType}</Tag>}
          <Tag>{vacancy.source}</Tag>
        </Space>

        {vacancy.location && <Text type="secondary">📍 {vacancy.location}</Text>}

        {vacancy.techStack && vacancy.techStack.length > 0 && (
          <div>
            <Text strong>Tech Stack: </Text>
            <Space wrap size="small">
              {vacancy.techStack.map((tech, index) => (
                <Tag key={index}>{tech}</Tag>
              ))}
            </Space>
          </div>
        )}

        {formatSalary() && <Text strong>💰 {formatSalary()}</Text>}

        {vacancy.descriptionSnippet && (
          <Paragraph ellipsis={{ rows: 2, expandable: false }}>
            {vacancy.descriptionSnippet}
          </Paragraph>
        )}

        {vacancy.sourceUrl && (
          <a href={vacancy.sourceUrl} target="_blank" rel="noopener noreferrer">
            View Original Post
          </a>
        )}
      </Space>
    </Card>
  );
};

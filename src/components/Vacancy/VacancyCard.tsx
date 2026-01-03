import { BookOutlined } from '@ant-design/icons';
import { Card, Space, Tag } from 'antd';

import {
  VacancyLevel,
  VacancySize,
  VacancyType,
  type VacancyDocument,
} from '@/database/models/Vacancy';
import { Link, Paragraph, Text, Title } from '@/components/ServerSideAntD';

interface VacancyCardProps {
  vacancy: VacancyDocument;
}

const getSizeColor = (size: VacancySize) => {
  switch (size) {
    case VacancySize.SMALL:
      return 'blue';
    case VacancySize.MEDIUM:
      return 'orange';
    case VacancySize.LARGE:
      return 'red';
    default:
      return 'default';
  }
};

const getTypeColor = (type: VacancyType) => {
  switch (type) {
    case VacancyType.STARTUP:
      return 'cyan';
    case VacancyType.ENTERPRISE:
      return 'purple';
    case VacancyType.GOVERNMENT:
      return 'green';
    case VacancyType.NON_PROFIT:
      return 'volcano';
    default:
      return 'default';
  }
};

const getLevelColor = (level?: VacancyLevel) => {
  switch (level) {
    case VacancyLevel.JUNIOR:
      return 'lime';
    case VacancyLevel.MIDDLE:
      return 'orange';
    case VacancyLevel.SENIOR:
      return 'red';
    case VacancyLevel.LEAD:
      return 'magenta';
    default:
      return 'default';
  }
};

export const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Space orientation="vertical" size="small">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            <Link href={`/vacancies/${vacancy._id}`}>{vacancy?.title}</Link>
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

import { Card, Space, Tag } from 'antd';

import { type VacancyDocument } from '@/database/models/Vacancy';
import { Link, Paragraph, Text, Title } from '@/components/ServerSideAntD';

interface VacancyCardProps {
  vacancy: VacancyDocument;
  rows?: number;
  expandable?: boolean;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({
  vacancy,
  rows = 2,
  expandable = false,
}) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Space orientation="vertical" size="small">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            <Link href={`/vacancies/${vacancy.id}`}>{vacancy?.title}</Link>
          </Title>
        </div>

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
          <Paragraph ellipsis={{ rows, expandable }}>{vacancy.descriptionSnippet}</Paragraph>
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

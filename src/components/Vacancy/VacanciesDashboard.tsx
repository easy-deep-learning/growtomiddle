'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Flex, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import Link from 'next/link';

import type { IVacancy } from '@/database/models/Vacancy';

const { Title, Text } = Typography;

interface VacanciesDashboardProps {
  vacancies: IVacancy[];
}

export const VacanciesDashboard: React.FC<VacanciesDashboardProps> = ({ vacancies }) => {
  return (
    <Card
      title="Latest Vacancies"
      extra={
        <Link href="/vacancies">
          <Button type="link" icon={<ArrowRightOutlined />} size="small">
            View all
          </Button>
        </Link>
      }
    >
      {vacancies.length === 0 ? (
        <Empty description="No vacancies yet" />
      ) : (
        <Flex vertical gap="middle">
          {vacancies.map((vacancy) => (
            <Flex
              key={vacancy._id}
              align="flex-start"
              justify="space-between"
              style={{
                padding: '12px 0',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <Flex vertical gap="small" style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Title level={5} style={{ margin: 0 }}>
                    {vacancy.title}
                  </Title>
                  <Tag color="blue">{vacancy.size}</Tag>
                  <Tag>{vacancy.type}</Tag>
                  {vacancy.level && <Tag color="purple">{vacancy.level}</Tag>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {vacancy.location && <Text type="secondary">📍 {vacancy.location}</Text>}
                    <Text type="secondary">Source: {vacancy.source}</Text>
                    <Text type="secondary">
                      Added {format(new Date(vacancy.createdAt), 'dd.MM.yyyy')}
                    </Text>
                  </div>
                  <Link href={`/vacancies`} style={{ whiteSpace: 'nowrap' }}>
                    Details
                  </Link>
                </div>
              </Flex>
              {vacancy.isSaved && (
                <Tag color="gold" style={{ marginLeft: 16 }}>
                  Saved
                </Tag>
              )}
            </Flex>
          ))}
        </Flex>
      )}
    </Card>
  );
};

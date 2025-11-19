"use client";

import { Card, List, Tag, Typography, Empty, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";

import type { IVacancy } from "@/database/models/Vacancy";

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
        <List
          itemLayout="horizontal"
          dataSource={vacancies}
          renderItem={(vacancy) => (
            <List.Item
              key={vacancy._id}
              actions={[
                vacancy.isSaved ? (
                  <Tag color="gold" key="saved">
                    Saved
                  </Tag>
                ) : null,
              ]}
            >
              <List.Item.Meta
                title={
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    <Title level={5} style={{ margin: 0 }}>
                      {vacancy.title}
                    </Title>
                    <Tag color="blue">{vacancy.size}</Tag>
                    <Tag>{vacancy.type}</Tag>
                    {vacancy.level && <Tag color="purple">{vacancy.level}</Tag>}
                  </div>
                }
                description={
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {vacancy.location && <Text type="secondary">📍 {vacancy.location}</Text>}
                      <Text type="secondary">Source: {vacancy.source}</Text>
                      <Text type="secondary">
                        Added {new Date(vacancy.createdAt).toLocaleDateString()}
                      </Text>
                    </div>
                    <Link href={`/vacancies`} style={{ whiteSpace: "nowrap" }}>
                      Details
                    </Link>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};


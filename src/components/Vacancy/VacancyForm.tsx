'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import type { VacancyDocument } from '@/database/models/Vacancy';

const { TextArea } = Input;

interface VacancyFormProps {
  vacancy?: VacancyDocument;
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  sourceUrl: z.url({ message: 'Source URL is invalid' }),
  location: z.string().min(1, { message: 'Location is required' }),
  techStack: z.string().min(1, { message: 'Tech stack is required' }),
  salary: z.number().min(0, { message: 'Salary is required' }),
  descriptionSnippet: z.string().min(1, { message: 'Description is required' }).optional(),
});

// Place outside component if not already
const createVacancy = async (vacancyData: any) => {
  const response = await fetch('/api/vacancies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vacancyData),
  });
  if (!response.ok) {
    throw new Error('Failed to create vacancy');
  }
  return response.json();
};

export const VacancyForm: React.FC<VacancyFormProps> = ({ vacancy }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: vacancy?.title || '',
      sourceUrl: vacancy?.sourceUrl || '',
      location: vacancy?.location || '',
      techStack: vacancy?.techStack?.join(', ') || '',
      salary: vacancy?.salary || 0,
      descriptionSnippet: vacancy?.descriptionSnippet || '',
    } as z.infer<typeof formSchema>,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);

    const vacancyData = {
      title: data.title,
      sourceUrl: data.sourceUrl,
      location: data.location,
      techStack: data.techStack.split(',').map((tech) => tech.trim()),
      descriptionSnippet: data.descriptionSnippet,
    };

    const newVacancy = await createVacancy(vacancyData);
    console.log('>>> newVacancy', newVacancy);
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Form.Item name="title" label="Title" help={errors.title?.message}>
            <Input placeholder="e.g., Senior Frontend Developer" {...field} />
          </Form.Item>
        )}
      />

      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="sourceUrl"
            control={control}
            render={({ field }) => (
              <Form.Item name="sourceUrl" label="Source URL" help={errors.sourceUrl?.message}>
                <Input placeholder="https://..." {...field} />
              </Form.Item>
            )}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Form.Item name="location" label="Location" help={errors.location?.message}>
                <Input placeholder="e.g., Berlin, Germany" {...field} />
              </Form.Item>
            )}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="salary"
            control={control}
            render={({ field }) => (
              <Form.Item name="salary" label="Salary" help={errors.salary?.message}>
                <InputNumber style={{ width: '100%' }} placeholder="Salary" min={0} {...field} />
              </Form.Item>
            )}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="techStack"
            control={control}
            render={({ field }) => (
              <Form.Item name="techStack" label="Tech Stack" help={errors.techStack?.message}>
                <Input placeholder="Comma-separated: React, TypeScript, Node.js" {...field} />
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <Controller
        name="descriptionSnippet"
        control={control}
        render={({ field }) => (
          <Form.Item
            name="descriptionSnippet"
            label="Description"
            help={errors.descriptionSnippet?.message}
          >
            <TextArea rows={4} placeholder="Brief description of the position..." {...field} />
          </Form.Item>
        )}
      />
      <Button type="primary" htmlType="submit">
        {vacancy ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
};

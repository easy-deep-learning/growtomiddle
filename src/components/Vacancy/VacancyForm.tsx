'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Col, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import type { VacancyDocument } from '@/database/models/Vacancy';
import {
  Currency,
  EmploymentType,
  VacancyLevel,
  VacancySize,
  VacancySource,
  VacancyType,
} from '@/database/models/Vacancy';

const { TextArea } = Input;
const { Option } = Select;

interface VacancyFormProps {
  vacancy?: VacancyDocument;
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  size: z.enum(VacancySize, { message: 'Company size is required' }),
  type: z.enum(VacancyType, {
    message: 'Company type is required',
  }),
  source: z.enum(VacancySource, {
    message: 'Source is required',
  }),
  sourceUrl: z.url({ message: 'Source URL is invalid' }),
  location: z.string().min(1, { message: 'Location is required' }),
  employmentType: z.enum(EmploymentType, {
    message: 'Employment type is required',
  }),
  level: z.enum(VacancyLevel, { message: 'Level is required' }),
  techStack: z.string().min(1, { message: 'Tech stack is required' }),
  salaryFrom: z.number().min(0, { message: 'Salary from is required' }),
  salaryTo: z.number().min(0, { message: 'Salary to is required' }),
  salaryCurrency: z.enum(Currency, { message: 'Currency is required' }),
  salaryGross: z.boolean({ message: 'Gross is required' }),
  descriptionSnippet: z.string().min(1, { message: 'Description is required' }).optional(),
  notes: z.string().min(1, { message: 'Notes are required' }),
  isSaved: z.boolean({ message: 'Is saved is required' }),
});

export const VacancyForm: React.FC<VacancyFormProps> = ({ vacancy }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: vacancy?.title || '',
      size: vacancy?.size || VacancySize.MEDIUM,
      type: vacancy?.type || VacancyType.STARTUP,
      source: vacancy?.source || VacancySource.LINKEDIN,
      sourceUrl: vacancy?.sourceUrl || '',
      location: vacancy?.location || '',
      employmentType: vacancy?.employmentType || EmploymentType.FULL_TIME,
      level: vacancy?.level || VacancyLevel.JUNIOR,
      techStack: vacancy?.techStack?.join(', ') || '',
      salaryFrom: vacancy?.salaryRange?.from || 0,
      salaryTo: vacancy?.salaryRange?.to || 0,
      salaryCurrency: vacancy?.salaryRange?.currency || Currency.EUR,
      salaryGross: vacancy?.salaryRange?.gross || false,
      descriptionSnippet: vacancy?.descriptionSnippet || '',
      notes: vacancy?.notes || '',
      isSaved: vacancy?.isSaved || false,
    } as z.infer<typeof formSchema>,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

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
            name="size"
            control={control}
            render={({ field }) => (
              <Form.Item name="size" label="Company Size" help={errors.size?.message}>
                <Select {...field}>
                  <Option value="small">Small (1-50)</Option>
                  <Option value="medium">Medium (51-200)</Option>
                  <Option value="large">Large (200+)</Option>
                </Select>
              </Form.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Form.Item name="type" label="Company Type" help={errors.type?.message}>
                <Select {...field}>
                  <Option value="startup">Startup</Option>
                  <Option value="enterprise">Enterprise</Option>
                  <Option value="government">Government</Option>
                  <Option value="non-profit">Non-profit</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <Form.Item name="source" label="Source" help={errors.source?.message}>
                <Select {...field}>
                  <Option value="linkedin">LinkedIn</Option>
                  <Option value="xing">Xing</Option>
                  <Option value="indeed">Indeed</Option>
                  <Option value="referral">Referral</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            )}
          />
        </Col>
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
        <Col span={12}>
          <Controller
            name="employmentType"
            control={control}
            render={({ field }) => (
              <Form.Item
                name="employmentType"
                label="Employment Type"
                help={errors.employmentType?.message}
              >
                <Select {...field}>
                  <Option value="full-time">Full-time</Option>
                  <Option value="part-time">Part-time</Option>
                  <Option value="contract">Contract</Option>
                  <Option value="internship">Internship</Option>
                </Select>
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="level"
            control={control}
            render={({ field }) => (
              <Form.Item name="level" label="Level" help={errors.level?.message}>
                <Select {...field}>
                  <Option value="junior">Junior</Option>
                  <Option value="middle">Middle</Option>
                  <Option value="senior">Senior</Option>
                  <Option value="lead">Lead</Option>
                </Select>
              </Form.Item>
            )}
          />
        </Col>
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

      <Row gutter={16}>
        <Col span={8}>
          <Controller
            name="salaryFrom"
            control={control}
            render={({ field }) => (
              <Form.Item name="salaryFrom" label="Salary From" help={errors.salaryFrom?.message}>
                <InputNumber style={{ width: '100%' }} placeholder="Min" min={0} {...field} />
              </Form.Item>
            )}
          />
        </Col>
        <Col span={8}>
          <Controller
            name="salaryTo"
            control={control}
            render={({ field }) => (
              <Form.Item name="salaryTo" label="Salary To" help={errors.salaryTo?.message}>
                <InputNumber style={{ width: '100%' }} placeholder="Max" min={0} {...field} />
              </Form.Item>
            )}
          />
        </Col>
        <Col span={4}>
          <Controller
            name="salaryCurrency"
            control={control}
            render={({ field }) => (
              <Form.Item
                name="salaryCurrency"
                label="Currency"
                help={errors.salaryCurrency?.message}
              >
                <Select {...field}>
                  <Option value="EUR">EUR</Option>
                  <Option value="USD">USD</Option>
                  <Option value="GBP">GBP</Option>
                </Select>
              </Form.Item>
            )}
          />
        </Col>
        <Col span={4}>
          <Controller
            name="salaryGross"
            control={control}
            render={({ field }) => (
              <Form.Item name="salaryGross" label="Gross" valuePropName="checked">
                <Switch {...field} />
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

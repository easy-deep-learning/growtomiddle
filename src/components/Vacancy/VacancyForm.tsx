'use client';

import { Button, Col, Form, Input, InputNumber, Row, Select, Space, Switch } from 'antd';

import type { IVacancy } from '@/database/models/Vacancy';

const { TextArea } = Input;
const { Option } = Select;

interface VacancyFormProps {
  vacancy?: IVacancy;
  onSubmit: (values: Partial<IVacancy>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const VacancyForm: React.FC<VacancyFormProps> = ({
  vacancy,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Transform form values to match IVacancy interface
    const vacancyData: Partial<IVacancy> = {
      ...values,
      techStack: values.techStack
        ? typeof values.techStack === 'string'
          ? values.techStack.split(',').map((t: string) => t.trim())
          : values.techStack
        : undefined,
      salaryRange:
        values.salaryFrom || values.salaryTo
          ? {
              from: values.salaryFrom,
              to: values.salaryTo,
              currency: values.salaryCurrency || 'EUR',
              gross: values.salaryGross || false,
            }
          : undefined,
    };

    // Remove helper fields
    delete vacancyData.salaryFrom;
    delete vacancyData.salaryTo;
    delete vacancyData.salaryCurrency;
    delete vacancyData.salaryGross;

    onSubmit(vacancyData);
  };

  const initialValues = vacancy
    ? {
        ...vacancy,
        techStack: vacancy.techStack?.join(', '),
        salaryFrom: vacancy.salaryRange?.from,
        salaryTo: vacancy.salaryRange?.to,
        salaryCurrency: vacancy.salaryRange?.currency || 'EUR',
        salaryGross: vacancy.salaryRange?.gross || false,
      }
    : {
        size: 'medium',
        type: 'startup',
        source: 'linkedin',
        isSaved: false,
        salaryCurrency: 'EUR',
        salaryGross: false,
      };

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please enter the job title' }]}
      >
        <Input placeholder="e.g., Senior Frontend Developer" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="size" label="Company Size" rules={[{ required: true }]}>
            <Select>
              <Option value="small">Small (1-50)</Option>
              <Option value="medium">Medium (51-200)</Option>
              <Option value="large">Large (200+)</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="type" label="Company Type" rules={[{ required: true }]}>
            <Select>
              <Option value="startup">Startup</Option>
              <Option value="enterprise">Enterprise</Option>
              <Option value="government">Government</Option>
              <Option value="non-profit">Non-profit</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="source" label="Source" rules={[{ required: true }]}>
            <Select>
              <Option value="linkedin">LinkedIn</Option>
              <Option value="xing">Xing</Option>
              <Option value="indeed">Indeed</Option>
              <Option value="referral">Referral</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="sourceUrl" label="Source URL">
            <Input placeholder="https://..." />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="location" label="Location">
            <Input placeholder="e.g., Berlin, Germany" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="employmentType" label="Employment Type">
            <Select placeholder="Select employment type">
              <Option value="full-time">Full-time</Option>
              <Option value="part-time">Part-time</Option>
              <Option value="contract">Contract</Option>
              <Option value="internship">Internship</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="level" label="Level">
            <Select placeholder="Select level">
              <Option value="junior">Junior</Option>
              <Option value="middle">Middle</Option>
              <Option value="senior">Senior</Option>
              <Option value="lead">Lead</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="techStack" label="Tech Stack">
            <Input placeholder="Comma-separated: React, TypeScript, Node.js" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="salaryFrom" label="Salary From">
            <InputNumber style={{ width: '100%' }} placeholder="Min" min={0} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="salaryTo" label="Salary To">
            <InputNumber style={{ width: '100%' }} placeholder="Max" min={0} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="salaryCurrency" label="Currency">
            <Select>
              <Option value="EUR">EUR</Option>
              <Option value="USD">USD</Option>
              <Option value="GBP">GBP</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="salaryGross" label="Gross" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="descriptionSnippet" label="Description">
        <TextArea rows={4} placeholder="Brief description of the position..." />
      </Form.Item>

      <Form.Item name="notes" label="Notes">
        <TextArea rows={3} placeholder="Your personal notes about this vacancy..." />
      </Form.Item>

      <Form.Item name="isSaved" valuePropName="checked">
        <Switch checkedChildren="Saved" unCheckedChildren="Not Saved" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            {vacancy ? 'Update' : 'Create'}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

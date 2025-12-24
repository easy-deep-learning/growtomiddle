'use client';

import { useEffect, useState } from 'react';
import { message, Modal } from 'antd';

import type { IHrQuestion } from '@/database/models/HrQuestion';
// TODO: Import your form and list components
// import { HrQuestionForm, HrQuestionList } from '@/components/HrQuestion';

export default function HrQuestionPage() {
  const [HrQuestions, setHrQuestions] = useState<IHrQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingHrQuestion, setEditingHrQuestion] = useState<IHrQuestion | undefined>();
  const [formLoading, setFormLoading] = useState(false);

  // Fetch HrQuestions
  const fetchHrQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/HrQuestions');
      if (!response.ok) throw new Error('Failed to fetch HrQuestions');
      const data = await response.json();
      setHrQuestions(data);
    } catch (error) {
      console.error('Error fetching HrQuestions:', error);
      message.error('Failed to load HrQuestions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHrQuestions();
  }, []);

  // Create new HrQuestion
  const handleCreate = () => {
    setEditingHrQuestion(undefined);
    setModalVisible(true);
  };

  // Edit HrQuestion
  const handleEdit = (HrQuestion: IHrQuestion) => {
    setEditingHrQuestion(HrQuestion);
    setModalVisible(true);
  };

  // Submit form (create or update)
  const handleSubmit = async (values: Partial<IHrQuestion>) => {
    try {
      setFormLoading(true);
      const url = editingHrQuestion ? `/api/HrQuestions/${editingHrQuestion._id}` : '/api/HrQuestions';
      const method = editingHrQuestion ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to save HrQuestion');

      message.success(
        editingHrQuestion ? 'HrQuestion updated successfully' : 'HrQuestion created successfully'
      );
      setModalVisible(false);
      setEditingHrQuestion(undefined);
      fetchHrQuestions();
    } catch (error) {
      console.error('Error saving HrQuestion:', error);
      message.error('Failed to save HrQuestion');
    } finally {
      setFormLoading(false);
    }
  };

  // Delete HrQuestion
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/HrQuestions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete HrQuestion');

      message.success('HrQuestion deleted successfully');
      fetchHrQuestions();
    } catch (error) {
      console.error('Error deleting HrQuestion:', error);
      message.error('Failed to delete HrQuestion');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' \}}>
      {/* TODO: Replace with your actual list component */}
      <div>
        <h1>HrQuestion</h1>
        <button onClick={handleCreate}>Create New</button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            { HrQuestions.map((HrQuestion) => (
              <li key={ HrQuestion._id }>
                {/* TODO: Display HrQuestion data */}
                <button onClick={() => handleEdit(HrQuestion)}>Edit</button>
                <button onClick={() => handleDelete(HrQuestion._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        title={editingHrQuestion ? 'Edit HrQuestion' : 'Create New HrQuestion'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingHrQuestion(undefined);
        }}
        footer={null}
        width={800}
        destroyOnHidden
      >
        {/* TODO: Replace with your actual form component */}
        <div>
          <p>Form component goes here</p>
          <button onClick={() => handleSubmit({})}>Submit</button>
        </div>
      </Modal>
    </div>
  );
}


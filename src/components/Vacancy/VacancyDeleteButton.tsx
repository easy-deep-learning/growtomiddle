'use client';

import { Button, message, Modal } from 'antd';
import { useRouter } from 'next/navigation';

export const VacancyDeleteButton = ({ vacancyId }: { vacancyId: string }) => {
  const router = useRouter();
  const deleteVacancy = async () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this vacancy?',
      onOk: async () => {
        try {
          const response = await fetch(`/api/vacancies/${vacancyId}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete vacancy');
          message.success('Vacancy deleted successfully');
          router.push('/vacancies');
        } catch (error) {
          console.error('Error deleting vacancy:', error);
          message.error('Failed to delete vacancy');
        }
      },
    });
  };
  return (
    <Button type="primary" danger onClick={deleteVacancy}>
      Delete
    </Button>
  );
};

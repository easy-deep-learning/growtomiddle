"use client";

import { useState, useEffect } from "react";
import { Modal, message, Popconfirm } from "antd";
import { VacancyList, VacancyForm } from "@/components/Vacancy";
import type { IVacancy } from "@/database/models/Vacancy";

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<IVacancy | undefined>();
  const [formLoading, setFormLoading] = useState(false);

  // Fetch vacancies
  const fetchVacancies = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/vacancies");
      if (!response.ok) throw new Error("Failed to fetch vacancies");
      const data = await response.json();
      setVacancies(data);
    } catch (error) {
      console.error("Error fetching vacancies:", error);
      message.error("Failed to load vacancies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  // Create new vacancy
  const handleCreate = () => {
    setEditingVacancy(undefined);
    setModalVisible(true);
  };

  // Edit vacancy
  const handleEdit = (vacancy: IVacancy) => {
    setEditingVacancy(vacancy);
    setModalVisible(true);
  };

  // Submit form (create or update)
  const handleSubmit = async (values: Partial<IVacancy>) => {
    try {
      setFormLoading(true);
      const url = editingVacancy
        ? `/api/vacancies/${editingVacancy._id}`
        : "/api/vacancies";
      const method = editingVacancy ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to save vacancy");

      message.success(
        editingVacancy
          ? "Vacancy updated successfully"
          : "Vacancy created successfully"
      );
      setModalVisible(false);
      setEditingVacancy(undefined);
      fetchVacancies();
    } catch (error) {
      console.error("Error saving vacancy:", error);
      message.error("Failed to save vacancy");
    } finally {
      setFormLoading(false);
    }
  };

  // Delete vacancy
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/vacancies/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete vacancy");

      message.success("Vacancy deleted successfully");
      fetchVacancies();
    } catch (error) {
      console.error("Error deleting vacancy:", error);
      message.error("Failed to delete vacancy");
    }
  };

  // Toggle save status
  const handleToggleSave = async (id: string, isSaved: boolean) => {
    try {
      const response = await fetch(`/api/vacancies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isSaved }),
      });

      if (!response.ok) throw new Error("Failed to update vacancy");

      message.success(isSaved ? "Vacancy saved" : "Vacancy unsaved");
      fetchVacancies();
    } catch (error) {
      console.error("Error updating vacancy:", error);
      message.error("Failed to update vacancy");
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <VacancyList
        vacancies={vacancies}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleSave={handleToggleSave}
        onCreateNew={handleCreate}
      />

      <Modal
        title={editingVacancy ? "Edit Vacancy" : "Create New Vacancy"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingVacancy(undefined);
        }}
        footer={null}
        width={800}
        destroyOnClose
      >
        <VacancyForm
          vacancy={editingVacancy}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalVisible(false);
            setEditingVacancy(undefined);
          }}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
}

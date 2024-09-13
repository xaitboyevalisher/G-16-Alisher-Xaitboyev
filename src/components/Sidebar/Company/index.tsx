/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  deleteCompany,
  editCompany,
  addCompany,
} from "../store/slices/CompanySlice";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Company {
  id: string;
  title: string;
  description?: string;
  image?: string;
  website?: string;
}

const tableStyle = css`
  background-color: #f0f2f5;
  color: #000;
  border-radius: 10px;
  padding: 20px;

  .ant-table-thead > tr > th {
    background-color: #e6f7ff;
    color: #000;
  }

  .ant-table-tbody > tr > td {
    color: #000;
  }
`;

const CompanyTable: React.FC = () => {
  const dispatch = useDispatch();
  const companies = useSelector(
    (state: RootState) => state.companies.companies
  );
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = (record: Company) => {
    setEditingCompany(record);
    setIsEditModalVisible(true);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      image: record.image,
      website: record.website,
    });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCompany(id));
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setEditingCompany(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleSubmitEdit = (values: any) => {
    if (editingCompany) {
      dispatch(editCompany({ ...editingCompany, ...values }));
      handleCloseEditModal();
    }
  };

  const handleSubmitAdd = (values: any) => {
    dispatch(addCompany(values));
    handleCloseAddModal();
  };

  const columns = [
    {
      title: "Rasm",
      dataIndex: "image",
      render: (text: string) => (
        <img src={text} alt="company logo" style={{ width: "80px" }} />
      ),
    },
    {
      title: "Nomi",
      dataIndex: "title",
      sorter: (a: Company, b: Company) => a.title.localeCompare(b.title),
    },
    {
      title: "Tavsif",
      dataIndex: "description",
    },
    {
      title: "Veb-sayt",
      dataIndex: "website",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Harakatlar",
      render: (record: Company) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <div css={tableStyle}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsAddModalVisible(true)}
        style={{ marginBottom: "16px" }}
      >
        Yangi kompaniya qo'shish
      </Button>
      <Table
        columns={columns}
        dataSource={companies}
        rowKey="id"
        pagination={false}
      />
      {/* Edit Modal */}
      <Modal
        visible={isEditModalVisible}
        title="Kompaniyani tahrirlash"
        okText="Saqlash"
        cancelText="Bekor qilish"
        onCancel={handleCloseEditModal}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmitEdit}>
          <Form.Item
            name="title"
            label="Nomi"
            rules={[
              {
                required: true,
                message: "Iltimos, kompaniya nomini kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Tavsif">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Rasm URL manzili">
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Veb-sayt">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* Add Modal */}
      <Modal
        visible={isAddModalVisible}
        title="Yangi kompaniya qo'shish"
        okText="Qo'shish"
        cancelText="Bekor qilish"
        onCancel={handleCloseAddModal}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmitAdd}>
          <Form.Item
            name="title"
            label="Nomi"
            rules={[
              {
                required: true,
                message: "Iltimos, kompaniya nomini kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Tavsif">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Rasm URL manzili">
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Veb-sayt">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompanyTable;

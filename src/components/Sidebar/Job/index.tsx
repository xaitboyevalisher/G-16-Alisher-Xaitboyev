/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteJob, editJob, addJob } from "../store/slices/JobSlice";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Job {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  location?: string;
  salary: string;
  phone?: string;
  email?: string;
  telegram?: string;
  instagram?: string;
  companyId: number;
}

const tableStyle = css`
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 20px;

  .table-container {
    display: flex;
    flex-direction: column;
  }

  .table-header {
    margin-bottom: 16px;
  }

  .ant-table-thead > tr > th {
    background-color: white;
    color: black;
  }

  .ant-table-tbody > tr > td {
    color: black;
  }
`;

const JobsTable: React.FC = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = (record: Job) => {
    setEditingJob(record);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteJob(id));
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setEditingJob(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleSubmitEdit = (values: any) => {
    if (editingJob) {
      dispatch(editJob({ ...editingJob, ...values }));
      handleCloseEditModal();
    }
  };

  const handleSubmitAdd = (values: any) => {
    dispatch(addJob(values));
    handleCloseAddModal();
  };

  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Job, b: Job) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Technologies",
      dataIndex: "technologies",
      key: "technologies",
      render: (technologies: string[]) => technologies.join(", "),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: (_: any, record: Job) => (
        <>
          {record.phone && <div>Phone: {record.phone}</div>}
          {record.email && <div>Email: {record.email}</div>}
          {record.telegram && <div>Telegram: {record.telegram}</div>}
          {record.instagram && <div>Instagram: {record.instagram}</div>}
        </>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (record: Job) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
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
      >
        Add Job
      </Button>
      <div className="table-header"></div>
      <Table
        columns={columns}
        dataSource={jobs}
        rowKey="id"
        pagination={false}
      />
      {/* Edit Modal */}
      <Modal
        visible={isEditModalVisible}
        title="Edit Job"
        okText="Save"
        cancelText="Cancel"
        onCancel={handleCloseEditModal}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmitEdit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the job title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the job description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="technologies"
            label="Technologies"
            rules={[
              { required: true, message: "Please input the technologies!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>
          <Form.Item
            name="salary"
            label="Salary"
            rules={[{ required: true, message: "Please input the salary!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="telegram" label="Telegram">
            <Input />
          </Form.Item>
          <Form.Item name="instagram" label="Instagram">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* Add Modal */}
      <Modal
        visible={isAddModalVisible}
        title="Add Job"
        okText="Add"
        cancelText="Cancel"
        onCancel={handleCloseAddModal}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmitAdd}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the job title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the job description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="technologies"
            label="Technologies"
            rules={[
              { required: true, message: "Please input the technologies!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>
          <Form.Item
            name="salary"
            label="Salary"
            rules={[{ required: true, message: "Please input the salary!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="telegram" label="Telegram">
            <Input />
          </Form.Item>
          <Form.Item name="instagram" label="Instagram">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobsTable;

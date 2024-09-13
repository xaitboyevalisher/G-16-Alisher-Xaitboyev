/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { Table, Button, Space, Drawer, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteJob, editJob, addJob } from "../store/slices/JobSlice";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

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
  const companies = useSelector(
    (state: RootState) => state.companies.companies
  ); // Assuming you have companies in state

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = (record: Job) => {
    setEditingJob(record);
    setIsEditDrawerVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteJob(id));
  };

  const handleCloseEditDrawer = () => {
    setIsEditDrawerVisible(false);
    setEditingJob(null);
  };

  const handleCloseAddDrawer = () => {
    setIsAddDrawerVisible(false);
  };

  const handleSubmitEdit = (values: any) => {
    if (editingJob) {
      dispatch(editJob({ ...editingJob, ...values }));
      handleCloseEditDrawer();
    }
  };

  const handleSubmitAdd = (values: any) => {
    dispatch(addJob(values));
    handleCloseAddDrawer();
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
        onClick={() => setIsAddDrawerVisible(true)}
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
      {/* Edit Drawer */}
      <Drawer
        title="Edit Job"
        width={720}
        visible={isEditDrawerVisible}
        onClose={handleCloseEditDrawer}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={handleCloseEditDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              form="edit-form"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              Save
            </Button>
          </div>
        }
      >
        <Form form={form} id="edit-form" onFinish={handleSubmitEdit}>
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
          <Form.Item
            name="companyId"
            label="Company"
            rules={[{ required: true, message: "Please select a company!" }]}
          >
            <Select placeholder="Select a company">
              {companies.map((company) => (
                <Option key={company.id} value={company.id}>
                  {company.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
      {/* Add Drawer */}
      <Drawer
        title="Add Job"
        width={720}
        visible={isAddDrawerVisible}
        onClose={handleCloseAddDrawer}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={handleCloseAddDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              form="add-form"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              Add
            </Button>
          </div>
        }
      >
        <Form form={form} id="add-form" onFinish={handleSubmitAdd}>
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
          <Form.Item
            name="companyId"
            label="Company"
            rules={[{ required: true, message: "Please select a company!" }]}
          >
            <Select placeholder="Select a company">
              {companies.map((company) => (
                <Option key={company.id} value={company.id}>
                  {company.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default JobsTable;

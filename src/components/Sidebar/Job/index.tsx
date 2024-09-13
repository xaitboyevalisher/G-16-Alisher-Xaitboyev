/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Form, Input } from "antd";
import { RootState } from "../store";
import { deleteMovie, editMovie, addMovie } from "../store/slices/JobSlice";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Movie {
  id: number;
  title: string;
  description: string;
  technologies: string;
  location: string;
  salary: string;
  phone: string;
  email: string;
  telegram: string;
  instagram: string;
  companyId: string;
}

const MovieTable = () => {
  const movies = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [form] = Form.useForm();

  const handleEdit = (record: Movie) => {
    setEditingMovie(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteMovie(id));
  };

  const handleOk = (values: Partial<Movie>) => {
    if (editingMovie) {
      dispatch(editMovie({ ...editingMovie, ...values } as Movie));
    } else {
      // Handle adding a new movie
      dispatch(addMovie({ ...values, id: Date.now() } as Movie));
    }
    setIsModalVisible(false);
    setIsAddModalVisible(false);
  };

  const columns = [
    {
      id: 1,
      title: "Admin",
      description:
        "This article covers meaning & importance of Job Title from HRM perspective.",
      technologies: "Web",
      location: "Tashkent",
      salary: "Physical Therapist",
      phone: "+998936754532",
      email: "admin@gmail.com",
      telegram: "@Admin",
      instagram: "@Admin_01",
      companyId: "1",
      render: (text: string) => <img src={text} alt="Movie" width={50} />,
    },
    { title: "Job", dataIndex: "name", key: "title" },
    { title: "description", dataIndex: "description", key: "description" },
    { title: "technologies", dataIndex: "technology", key: "technology" },
    { title: "location", dataIndex: "location", key: "location" },
    { title: "salary", dataIndex: "salary", key: "salary" },
    { title: "phone", dataIndex: "phone", key: "phone" },
    { title: "email", dataIndex: "email", key: "email" },
    { title: "telegram", dataIndex: "telegram", key: "telegram" },
    { title: "instagram", dataIndex: "instagram", key: "instagram" },
    { title: "CompanyId", dataIndex: "CompanyId", key: "CompanyId" },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: Movie) => (
        <>
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          <Button
            onClick={() => handleDelete(record.id)}
            danger
            icon={<DeleteOutlined />}
          />
        </>
      ),
    },
  ];

  const tableStyles = css`
    .ant-table {
      color: black;
    }
    .ant-btn {
      margin-right: 10px;
    }

    .ant-modal-content {
      color: white;
    }
    .ant-form-item-label > label {
      color: white;
    }
    .ant-input {
      background-color: #555;
      color: white;
      border: 1px solid #888;
    }
    .ant-btn-primary {
      background-color: #4caf50;
      border-color: #4caf50;
    }
    .ant-btn-danger {
      background-color: #f44336;
      border-color: #f44336;
    }
    .add-button {
      float: right;
      margin-bottom: 20px;
    }
  `;

  return (
    <div css={tableStyles}>
      <Button
        className="add-button"
        onClick={() => setIsAddModalVisible(true)}
        icon={<PlusOutlined />}
      >
        Add
      </Button>
      <Table columns={columns} dataSource={movies} rowKey="id" />
      <Modal
        title={editingMovie ? "Edit Movie" : "Add Movie"}
        visible={isModalVisible || isAddModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setIsAddModalVisible(false);
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleOk}>
          <Form.Item
            name="title"
            label=""
            rules={[
              { required: true, message: "Please enter the movie title" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label=""
            rules={[
              { required: true, message: "Please enter the Gen description" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="technologies"
            label=""
            rules={[
              {
                required: true,
                message: "Please enter the release technologies",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label=""
            rules={[
              {
                required: true,
                message: "Please enter the director's location",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="salary"
            label=""
            rules={[
              { required: true, message: "Please enter the movie salary" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label=""
            rules={[
              { required: true, message: "Please enter the movie email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telegram"
            label=""
            rules={[
              { required: true, message: "Please enter the movie telegram" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="instagram"
            label=""
            rules={[
              { required: true, message: "Please enter the movie instagram" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="CompanyId"
            label=""
            rules={[
              { required: true, message: "Please enter the movie CompanyId" },
            ]}
          >
            <Input />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            {editingMovie ? "Save" : "Add"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default MovieTable;

/** @jsxImportSource @emotion/react */
import { Table, Button, Popconfirm, Form, Input, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { editGenre, deleteGenre, addGenre } from "../store/slices/CompanySlice";
import { useState } from "react";
import { css } from "@emotion/react";

const GenreTableWithForm = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state: RootState) => state.genre);
  const [editingGenre, setEditingGenre] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = (record: { id: number; name: string }) => {
    setEditingGenre(record);
    setIsEditModalVisible(true);
    form.setFieldsValue({ name: record.name });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteGenre(id));
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsAddModalVisible(false);
    setEditingGenre(null);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingGenre) {
        dispatch(editGenre({ id: editingGenre.id, name: values.name }));
        setIsEditModalVisible(false);
        setEditingGenre(null);
      }
    });
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      dispatch(addGenre({ name: values.name }));
      setIsAddModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    { title: "Job", dataIndex: "name", key: "title" },
    { title: "description", dataIndex: "description", key: "description" },
    { title: "image", dataIndex: "image", key: "image" },
    { title: "website", dataIndex: "website", key: "website" },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: { id: number; name: string }) => (
        <>
          <Button
            icon={<EditOutlined />}
            css={css`
              margin-right: 10px;
            `}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure delete this genre?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const containerStyles = css`
    position: relative;
    padding: 20px;
  `;

  const buttonStyles = css`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
  `;

  const tableStyles = css`
    margin-top: 60px; /* Adjust based on button height + margin */
  `;

  return (
    <div css={containerStyles}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        css={buttonStyles}
        onClick={() => setIsAddModalVisible(true)}
      >
        Add Genre
      </Button>
      <div css={tableStyles}>
        <Table dataSource={genres} columns={columns} rowKey="id" />
      </div>

      <Modal
        title="Edit Genre"
        visible={isEditModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
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
            name="image"
            label=""
            rules={[
              {
                required: true,
                message: "Please enter the release image",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="website"
            label=""
            rules={[
              {
                required: true,
                message: "Please enter the director's website",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Genre"
        visible={isAddModalVisible}
        onCancel={handleCancel}
        onOk={handleAdd}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Genre Name"
            rules={[
              { required: true, message: "Please input the genre name!" },
            ]}
          >
            <Input placeholder="Genre Name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GenreTableWithForm;

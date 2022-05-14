import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
export interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionEditFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  editItem:Values;
}

const CollectionEditForm: React.FC<CollectionEditFormProps> = ({
  visible,
  onCreate,
  onCancel,
  editItem,
}) => {
  console.log('edit item passed', editItem);
  const [form] = Form.useForm();
  const[itemToUpdate, setItemToUpdate] = useState(editItem);
  return (
    <Modal
      visible={visible}
      title="Update link"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ title:editItem.title, url:editItem.description, modifier: editItem.modifier }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input value={itemToUpdate.title} />
        </Form.Item>
        <Form.Item name="url" label="Url">
          <Input type="textarea"  value={itemToUpdate.description}/>
        </Form.Item>
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="tab">New Tab</Radio>
            <Radio value="window">New Window</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionEditForm

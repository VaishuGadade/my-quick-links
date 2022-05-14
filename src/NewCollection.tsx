import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
export interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

interface NewCollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new link"
      okText="Create"
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
        initialValues={{ modifier: "tab" }}
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
          <Input />
        </Form.Item>
        <Form.Item name="url" label="Url">
          <Input type="textarea" />
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


const NewCollection: React.FC<NewCollectionCreateFormProps> = ({
  onCreate,
  onCancel,
}) => {
  const [visible, setVisible] = useState(false);

  // const onCreate = (values: any) => {
  //   console.log("Received values of form: ", values);
  //   setVisible(false);
  //   return values;
  // };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Link
      </Button>
      <CollectionCreateForm
        visible={visible}
         onCreate = {onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
export default NewCollection;

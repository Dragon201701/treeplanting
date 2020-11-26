import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './main.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default () => {
  const intl = useIntl();

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <PageContainer>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="树名"
          name="树名"
          rules={[{ required: true, message: '请输入树名！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="留言"
          name="留言"
          rules={[{ required: true, message: '请输入留言！' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="提交">
            提交
        </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

import React from 'react';
import { Form, Alert, Button, Descriptions, Divider, Statistic, Input, Select } from 'antd';
import { connect } from 'umi';
import styles from './index.less';
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step2 = (props) => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;

  if (!data) {
    return null;
  }

  const { validateFields, getFieldsValue } = form;

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: { ...data, ...values },
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const onValidateForm = async () => {
    const values = await validateFields();

    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/submitStepForm',
        payload: { ...data, ...values },
      });
    }
  };

  const { payAccount, receiverAccount, receiverName, amount } = data;
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={{
        password: '123456',
      }}
    >
      <Alert
        closable
        showIcon
        message="确认后，树苗名字，区域将无法更改。所消耗的数量也将无法退回。"
        style={{
          marginBottom: 24,
        }}
      />
      <Divider
        style={{
          margin: '24px 0',
        }}
      />
      <Form.Item
          label="树苗数量"
          name="numtrees"
          rules={[
            {
              required: true,
              message: '树苗数量不能为0',
            },
          ]}
        >
          <Input placeholder="请输入树苗数量" />
      </Form.Item>
      <Form.Item
          label="种植地区"
          name="region"
        >
          <Select defaultValue={0}>
            <Option value={0}>额济纳旗</Option>
            <Option value={1}>阿拉善盟左旗</Option>
            <Option value={2}>阿拉善盟右旗</Option>
          </Select>
      </Form.Item>
      <Form.Item
        style={{
          marginBottom: 8,
        }}
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
      >
        <Button
          onClick={onPrev}
          style={{
            marginLeft: 8,
          }}
        >
          上一步
        </Button>
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ user, formAndstepForm, loading }) => ({
  user,
  submitting: loading.effects['formAndstepForm/submitStepForm'],
  data: formAndstepForm.step,
}))(Step2);

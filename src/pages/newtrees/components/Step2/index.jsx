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
  
  let avaliabletrees = 0
  const actcodes = props.user.currentUser.actcodes
  
  for (let i = 0; i < actcodes.length; i++){
    if (props.data.actcode == actcodes[i].actcode){
      avaliabletrees = actcodes[i].numtrees
      break
    }
  }
  console.log('Step 2 num tree avaliable: ', avaliabletrees, ' for actcode: ', props.data.actcode)
  const numtreesavaliable = avaliabletrees
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
    console.log('获取本页数据：', values)
    if (dispatch) {
      /*dispatch({
        type: 'formAndstepForm/submitStepForm',
        payload: { ...data, ...values },
      });*/
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'check',
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
        numtrees: '',
        region: '0',
      }}
    >
      <div className={styles.information}>
        <Descriptions column={1}>
          <Descriptions.Item label="当前激活码"> {props.data.actcode}</Descriptions.Item>
          <Descriptions.Item label="当前激活码可捐献树苗数量">
            <Statistic value={numtreesavaliable} suffix="颗" />
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Divider
        style={{
          margin: '24px 0',
        }}
      />
      <Alert
        closable
        showIcon
        message="确认后，树苗名字，区域将无法更改。所消耗的数量也将无法退回。"
        style={{
          marginBottom: 24,
        }}
      />
      
      <Form.Item
          label="树苗数量"
          name="numtrees"
          rules={[
            {
              required: true,
              message: '树苗捐赠数量不能为0',
            },
            {
              pattern: /^[1-9]\d*$/, 
              message: '请输入合法树苗捐赠数量',
            },
            () => ({
              validator(rule, value) {
                /*if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },*/
                
                if (value > numtreesavaliable) {
                  let msg = '树苗捐赠数量不得超过最大可捐赠数量：' + numtreesavaliable +  '颗。'
                  return Promise.reject(msg)
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input placeholder="请输入树苗数量" />
      </Form.Item>
      <Form.Item
          label="种植地区"
          name="region"
        >
          <Select defaultValue='0'>
            <Option value='0'>额济纳旗</Option>
            <Option value='1'>阿拉善盟左旗</Option>
            <Option value='2'>阿拉善盟右旗</Option>
          </Select>
      </Form.Item>
      <Form.Item
          label="本批树苗名字"
          name="name"
          rules={[
            {
              required: true,
              message: '名字不能为空',
            },
          ]}
        >
          <Input placeholder="请为树苗批量命名" />
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

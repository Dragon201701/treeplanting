import { Form, Alert, Button, Divider, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
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

const Step3 = (props) => {
  const { data, dispatch, submitting } = props;
  const [form] = Form.useForm();
  let avaliabletrees = 0
  const actcodes = props.user.currentUser.actcodes
  /*for (let i = 0; i < actcodes.length; i++){
    if (props.data.actcode == actcodes[i].actcode){
      avaliabletrees = actcodes[i].numtrees
      break
    }
  }
  console.log('Step 2 num tree avaliable: ', avaliabletrees, ' for actcode: ', props.data.actcode)
  const numtreesavaliable = avaliabletrees*/

  if (!data) {
    return null;
  }

  const { actcode, numtrees, treename, numtreesavaliable } = data;
  
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
    const user = props.user
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/submitStepForm',
        payload: { ...data, ...values, ...user},
      });
      /*dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'check',
      });*/
    }
  };
  const treenames = numtrees == 1? treename : treename + '1号到' + numtrees + '号'
  
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
            <Statistic value={numtreesavaliable} sfuffix="颗" />
          </Descriptions.Item>
          <Descriptions.Item label="选择的捐献树苗数量">
            <Statistic value={props.data.numtrees} suffix="颗" />
          </Descriptions.Item>
          <Descriptions.Item label="树苗名字"> {treenames}</Descriptions.Item>
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
          返回上一步
        </Button>
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          确认并提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ user, formAndstepForm }) => ({
  user,
  data: formAndstepForm.step,
}))(Step3);

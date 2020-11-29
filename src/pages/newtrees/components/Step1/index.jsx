import React from 'react';
import { Form, Button, Divider, Input, Select, notification } from 'antd';
import { connect } from 'umi';
import styles from './index.less';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step1 = (props) => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }

  const { validateFields } = form;

  const onValidateForm = async () => {
    const values = await validateFields();

    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };
  
  const onValidateActivatonCode = async () => {
    const values = await validateFields()
    var status = false
    //let actcodes = ['test, test']
    let actcodes = props.user.currentUser.actcodes
    for( var i = 0; i < actcodes.length; i++){
      if (actcodes[i].actcode == values.actcode) {
        status = true
        break
      }
    }
    if(status){
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'confirm',
      });
    }
    else{
      notification.open({
        message: '激活码不存在！',
        description: '请再次确认激活码是否填写正确。若刚完成付款，请稍等片刻，跟客服确认后再次尝试！'
      })
    }
    
  }
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
      >
        <Form.Item
          label="激活码"
          name="actcode"
          rules={[
            {
              required: true,
              message: '激活码不能为空',
            },
          ]}
        >
          <Input placeholder="请输入激活码" />
        </Form.Item>
        <Form.Item
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
          <Button type="primary" onClick={onValidateActivatonCode}>
            验证激活码
          </Button>
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>激活码</h4>
        <p>
          每一个激活码对应一次充值的数量，若当前激活码所对应的的数量使用完毕则自动失效，否则仍然可以使用。
        </p>
        <h4>激活码获取</h4>
        <p>
          请咨询小助手，充值领取激活码。
        </p>
      </div>
    </>
  );
};

export default connect(({ user, formAndstepForm }) => ({
  user,
  data: formAndstepForm.step,
}))(Step1);

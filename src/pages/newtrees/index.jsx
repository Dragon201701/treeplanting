import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import styles from './style.less';
const { Step } = Steps;

const getCurrentStepAndComponent = (current) => {
  switch (current) {
    case 'confirm':
      return {
        step: 1,
        component: <Step2 />,
      };

    case 'result':
      return {
        step: 3,
        component: <Step4 />,
      };

    case 'check':
      return {
        step: 2,
        component: <Step3 />,
      };
      
    case 'info':
    default:
      return {
        step: 0,
        component: <Step1 />,
      };
  }
};

const StepForm = ({ current }) => {
  const [stepComponent, setStepComponent] = useState(<Step1 />);
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);
  return (
    <PageContainer content="使用发放的激活码填写表单完成激活进入植树页面。">
      <Card bordered={false}>
        <>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="请输入激活码" />
            <Step title="填写区域，数量及树苗的名字" />
            <Step title="信息确认" />
            <Step title="提交成功" />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageContainer>
  );
};

export default connect(({ formAndstepForm }) => ({
  current: formAndstepForm.current,
}))(StepForm);

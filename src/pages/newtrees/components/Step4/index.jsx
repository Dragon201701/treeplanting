import { Button, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
import { connect } from 'umi';
import styles from './index.less';

const Step3 = (props) => {
  const { data, dispatch } = props;

  if (!data) {
    return null;
  }

  const { actcode, numtrees, treename, numtreesavaliable } = data;

  const treenames = numtrees == 1? treename : treename + '1号到' + numtrees + '号'
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="激活码"> {actcode}</Descriptions.Item>
        <Descriptions.Item label="当前激活码可捐献数量"> {numtreesavaliable}</Descriptions.Item>
        <Descriptions.Item label="树苗名称"> {treenames}</Descriptions.Item>
        <Descriptions.Item label="捐献数量">
          <Statistic value={numtrees} suffix="颗" />
        </Descriptions.Item>
        <Descriptions.Item label="当前激活码剩余可捐献数量">
          <Statistic value={numtreesavaliable - numtrees} suffix="颗" />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        再转一笔
      </Button>
      <Button>查看账单</Button>
    </>
  );
  return (
    <Result
      status="success"
      title="操作成功"
      subTitle="预计两小时内到账"
      extra={extra}
      className={styles.result}
    >
      {information}
    </Result>
  );
};

export default connect(({ formAndstepForm }) => ({
  data: formAndstepForm.step,
}))(Step3);

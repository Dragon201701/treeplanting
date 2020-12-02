import { PlusOutlined } from '@ant-design/icons';
import { Table, Button, Card, List, Typography } from 'antd';
import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './style.less';
const { Paragraph } = Typography;

class CardList extends Component {
  componentDidMount() {
    // Fetch all trees and bind to model
    const { dispatch } = this.props;
    const currentuser = this.props.user.currentUser
    dispatch({
      type: 'mytrees/fetch',
      payload: {
        currentuser
      },
    });
  }


  render() {
    const dataSource = this.props.mytrees.treelist
    console.log('获取到我的树苗：', dataSource)
    const columns = [
      {
        title: '树名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '树苗数量',
        dataIndex: 'numtrees',
        key: 'numtrees',
      },
      {
        title: '地区',
        dataIndex: 'region',
        key: 'region',
      },
    ];
    const content = (
      <div className={styles.pageHeaderContent}>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    );
    const nullData = {};
    return (
      <PageContainer>
        <Table dataSource={dataSource} columns={columns} />;
      </PageContainer>
    );
  }
}

export default connect(({ user, mytrees, loading }) => ({
  user,
  mytrees,
  loading: loading.models.mytrees,
}))(CardList);

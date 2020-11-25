import React from 'react';

import logo from './logo.png';

export const Banner01DataSource = {
  wrapper: { className: 'banner0' },
  textWrapper: { className: 'banner0-text-wrapper' },
  title: {
    className: 'banner0-title khxv5mz4h1i-editor_css',
    children: (<img src={logo} alt="logo" width="100%"/>)
  },
  content: {
    className: 'banner0-content',
    children: (
      <span>
        <span>
          <p>
            欢迎来到北美留学梭梭植树系统。我们是立志要把阿拉善沙漠变成万亩绿顷的留学生们。
          </p>
          <p>
            请使用本系统给您的树苗完成安家工作<br />
          </p>
          <p>
            我们会将此种植信息提供给前线治沙的志愿者作为种植参考<br />
          </p>
        </span>
      </span>
    ),
  },
  button: {
    className: 'banner0-button',
    children: (
      <span>
        <p>登录/注册</p>
      </span>
    ),
    href: '/user/login',
  },
};
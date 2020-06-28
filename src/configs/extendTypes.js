import React from 'react';
import { extendRenderTypes } from 'antd-doddle';
import FileUpload from '../components/FileUpload'; // 静态文件组件

extendRenderTypes({
  staticFile: ({ field }) => (<FileUpload {...field} />)
});

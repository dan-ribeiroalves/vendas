import React from 'react';
import ptBR from 'antd/es/locale/pt_BR';
import { ConfigProvider, theme } from 'antd';
import Form from './Pages/Form/Form';
import './Assets/Styles/Global.scss';

export default function App() {
  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#333333',
          borderRadius: 8,
        },
      }}
    >
      <div className="container-page">
        <Form />
      </div>
    </ConfigProvider>
  );
}

/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import ptBR from 'antd/es/locale/pt_BR';
import { ConfigProvider, Tabs, theme } from 'antd';
import Form from './Pages/Form/Form';
import './Assets/Styles/Global.scss';

const { TabPane } = Tabs;

function TabComponent2() {
  return (
    <div>
      <h1>Conteúdo da guia 2</h1>
      <p>Texto de exemplo para a guia 2</p>
    </div>
  );
}

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
        <div className="container-form">
          <h1>Informações da Venda</h1>
          <Tabs defaultActiveKey="1">
            <TabPane tab="CNPJ" key="1">
              <Form />
            </TabPane>
            <TabPane tab="CPF" key="2">
              <TabComponent2 />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </ConfigProvider>
  );
}

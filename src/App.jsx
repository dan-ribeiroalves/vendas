/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import ptBR from 'antd/es/locale/pt_BR';
import { ConfigProvider, Tabs, theme } from 'antd';
import FormCnpj from './Pages/Form/FormCnpj';
import FormCpf from './Pages/Form/FormCpf';
import './Assets/Styles/Global.scss';

const { TabPane } = Tabs;

export default function App() {
  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#0f59d2',
          borderRadius: 8,
        },
      }}
    >
      <div className="container-page">
        <div className="container-form">
          <h2 className="animated-title">Informações da Venda</h2>
          <Tabs defaultActiveKey="1">
            <TabPane tab="CNPJ" key="1">
              <FormCnpj />
            </TabPane>
            <TabPane tab="CPF" key="2">
              <FormCpf />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </ConfigProvider>
  );
}

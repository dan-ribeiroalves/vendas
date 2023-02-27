/* eslint-disable object-curly-newline */
import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import Inputmask from 'inputmask';
import Utils from '../../Assets/Utils';

export default function FormCnpj() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const data = values;
    const url = Utils.generateUrl(data);
    window.location.href = url;
  };

  useEffect(() => {
    Inputmask({ mask: '(99) 9{1,9}' }).mask(document.getElementById('phoneFromCnpj'));
    Inputmask({ mask: '99999-999' }).mask(document.getElementById('cepFromCnpj'));
    Inputmask({ mask: '99.999.999/9999-99' }).mask(document.getElementById('cnpj'));
    Inputmask({ mask: '99/99/9999' }).mask(document.getElementById('dateFromCnpj'));
    Inputmask({ mask: '999.999.999-99' }).mask(document.getElementById('cpfFromCnpj'));
  }, []);

  return (
    <Form layout="vertical" form={form} name="cnpjForm" onFinish={onFinish} autoComplete="off">
      <Form.Item
        label="CNPJ"
        name="cnpj"
        rules={[
          {
            required: true,
            validator: (rule, value) => {
              const isValid = Utils.validateCNPJ(value);
              if (!isValid) {
                return Promise.reject(new Error('CNPJ Inválido'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input id="cnpj" onChange={(e) => Utils.getCnpj(e.target.value, form)} />
      </Form.Item>

      <Form.Item
        label="Razão Social"
        name="corporateName"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nome Fantasia"
        name="fantasyName"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Cep"
        name="cep"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input id="cepFromCnpj" onChange={(e) => Utils.getAdressByCEP(e.target.value, form)} />
      </Form.Item>

      <Form.Item
        label="Rua"
        name="street"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Bairro"
        name="district"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Número"
        name="number"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Cidade"
        name="city"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Estado"
        name="state"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Número do Telefone"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input id="phoneFromCnpj" />
      </Form.Item>

      <Form.Item
        label="CPF"
        name="cpf"
        rules={[
          {
            required: true,
            validator: (rule, value) => {
              const isValid = Utils.validateCPF(value);
              if (!isValid) {
                return Promise.reject(new Error('CPF Inválido'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input id="cpfFromCnpj" />
      </Form.Item>

      <Form.Item
        label="Nome"
        name="name"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Data de Nascimento"
        name="birthDay"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input id="dateFromCnpj" />
      </Form.Item>

      <Form.Item>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

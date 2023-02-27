/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import Inputmask from 'inputmask';
import Utils from '../../Assets/Utils';

export default function FormCpf() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const data = values;
    const url = Utils.generateUrl(data);
    window.location.href = url;
  };

  useEffect(() => {
    Inputmask({ mask: '(99) 9{1,9}' }).mask(document.getElementById('phone'));
    Inputmask({ mask: '99999-999' }).mask(document.getElementById('cep'));
    Inputmask({ mask: '99/99/9999' }).mask(document.getElementById('date'));
    Inputmask({ mask: '999.999.999-99' }).mask(document.getElementById('cpf'));
  }, []);

  return (
    <Form layout="vertical" form={form} name="cpfForm" onFinish={onFinish} autoComplete="off">
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
        <Input id="cpf" />
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
        label="Cep"
        name="cep"
        rules={[
          {
            required: true,
            message: 'Campo obrigatorio!',
          },
        ]}
      >
        <Input id="cep" onChange={(e) => Utils.getAdressByCEP(e.target.value, form)} />
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
        <Input id="phone" />
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
        <Input id="date" />
      </Form.Item>

      <Form.Item>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

/* eslint-disable object-curly-newline */
import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import Inputmask from 'inputmask';
import './FormPage.scss';
import axios from 'axios';
import Utils from '../../Assets/Utils';

export default function FormCnpj() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const getCnpj = async (cnpj) => {
    if (cnpj.replace(/[_\-/.]/g, '').length === 14) {
      await axios
        .get(`https://br24.nbwdigital.com.br/goprime/api/cnpj/${cnpj}`)
        .then((res) => console.log(res));
    }
  };

  const getAdressByCEP = async (cep) => {
    if (cep.replace(/[_\-/.]/g, '').length === 8) {
      const address = await axios
        .get(`https://viacep.com.br/ws/${cep}/json`)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
          message.error('Erro ao buscar CEP!');
        });

      const data = {};
      data.street = address.logradouro;
      data.district = address.bairro;
      data.complement = address.complemento;
      data.city = address.localidade;
      data.state = address.uf;

      form.setFieldsValue({ ...form.getFieldsValue(), ...data });
    }
  };

  useEffect(() => {
    Inputmask({ mask: '(99) 9{1,9}' }).mask(document.getElementById('phone'));
    Inputmask({ mask: '99999-999' }).mask(document.getElementById('cep'));
    Inputmask({ mask: '99.999.999/9999-99' }).mask(document.getElementById('cnpj'));
    Inputmask({ mask: '99/99/9999' }).mask(document.getElementById('date'));
    Inputmask({ mask: '999.999.999-99' }).mask(document.getElementById('cpf'));
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
        <Input id="cnpj" onChange={(e) => getCnpj(e.target.value)} />
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
        <Input id="cep" onChange={(e) => getAdressByCEP(e.target.value)} />
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

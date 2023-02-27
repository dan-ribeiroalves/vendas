/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import { message } from 'antd';
import axios from 'axios';
import { cnpj, cpf } from 'cpf-cnpj-validator';

export default class Utils {
  // Valida CPF
  static validateCPF(cpfValue) {
    let data = cpfValue;
    data = cpfValue.replace(/[^\d]+/g, '');

    const isValid = cpf.isValid(data);
    return isValid;
  }

  // Valida CNPJ
  static validateCNPJ(cnpjValue) {
    let data = cnpjValue;
    data = cnpjValue.replace(/[^\d]+/g, '');

    const isValid = cnpj.isValid(data);
    return isValid;
  }

  // Gera url com os dados
  static generateUrl(values) {
    const mapObj = (obj, callback) => {
      const result = {};
      for (const prop in obj) {
        if (Object.hasOwnProperty.call(obj, prop)) {
          result[prop] = callback(obj[prop], prop, obj);
        }
      }
      return result;
    };
    const data = mapObj(values, (value, key) => value?.replace(/[_\-/.()]/g, ''));

    return `https://b24-j06jct.bitrix24.site/crm_form_w50qo/?cpnj=${data?.cnpj}&cpf=${data?.cpf}&nome=${data?.name}&email=${values?.email}&cep=${data?.cep}&nomeFantasia=${data?.fantasyName}&nomeSocial=${data?.corporateName}&logradouro=${data?.street}$bairro=${data?.district}&numero=${data?.number}&cidade=${data?.city}&uf=${data?.state}&telefone=${data?.phone}&dataNascimento=${data?.birthDay}`;
  }

  // Busca Cep
  static getAdressByCEP = async (cep, form) => {
    if (cep.replace(/[_\-/.]/g, '')?.length === 8) {
      const address = await axios
        .get(`https://viacep.com.br/ws/${cep}/json`)
        .then((res) => {
          if (res.data.erro) {
            message.error('Erro ao buscar CEP!');
          }
          return res.data;
        })
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

  // Busca Cnpj
  static getCnpj = async (cnpjValue, form) => {
    const cnpjFormat = cnpjValue.replace(/[_\-/.]/g, '');
    if (cnpjFormat.length === 14) {
      await axios
        .get(`https://br24.nbwdigital.com.br/goprime/api/cnpj/${cnpjFormat}`)
        .then(({ data }) => {
          const dataFields = {};
          dataFields.corporateName = data?.nome;
          dataFields.fantasyName = data?.fantasia;
          dataFields.cep = data?.cep;
          dataFields.street = data?.logradouro;
          dataFields.district = data?.bairro;
          dataFields.number = data?.numero;
          dataFields.city = data?.municipio;
          dataFields.state = data?.uf;
          dataFields.state = data?.uf;

          form.setFieldsValue({ ...form.getFieldsValue(), ...dataFields });
        })
        .catch(() => {
          message.error('Erro ao buscar Cnpj');
        });
    }
  };
}

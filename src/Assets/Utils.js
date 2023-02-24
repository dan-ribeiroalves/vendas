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
}

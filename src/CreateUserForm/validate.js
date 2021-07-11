import errorMessages from './errorMessages.json';

export default (values) => {
  const errors = {};

  if (values.name) {
    if (values.name.length > 20) {
      errors.name = errorMessages.name.tooLong;
    }
    if (values.name.length < 2) {
      errors.name = errorMessages.name.tooShort;
    }
  } else {
    errors.name = errorMessages.name.required;
  }

  if (values.cpf) {
    if (!/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/.test(values.cpf)) {
      errors.cpf = errorMessages.cpf.invalid;
    }
  } else {
    errors.cpf = errorMessages.cpf.required;
  }

  if (values.phone) {
    if (!/^\((\d{2})\) (\d{1}) (\d{4})-(\d{4})$/.test(values.phone)) {
      errors.phone = errorMessages.phone.invalid;
    }
  } else {
    errors.phone = errorMessages.phone.required;
  }

  if (values.email) {
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = errorMessages.email.invalid;
    }
  }

  return errors;
};

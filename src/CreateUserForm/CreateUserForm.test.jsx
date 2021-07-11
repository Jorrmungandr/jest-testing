import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import CreateUserForm from './CreateUserForm';
import errorMessages from './errorMessages.json';

configure({ adapter: new Adapter() });

const simulateChangeOnInput = (wrapper, inputSelector, value) => {
  const input = wrapper.find(inputSelector);

  expect(input.length).toBe(1);

  input.simulate('change', { target: { value } });

  return wrapper.find(inputSelector);
};

const fillFormInputsWithValues = (wrapper, values) => ({
  name: simulateChangeOnInput(wrapper, '#name', values.name),
  cpf: simulateChangeOnInput(wrapper, '#cpf', values.cpf),
  phone: simulateChangeOnInput(wrapper, '#phone', values.phone),
  email: simulateChangeOnInput(wrapper, '#email', values.email),
});

const expectFormToMatchValues = (inputs, values) => {
  expect(inputs.name.props().value).toEqual(values.name);
  expect(inputs.cpf.props().value).toEqual(values.cpf);
  expect(inputs.phone.props().value).toEqual(values.phone);
  expect(inputs.email.props().value).toEqual(values.email);
};

const simulateFormSubmission = (wrapper, values) => {
  const formNode = wrapper.find('form');
  expect(formNode.length).toBe(1);

  const inputs = fillFormInputsWithValues(wrapper, values);

  expectFormToMatchValues(inputs, values);

  formNode.simulate('submit');
};

const getErrorMessage = (wrapper, containerSelector) => {
  const errorMessage = wrapper.find(`${containerSelector} .error-message`);

  expect(errorMessage.length).toBe(1);

  return errorMessage.text();
};

describe('CreateUserForm', () => {
  it('should render correctly', () => {
    const wrapper = mount(<CreateUserForm />);

    expect(wrapper).toMatchSnapshot();
  });

  it('lets me fill all the fields', () => {
    const wrapper = mount(<CreateUserForm />);

    const values = {
      name: 'Edgar',
      cpf: '111.728.584-70',
      phone: '(81) 9 9918-6187',
      email: 'edgarmarques.110@gmail.com',
    };

    const inputs = fillFormInputsWithValues(wrapper, values);

    expectFormToMatchValues(inputs, values);
  });

  it('lets me submit the form', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<CreateUserForm onSubmit={handleSubmit} />);

    const values = {
      name: 'Edgar',
      cpf: '111.728.584-70',
      phone: '(81) 9 9918-6187',
      email: 'edgarmarques.110@gmail.com',
    };

    simulateFormSubmission(wrapper, values);

    expect(handleSubmit).toBeCalledWith(values);
  });

  it('shows error messages if submit is called without required fields', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<CreateUserForm onSubmit={handleSubmit} />);

    simulateFormSubmission(wrapper, {
      name: '',
      cpf: '',
      phone: '',
      email: '',
    });

    expect(handleSubmit).not.toHaveBeenCalled();

    expect(getErrorMessage(wrapper, '#name-container')).toBe(errorMessages.name.required);
    expect(getErrorMessage(wrapper, '#cpf-container')).toBe(errorMessages.cpf.required);
    expect(getErrorMessage(wrapper, '#phone-container')).toBe(errorMessages.phone.required);
    expect(getErrorMessage(wrapper, '#email-container')).toBe('');
  });

  it('shows error message when a short name is inputed', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<CreateUserForm onSubmit={handleSubmit} />);

    simulateFormSubmission(wrapper, {
      name: 'E', // Short Name
      cpf: '111.728.584-70',
      phone: '(81) 9 9918-6187',
      email: 'edgarmarques.110@gmail.com',
    });

    expect(handleSubmit).not.toHaveBeenCalled();

    expect(getErrorMessage(wrapper, '#name-container')).toBe(errorMessages.name.tooShort);
  });

  it('shows error message when a long name is inputed', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<CreateUserForm onSubmit={handleSubmit} />);

    simulateFormSubmission(wrapper, {
      name: 'Edgar Edgar Edgar Edgar Edgar Edgar Edgar Edgar', // Long Name
      cpf: '111.728.584-70',
      phone: '(81) 9 9918-6187',
      email: 'edgarmarques.110@gmail.com',
    });

    expect(handleSubmit).not.toHaveBeenCalled();

    expect(getErrorMessage(wrapper, '#name-container')).toBe(errorMessages.name.tooLong);
  });

  it('shows error message when an invalid cpf is inputed', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<CreateUserForm onSubmit={handleSubmit} />);

    simulateFormSubmission(wrapper, {
      name: 'Edgar',
      cpf: 'C P EFE', // Invalid CPF
      phone: '(81) 9 9918-6187',
      email: 'edgarmarques.110@gmail.com',
    });

    expect(handleSubmit).not.toHaveBeenCalled();

    expect(getErrorMessage(wrapper, '#cpf-container')).toBe(errorMessages.cpf.invalid);
  });

  it('shows error message when an invalid phone is inputed', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<CreateUserForm onSubmit={handleSubmit} />);

    simulateFormSubmission(wrapper, {
      name: 'Edgar',
      cpf: '111.728.584-70',
      phone: 'CELULAr', // Invalid Phone
      email: 'edgarmarques.110@gmail.com',
    });

    expect(handleSubmit).not.toHaveBeenCalled();

    expect(getErrorMessage(wrapper, '#phone-container')).toBe(errorMessages.phone.invalid);
  });

  it('shows error message when an invalid email is inputed', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<CreateUserForm onSubmit={handleSubmit} />);

    simulateFormSubmission(wrapper, {
      name: 'Edgar',
      cpf: '111.728.584-70',
      phone: '(81) 9 9918-6187',
      email: 'EMEIO', // Invalid E-mail
    });

    expect(handleSubmit).not.toHaveBeenCalled();

    expect(getErrorMessage(wrapper, '#email-container')).toBe(errorMessages.email.invalid);
  });
});

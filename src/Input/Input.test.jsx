import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

import Input from './Input';

configure({ adapter: new Adapter() });

const simulateChangeOnInput = (wrapper, inputSelector, value) => {
  const input = wrapper.find(inputSelector);

  expect(input.length).toBe(1);

  input.simulate('change', { target: { value } });

  return wrapper.find(inputSelector);
};

const getErrorMessage = (wrapper, containerSelector) => {
  const errorMessage = wrapper.find(`${containerSelector} .error-message`);

  expect(errorMessage.length).toBe(1);

  return errorMessage.text();
};

describe('Input', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Input name="name" label="Nome" value="" onChange={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('lets me fill the input', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<Input name="name" label="Nome" value="" onChange={handleChange} />);

    simulateChangeOnInput(wrapper, '#name', 'Edgar');

    expect(handleChange).toHaveBeenCalledWith('Edgar');
  });

  it('shows the error its passed', () => {
    const wrapper = shallow(<Input name="name" label="Nome" value="" onChange={jest.fn()} error="Generic Error" />);

    expect(getErrorMessage(wrapper, '#name-container')).toBe('Generic Error');
  });
});

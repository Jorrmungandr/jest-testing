import React, { useState } from 'react';

import Input from '../Input';

import validate from './validate';
import './CreateUserForm.css';

function CreateUserForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const values = {
      name,
      cpf,
      phone,
      email,
    };

    const errorFields = validate(values);
    setErrors(errorFields);

    if (Object.keys(errorFields).length > 0) return;

    onSubmit(values);
  };

  return (
    <div className="form-container" onSubmit={handleSubmit}>
      <h1>Criar Usuário</h1>
      <form id="create-user-form">
        <Input
          name="name"
          label="Nome"
          value={name}
          onChange={setName}
          error={errors.name}
        />
        <Input
          name="cpf"
          label="CPF"
          value={cpf}
          onChange={setCpf}
          error={errors.cpf}
        />
        <Input
          name="phone"
          label="Número de Celular"
          value={phone}
          onChange={setPhone}
          error={errors.phone}
        />
        <Input
          name="email"
          label="E-mail"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />

        <button type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

CreateUserForm.defaultProps = {
  onSubmit: () => {},
};

export default CreateUserForm;

import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";

import Input from "~/components/Input";
import logo from "~/assets/fastfeet-logo.png";
import loginValidation from "./validators";
import { signInRequest } from "~/store/modules/auth/actions";

import { Container } from "./styles";

export interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();

  const handleSubmit: SubmitHandler<FormData> = async data => {
    const errors = await loginValidation(data);

    if (errors) {
      return formRef.current?.setErrors(errors);
    }

    dispatch(signInRequest(data.email, data.password));
  };

  return (
    <Container>
      <img src={logo} alt="Logo" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <strong>SEU E-MAIL</strong>
        <Input name="email" type="email" placeholder="Seu e-mail" id="email" />
        <strong>SUA SENHA</strong>
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          id="password"
        />

        <button type="submit">Entrar no Sistema</button>
      </Form>
    </Container>
  );
}

"use client";
import { signIn } from "next-auth/react";
import Button from "../components/Button";

const Login = () => {
  return (
    <li className="list-not">
      <Button onClick={() => signIn()}>Sign In</Button>
    </li>
  );
};

export default Login;

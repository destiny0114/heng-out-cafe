import styles from "@styles/Login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, Schema, string } from "yup";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingOverlay } from "@components/LoadingOverlay";
import { Input } from "@components/FormInputs";
import { useAuth } from "@context/AuthContext";
import { LoginFields } from "@libs/types";
import { GetServerSideProps } from "next";
import { parseCookie } from "@utils/helper";

type PageProps = {};

const schema: Schema<LoginFields> = object({
  email: string().email("Please provide a valid email.").required("Please provide a email."),
  password: string()
    .required("Please provide a password.")
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/, "Must contain 8 characters with character and number."),
});

export default function LoginPage() {
  const { login, errorMessage } = useAuth();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onSubmit",
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFields> = async (fields) => {
    login(fields);
  };

  return (
    <main className={styles.hero}>
      {isSubmitting && <LoadingOverlay />}
      <section>
        <div className={styles.form_wrapper}>
          <h1>Login</h1>
          <h5>Please enter your e-mail and password:</h5>
          <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
            <Input<LoginFields> type="text" name="email" placeholder="Email" register={register} error={errors.email} autoFocus />
            <Input<LoginFields> type="password" name="password" placeholder="Password" register={register} error={errors.password} />
            <button className={styles.login_btn} type="submit" disabled={!isValid || isSubmitting}>
              Login
            </button>
            <h5>
              Dont have an account?&nbsp;
              <Link className={styles.register_link} href="/register">
                Create one
              </Link>
            </h5>
          </form>
          {errorMessage && <h5 className={styles.error_msg}>{errorMessage}</h5>}
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { access_token } = parseCookie(context.req);

  if (access_token)
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };

  return {
    props: {},
  };
};

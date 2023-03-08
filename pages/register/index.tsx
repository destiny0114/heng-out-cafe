import styles from "@styles/Register.module.css";
import { GetServerSideProps } from "next";

import { SubmitHandler, useForm } from "react-hook-form";
import { object, Schema, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@components/FormInputs";
import { LoadingOverlay } from "@components/LoadingOverlay";
import { RegisterFields } from "@libs/types";
import { useAuth } from "@context/AuthContext";
import { parseCookie } from "@utils/helper";

const schema: Schema<RegisterFields> = object({
  firstName: string().required("Please provide a first name."),
  lastName: string().required("Please provide a last name."),
  email: string().email("Please provide a valid email.").required("Please provide a email."),
  password: string()
    .required("Please provide a password.")
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/, "Must contain 8 characters with character and number."),
});

export default function RegisterPage() {
  const { register: registerUser, errorMessage } = useAuth();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<RegisterFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    reValidateMode: "onSubmit",
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (fields) => {
    registerUser(fields);
  };

  return (
    <main className={styles.hero}>
      {isSubmitting && <LoadingOverlay />}
      <section>
        <div className={styles.form_wrapper}>
          <h1>Register</h1>
          <h5>Please fill in the information below:</h5>
          <form className={styles.register_form} onSubmit={handleSubmit(onSubmit)}>
            <Input<RegisterFields> type="text" name="firstName" placeholder="First Name" register={register} error={errors.firstName} autoFocus />
            <Input<RegisterFields> type="text" name="lastName" placeholder="Last Name" register={register} error={errors.lastName} />
            <Input<RegisterFields> type="text" name="email" placeholder="Email" register={register} error={errors.email} />
            <Input<RegisterFields> type="password" name="password" placeholder="Password" register={register} error={errors.password} />
            <button className={styles.register_btn} type="submit" disabled={!isValid || isSubmitting}>
              Register
            </button>
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

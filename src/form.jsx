import './formStyle.css';

import { useForm } from 'react-hook-form';
import { object, string, number, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Form = () => {
  const schema = object().shape({
    fullName: string().required('Full name is required'),
    email: string().email().required('Email is required'),
    age: number('Age must be a number')
      .positive('Age must be a positive number')
      .integer('Age must be an integer')
      .min(8, 'Age must be minimum 8 years')
      .max(150, 'Age must be maximum 150 years')
      .typeError('Age must be a number')
      .required('Age is required'),
    password: string()
      .min(8, 'Password should be minimum 8 characters')
      .max(24, 'Password should be maximum 24 characters')
      .notOneOf(
        ['12345678', 'password123', ref('fullName'), ref('email'), null],
        "Please don't use common passwords or personal info"
      )
      .required('Password is required'),
    password2: string()
      .oneOf([ref('password'), null], "Passwords don't match")
      .required('Confirming Passwords is required'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    delete data.password2;
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="fullName">
        Full Name
        <input
          type="text"
          id="fullName"
          placeholder="Full Name ..."
          {...register('fullName')}
        />
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </label>

      <label htmlFor="email">
        Email
        <input
          type="text"
          id="email"
          placeholder="Email ..."
          {...register('email')}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </label>

      <label htmlFor="age">
        Age
        <input
          type="text"
          id="age"
          placeholder="Age ..."
          {...register('age')}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </label>

      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          placeholder="Password ..."
          {...register('password')}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </label>

      <label htmlFor="password2">
        Confirm Password
        <input
          type="password"
          id="password2"
          placeholder="Confirm Password ..."
          {...register('password2')}
        />
        {errors.password2 && <p>{errors.password2.message}</p>}
      </label>

      <input type="submit" />
    </form>
  );
};

export default Form;

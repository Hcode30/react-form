import './formStyle.css';

import { useForm } from 'react-hook-form';
import { object, string, number, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Form = () => {
  const schema = object().shape({
    fullName: string().required('Full name is a required field'),
    email: string().email().required(),
    age: number().positive().integer().min(5).max(120).required(),
    password: string().min(8).max(24).required(),
    password2: string()
      .oneOf([ref('password'), null], "Passwords don't match")
      .required(),
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
          type="number"
          id="age"
          placeholder="Age ..."
          {...register('age')}
        />
        {errors.age && <p>Age must be in range of 5 to 120 years</p>}
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

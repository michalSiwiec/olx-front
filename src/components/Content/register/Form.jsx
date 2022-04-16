import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER, TEST_USER } from '../../../graphql/mutations/user';
import AvatarsGenerator from '../../../services/RegisterForm/AvatarsGenerator';
import RegisterFormValidator from '../../../validators/registerFormValidator';
import Input from '../../reusable/Input.jsx';
import Button from '../../reusable/Button.jsx';
import DepartingBox from '../../reusable/animatedContainers/DepartingBox.jsx'
import LoadingModal from '../../reusable/modals/LoadingModal.jsx';
import UserRegisteredModal from '../../reusable/modals/UserRegisteredModal.jsx';

const Form = () => {
  const [avatars, setAvatars] = useState([]);
  const [email, setEmail] = useState('sadasd@gmail.com');
  const [password, setPassword] = useState('Ab7776dsfsd');
  const [userRegisterWithSuccess, setUserRegisterWithSuccess] = useState(false);
  const fileInput = useRef(null);
  const [registerUser, { data, error, loading }] = useMutation(REGISTER_USER);

  const [testUser, { data: testData, error: testError, loading: testLoading }] = useMutation(TEST_USER);

  const handleEmailOnChange = e => setEmail(e.target.value)
  const handlePasswordOnChange = e => setPassword(e.target.value)

  const handleFileOnChange = async e => {
    const files = [...e.target.files];
    const avatarsGenerator = new AvatarsGenerator(files)
    const generatedAvatars = await avatarsGenerator.generateAvatars();

    setAvatars(generatedAvatars)
  };
  
  const handleSubmit = e => {
    e.preventDefault();

    const formValidator = new RegisterFormValidator({ password, email, avatars });
    if (!formValidator.valid()) return null;

    registerUser({ variables: { input: { email, password, avatars } } })
    resetFormState();
  }

  const resetFormState = () => {
    setAvatars([]);
    setEmail('');
    setPassword('');
    fileInput.current.value = ""
  };

  const userRegisteredWithSuccess = data?.user?.id;

  useEffect(() => {
    if (userRegisteredWithSuccess) setUserRegisterWithSuccess(true);
  }, [userRegisteredWithSuccess])

  return (
    <Fragment>
      <LoadingModal open={loading} info='Rejestrujemy użytkownika' />
      <UserRegisteredModal
        open={userRegisterWithSuccess}
        setUserRegisterWithSuccess={setUserRegisterWithSuccess}
        userData={data}
      />
      <form enctype='multipart/form-data' onSubmit={handleSubmit}>
        <DepartingBox order={1}>
          <Input
            type='email'
            placeholder='Email'
            onChange={handleEmailOnChange}
            value={email}
          />
        </DepartingBox>
        <DepartingBox order={2}>
          <Input
            placeholder='Password'
            onChange={handlePasswordOnChange}
            value={password}
          />
        </DepartingBox>
        <DepartingBox order={3}>
          <Input
            type='file'
            onChange={handleFileOnChange}
            inputProps={{ multiple: true }}
            inputRef={fileInput}
          />
        </DepartingBox>
        <Button value='Upload' />
        <button onClick={() => testUser()}>test</button>
        {/* <button onClick={() => {
          console.log(document.cookie)

          fetch('http://localhost:3333/test/index', {
            method: 'GET',
            credentials: 'include'
            // credentials: 'same-origin'
          })
        }}
          >test
        </button> */}
      </form>
    </Fragment>
  )
}

export default Form;

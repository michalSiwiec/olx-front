import React, { Fragment, useState } from 'react';
import ValidationNewsletterHandler from 'handlers/validationNewsletterHandler.js';
import FormContainer from 'components/containers/FormContainer.jsx';
import TextInput from 'components/inputs/TextInput.jsx';
import SubmitButton from 'components/SubmitButton.jsx';

const Newsletter = () => {
  const blockName = 'newsletter';
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [surnameErrorMessage, setSurnameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const handleNameOnChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleSurnameOnChange = ({ target: { value } }) => {
    setSurname(value);
  };

  const handleEmailOnChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSaveToNewsletter = () => {
    const {
      nameError,
      surnameError,
      emailError,
      validationStatus
    } = new ValidationNewsletterHandler({ name, surname, email }).call();

    setNameErrorMessage(nameError);
    setSurnameErrorMessage(surnameError);
    setEmailErrorMessage(emailError);
    if (!validationStatus) return;

    surnameErrorMessage(''); // to fix linter - to remove
  };

  return (
    <div className={blockName}>
      <FormContainer
        header="Zapisz się na newsletter aby być na bieżąco!"
        form={(
          <Fragment>
            <TextInput
              placeholder="Imię"
              classNames="text-input--newsletter"
              value={name}
              onChange={handleNameOnChange}
              validationError={nameErrorMessage}
            />
            <TextInput
              placeholder="Nazwisko"
              classNames="text-input--newsletter"
              value={surname}
              onChange={handleSurnameOnChange}
              validationError={surnameErrorMessage}
            />
            <TextInput
              placeholder="Adres email"
              classNames="text-input--newsletter"
              value={email}
              onChange={handleEmailOnChange}
              validationError={emailErrorMessage}
            />
            <SubmitButton
              onMouseDown={handleSaveToNewsletter}
              value="Zapisz"
              classNames="button--newsletter"
            />
          </Fragment>
        )}
      />
    </div>
  );
};

export default Newsletter;

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container, InputContainer } from './styles';

interface Props {
  name: string;
  label?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const SignInput: React.FC<InputProps> = props => {
  const { name, label, icon: Icon, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(state => !state);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <>
      <Container
        isFilled={Number(isFilled)}
        isFocused={Number(isFocused)}
        data-testid="input-container"
      >
        <label htmlFor={fieldName}>
          {label && label}
          <InputContainer>
            <input
              ref={inputRef}
              id={fieldName}
              type="text"
              defaultValue={defaultValue}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              {...rest}
            />

            {Icon && <Icon data-testid="input-icon" size={20} />}
          </InputContainer>
        </label>

        {error && <span>{error}</span>}
      </Container>
    </>
  );
};

export default SignInput;

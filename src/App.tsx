import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null | undefined>();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (): void => {
    const file = inputRef.current?.files?.item(0);
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);

      reader.onload = e => {
        setImage(e.target?.result);
      };
    }
  };

  return (
    <>
      <StyledContainer>
        <h1>Cardápio</h1>
        <StyledForm>
          <button type="button" onClick={() => inputRef.current?.click()}>
            <input
              ref={inputRef}
              type="file"
              id="photo-file"
              onChange={handleInput}
            />
            Selecionar imagem
          </button>
          {image && <img src={image.toString()} alt="file" />}
        </StyledForm>
        <StyledEmptyDiv />
      </StyledContainer>
      <GlobalStyle />
    </>
  );
};

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #ccc;
`;

const StyledEmptyDiv = styled.div``;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;

  button {
    input {
      display: none;
    }
  }
`;

export default App;

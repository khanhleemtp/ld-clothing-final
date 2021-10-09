import styled from 'styled-components';
export const ErrorImageOverlay = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: aliceblue;
`;

export const ErrorImageContainer = styled.div`
  width: 320px;
  height: 320px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: url(${(props) => props.imageUrl});
  background-size: contain;
`;
export const ErrorImageText = styled.div`
  color: #444;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
`;

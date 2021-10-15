import styled from "styled-components";

const StyledButton = styled.button`
  border: 1px solid;
  background-color: transparent;
  border-radius: 8px;
  padding: 5px 10px;
  margin: ${(props) => props.margin};
`;

const BlueButton = styled(StyledButton)`
  border-color: #2d55a0;
  color: #2d55a0;
  &:hover,
  &:focus {
    color: #fff;
    background-color: #2d55a0;
  }
`;

const WhiteButton = styled(StyledButton)`
  border-color: #fff;
  color: #fff;
`;

export default { StyledButton, BlueButton, WhiteButton };

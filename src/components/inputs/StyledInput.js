import styled from "styled-components";
import DatePicker from "react-datepicker";

const StyledInput = styled.input`
  display: block;
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  &:focus-visible {
    outline: none;
    border-bottom: 1px solid rgba(0, 0, 0, 1);
  }
`;

const StyledDateInput = styled(DatePicker)`
  display: block;
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  &:focus-visible {
    outline: none;
    border-bottom: 1px solid rgba(0, 0, 0, 1);
  }
`;

const TextInput = styled(StyledInput)``;

const DateInput = styled(StyledDateInput)``;

export default { StyledInput, TextInput, StyledDateInput, DateInput };

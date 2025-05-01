import styled from "styled-components";
import { Card as MuiCard } from '@mui/material';
import Typography from '@mui/material/Typography';

export const Stripe = styled.div`
    height: 10px;
    width: 100%;
    border-radius: 1px;
    background-color: ${({ $bgcolor }) => $bgcolor};
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.button};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const StyledCard = styled(MuiCard)`
        min-width: 345px;
        max-width: 346px;
        background: ${({ theme }) => theme.card} !important;
        cursor: pointer;
  `;
export const TypographyStyled = styled(Typography)`
        color: ${({ theme }) => theme.text} !important;
    `;


export const StyledModalContent = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 1rem;  
`;

export const StyledModalHeader = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  border-radius: 2px 2px 0px 0px;
`;

export const StyledModalFooter = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.primary};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-radius: 0px 0px 2px 2px;
`;
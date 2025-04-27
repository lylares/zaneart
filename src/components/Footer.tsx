import React from 'react';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  text-align: center;
  padding: var(--spacing-lg);
  background: #f5f5f5;
  color: #333333;
  margin-top: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(0, 0, 0, 0.1),
      transparent
    );
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 1;
  }
`;

const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dotted currentColor;
  transition: border-bottom var(--transition-fast);
  
  &:hover {
    border-bottom: 1px solid currentColor;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2025 . Design by <FooterLink href="https://www.lylares.com/" target="_blank" rel="noopener noreferrer">LYLARES</FooterLink> </FooterText>
    </FooterContainer>
  );
};

export default Footer; 
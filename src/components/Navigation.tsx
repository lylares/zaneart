import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  position: relative;
  width: 100%;
  height: 50px;
  z-index: 3;
  transition: all 0.3s ease;
  margin-top: -15px;
  margin-bottom: -10px;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.5rem 0.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem;
  position: relative;
  transition: all 0.3s ease;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.3rem;
  }

  &:hover {
    color: var(--primary-color);
  }

  &.active {
    color: var(--primary-color);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: var(--primary-color);
      border-radius: 2px;
    }
  }
`;

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/home', label: '首页' },
    { path: '/gallery', label: '精彩瞬间' },
    { path: '/milestones', label: '成长历程' }
  ];

  return (
    <Nav>
      <NavContainer>
        <NavLinks>
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={location.pathname === path ? 'active' : ''}
              onClick={() => navigate(path)}
            >
              {label}
            </NavLink>
          ))}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navigation; 
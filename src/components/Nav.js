import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavList, LinkStyled, Na } from './Nav.styled';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];
const Nav = () => {
  const location = useLocation();
  console.log(location);
  return (
    <NavList>
      <ul>
        {LINKS.map(item => (
          <Na>
            <li key={item.to}>
              <LinkStyled
                to={item.to}
                className={item.to === location.pathname ? 'active' : ' '}
              >
                {item.text}
              </LinkStyled>
            </li>
          </Na>
        ))}
      </ul>
    </NavList>
  );
};

export default Nav;

import { FC } from 'react';
import { Link } from 'react-router-dom';

type NavLinkProps = {
  bg: string;
  to: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavLink: FC<NavLinkProps> = ({ bg, to, text, textColor, onClick }) => {
  return (
    <Link
      onClick={onClick}
      className='nav-link'
      to={to}
      style={{
        background: bg,
        color: textColor,
      }}
    >
      {text}
    </Link>
  );
};

export default NavLink;

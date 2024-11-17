import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-[hsl(var(--sidebar-accent))] py-5">
      <header className="px-4 text-[32px] font-bold text-[hsl(var(--sidebar-primary))]">
        <Link to="/">portfolio tracker</Link>
      </header>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-1 bg-[hsl(var(--sidebar-accent))] py-5 text-sm text-muted-foreground">
      <p>© 2024 Tereza Muzikova</p>
      <div className="flex flex-row gap-2">
        <a
          href="https://github.com/tmuzikova"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs underline"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/tereza-muzikova/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs underline"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

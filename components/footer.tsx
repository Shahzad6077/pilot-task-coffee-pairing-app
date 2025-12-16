export function Footer() {
  return (
    <footer className="w-full py-6 px-6 border-t border-foreground/10 bg-background">
      <div className="max-w-md mx-auto flex flex-col items-center gap-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            About
          </a>
          <span className="text-foreground/20">|</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <span className="text-foreground/20">|</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
        <p className="text-[10px] text-muted-foreground/60">
          PAIR&apos;D &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

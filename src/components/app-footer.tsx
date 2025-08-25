export default function AppFooter() {
  return (
    <footer className="w-full border-t border-border rounded-t-xl mt-5 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          © {new Date().getFullYear()} All rights reserved
        </p>
        {/* <nav className="flex gap-4 text-sm text-primary">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </nav> */}
      </div>
    </footer>
  );
}

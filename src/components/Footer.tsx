import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo size="md" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Formula sheets for CBSE Class 12 Physics, Chemistry and Mathematics. Built for fast,
            focused revision.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Subjects</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/physics" className="hover:text-primary">
                Physics
              </Link>
            </li>
            <li>
              <Link to="/chemistry" className="hover:text-primary">
                Chemistry
              </Link>
            </li>
            <li>
              <Link to="/mathematics" className="hover:text-primary">
                Mathematics
              </Link>
            </li>
            <li>
              <Link to="/computer-science" className="hover:text-primary">
                Computer Science
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">More</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Vector &amp; Valency · Learn Smart, Score Better
      </div>
    </footer>
  );
}

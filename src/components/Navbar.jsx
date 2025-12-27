import { Link } from "react-router-dom";
import { useLogout } from "../api/useLogout";

export default function Navbar() {
  const { logout } = useLogout();

  return (
    <header className="sticky top-0  z-50  backdrop-blur-xl ">
      <div className="max-w-auto mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center space-x-3">
            <div className="text-2xl text-terracotta">
              <svg
                className="w-10 h-10 inline-block"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 11v1a7 7 0 0 1-14 0v-1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="text-3xl font-header tracking-tight text-neutral-900">
                LokSwar
              </div>
              <div className="text-xs mono text-neutral-500">
                The Indian Archive
              </div>
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-8 text-sm text-neutral-800">
          <Link to="/record" className="hover:underline">
            Record
          </Link>
          <Link to="/map" className="hover:underline">
            Map
          </Link>
          <Link to="/stories" className="hover:underline">
            All Stories
          </Link>
          <Link to="/leaders" className="hover:underline">
            LeaderBoard
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <button
            onClick={logout}
            className="group relative bg-orange-500 text-neutral-800 px-3 py-2 rounded-full transition-all hover:bg-neutral-800 hover:text-white hover:ring-4 hover:ring-orange-500/20 active:scale-95"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

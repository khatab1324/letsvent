import Link from "next/link";

export default function Navbar() {
  return (
    <header className="">
      <nav className="absolute z-10 w-full border-b  lg:border-transparent ">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 md:gap-0 md:py-4 ">
            <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max ">
              <a
                href="https://github.com/khatab1324"
                aria-label="logo"
                className="flex items-center space-x-2 w-44"
              >
                <div aria-hidden="true" className="flex space-x-1 "></div>
                <svg
                  width="556.4"
                  height="92.02744364346592"
                  viewBox="0 0 375 62.02424760298295"
                >
                  <defs id="SvgjsDefs2312"></defs>
                  <g
                    id="SvgjsG2313"
                    transform="matrix(0.8484848484848485,0,0,0.8484848484848485,-6.957576404918324,-11.200000647342566)"
                    fill="#000000"
                  >
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="#000000"
                        d="M73.7,86.3c-0.2,0-0.3,0-0.5-0.1L51.7,74.1h-5.2c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1H52c0.2,0,0.3,0,0.5,0.1   l20.2,11.4V73.1c0-0.6,0.4-1,1-1h7.5c4.1,0,7.5-3.4,7.5-7.5V29.7c0-0.6,0.4-1,1-1c0.6,0,1,0.4,1,1v34.9c0,5.2-4.3,9.5-9.5,9.5h-6.5   v11.2c0,0.4-0.2,0.7-0.5,0.9C74.1,86.2,73.9,86.3,73.7,86.3z"
                      ></path>
                      <path
                        fill="#000000"
                        d="M25.2,79.2c-0.2,0-0.3,0-0.5-0.1c-0.3-0.2-0.5-0.5-0.5-0.9V67h-6.5c-5.2,0-9.5-4.3-9.5-9.5V22.7   c0-5.2,4.3-9.5,9.5-9.5h53.8c5.2,0,9.5,4.3,9.5,9.5v34.9c0,5.2-4.3,9.5-9.5,9.5H47.2L25.7,79.1C25.6,79.2,25.4,79.2,25.2,79.2z    M17.7,15.2c-4.1,0-7.5,3.4-7.5,7.5v34.9c0,4.1,3.4,7.5,7.5,7.5h7.5c0.6,0,1,0.4,1,1v10.5l20.2-11.4c0.1-0.1,0.3-0.1,0.5-0.1h24.6   c4.1,0,7.5-3.4,7.5-7.5V22.7c0-4.1-3.4-7.5-7.5-7.5H17.7z"
                      ></path>
                      <circle
                        fill="#000000"
                        cx="26.9"
                        cy="42.3"
                        r="3.9"
                      ></circle>
                      <circle
                        fill="#000000"
                        cx="44.6"
                        cy="42.3"
                        r="3.9"
                      ></circle>
                      <circle
                        fill="#000000"
                        cx="62.7"
                        cy="42.3"
                        r="3.9"
                      ></circle>
                    </g>
                  </g>
                  <g
                    id="SvgjsG2314"
                    transform="matrix(3.3274162399145504,0,0,3.3274162399145504,92.20497064406621,-11.036370767569927)"
                    fill="#000000"
                  >
                    <path d="M3.82 5.119999999999999 l0 14.88 l-2.98 0 l0 -14.88 l2.98 0 z M15.447708333333333 15.08 l0 0.66 l-7.04 0 c0 1.16 1.18 1.98 2.16 1.98 c0.96 0 1.84 -0.38 2.3 -1.22 l1.98 1.82 c-0.8 1.08 -2.02 1.84 -4.28 1.84 c-3.24 0 -5.22 -2.16 -5.22 -5.08 s1.92 -5.1 5.04 -5.1 s5.06 2.14 5.06 5.1 z M8.467708333333333 13.86 l3.88 0 c-0.16 -0.94 -0.84 -1.44 -1.96 -1.44 c-1.08 0 -1.74 0.58 -1.92 1.44 z M20.115416666666665 15.8 c0 0.72 -0.02 1.92 1.08 1.92 c0.54 0 0.88 -0.22 1.26 -0.5 l0 2.44 c-0.46 0.26 -1.02 0.5 -1.62 0.5 c-2.54 0 -3.68 -1.08 -3.68 -4.36 l0 -3.24 l-1.1 0 l0 -2.44 l1.1 0 l0 -2.84 l2.96 0 l0 2.84 l2.34 0 l0 2.44 l-2.34 0 l0 3.24 z M26.783125 13.24 c0 1.18 5 0.62 5 3.74 c0 2.04 -1.8 3.18 -4.04 3.18 c-1.42 0 -2.84 -0.7 -3.96 -1.82 l1.94 -1.94 c0.56 0.68 1.36 1.2 2.02 1.26 s1.22 -0.22 1.32 -0.52 c0.24 -0.76 -1.14 -0.8 -1.56 -0.92 c-1.58 -0.48 -3.42 -1.14 -3.42 -3.1 c0 -2.34 2.44 -3.14 3.66 -3.14 c1.4 0 2.82 0.64 3.96 1.8 l-1.92 1.92 c-0.52 -0.68 -1.42 -1.22 -2.04 -1.22 c-0.32 0 -0.96 0.12 -0.96 0.76 z M43.31854166666666 20 l-1.94 0 l-4.18 -9.88 l3.06 0 l2.08 5.64 c0.68 -1.72 1.44 -3.98 2.08 -5.64 l3.04 0 z M57.926249999999996 15.08 l0 0.66 l-7.04 0 c0 1.16 1.18 1.98 2.16 1.98 c0.96 0 1.84 -0.38 2.3 -1.22 l1.98 1.82 c-0.8 1.08 -2.02 1.84 -4.28 1.84 c-3.24 0 -5.22 -2.16 -5.22 -5.08 s1.92 -5.1 5.04 -5.1 s5.06 2.14 5.06 5.1 z M50.94624999999999 13.86 l3.88 0 c-0.16 -0.94 -0.84 -1.44 -1.96 -1.44 c-1.08 0 -1.74 0.58 -1.92 1.44 z M68.29395833333334 14.36 l0 5.64 l-2.96 0 l0 -5.64 c0 -1.5 -0.4 -2.16 -1.56 -2.16 c-1.2 0 -1.9 0.66 -1.9 2.16 l0 5.64 l-2.96 0 l0 -9.88 l2.96 0 l0 0.94 c0.76 -0.74 1.8 -1.08 2.66 -1.08 c2.78 0 3.76 1.34 3.76 4.38 z M73.32166666666667 15.8 c0 0.72 -0.02 1.92 1.08 1.92 c0.54 0 0.88 -0.22 1.26 -0.5 l0 2.44 c-0.46 0.26 -1.02 0.5 -1.62 0.5 c-2.54 0 -3.68 -1.08 -3.68 -4.36 l0 -3.24 l-1.1 0 l0 -2.44 l1.1 0 l0 -2.84 l2.96 0 l0 2.84 l2.34 0 l0 2.44 l-2.34 0 l0 3.24 z M79.98937500000001 13.24 c0 1.18 5 0.62 5 3.74 c0 2.04 -1.8 3.18 -4.04 3.18 c-1.42 0 -2.84 -0.7 -3.96 -1.82 l1.94 -1.94 c0.56 0.68 1.36 1.2 2.02 1.26 s1.22 -0.22 1.32 -0.52 c0.24 -0.76 -1.14 -0.8 -1.56 -0.92 c-1.58 -0.48 -3.42 -1.14 -3.42 -3.1 c0 -2.34 2.44 -3.14 3.66 -3.14 c1.4 0 2.82 0.64 3.96 1.8 l-1.92 1.92 c-0.52 -0.68 -1.42 -1.22 -2.04 -1.22 c-0.32 0 -0.96 0.12 -0.96 0.76 z"></path>
                  </g>
                </svg>
              </a>

              <div className="relative flex max-h-10 items-center lg:hidden ">
                <button
                  aria-label="humburger"
                  id="hamburger"
                  className="relative -mr-6 p-6 "
                >
                  <div
                    aria-hidden="true"
                    id="line"
                    className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300 "
                  ></div>
                  <div
                    aria-hidden="true"
                    id="line2"
                    className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300 "
                  ></div>
                </button>
              </div>
            </div>
            <div
              id="navLayer"
              aria-hidden="true"
              className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 dark:bg-gray-900/70 lg:hidden "
            ></div>
            <div
              id="navlinks"
              className="invisible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-300 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-gray-700  dark:shadow-none lg:visible lg:relative lg:flex lg:w-7/12 lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none "
            >
              <div className="mt-12 lg:mt-0 ">
                <Link
                  href="/signin"
                  className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max "
                >
                  <span className="relative text-sm font-semibold text-white ">
                    {" "}
                    sign in
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

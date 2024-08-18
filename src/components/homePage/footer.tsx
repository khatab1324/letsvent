import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="py-40 ">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12">
          <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
            <div className="flex w-full justify-center space-x-12 text-gray-600 dark:text-gray-300 sm:w-7/12 md:justify-start">
              <ul role="list" className="space-y-8">
                <li>
                  <a
                    href="https://github.com/khatab1324"
                    className="flex items-center space-x-3 transition hover:text-white"
                  >
                    <FaGithub size={30} />
                    <span>Github</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/khattab-fayyad-760354261/"
                    className="flex items-center space-x-3 transition hover:text-white"
                  >
                    <FaLinkedin size={30} />
                    <span>Linkedin</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Main() {
  return (
    <main className="">
      <div className="relative" id="home">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 ">
          <div className="relative pt-72 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
              <h1 className="text-white dark:text-white font-bold text-4xl md:text-5xl xl:text-6xl">
                start chating with your
                <span className=" dark:text-white"> friends</span>
              </h1>

              <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                <Link
                  href={"/signin"}
                  className="relative text-base font-semibold text-white"
                >
                  Get started
                </Link>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

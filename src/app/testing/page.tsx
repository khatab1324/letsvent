"use client";

import { useEffect, useState } from "react";
import { socket } from "../clientSocket";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  socket.on("welcome", (data) => {
    console.log("Received welcome message:", data.message);

    // Display the welcome message (optional)
    // ...
    setData(data.message);
  });
  return (
    <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
      <div className="flex-1 flex flex-col">
        <main className="flex-grow flex flex-row min-h-0">
          <section className="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
            <div className="header p-4 flex flex-row justify-between items-center flex-none">
              <div
                className="w-16 h-16 relative flex flex-shrink-0"
                // style={"filter: invert(100%)"}
              >
                <img
                  className="rounded-full w-full h-full object-cover"
                  alt="ravisankarchinnam"
                  src="https://avatars3.githubusercontent.com/u/22351907?s=60"
                />
              </div>
              <p className="text-md font-bold hidden md:block group-hover:block">
                Messenger
              </p>
              <a
                href="#"
                className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 hidden md:block group-hover:block"
              >
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                  <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
                </svg>
              </a>
            </div>
            <div className="search-box p-4 flex-none">
              <form>
                <div className="relative">
                  <label>
                    <input
                      className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                      type="text"
                      value=""
                      placeholder="Search Messenger"
                    />
                    <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                      <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path
                          fill="#bbb"
                          d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </form>
            </div>
            <div className="active-users flex flex-row p-2 overflow-auto w-0 min-w-full">
              <div className="text-sm text-center mr-4">
                <button
                  className="flex flex-shrink-0 focus:outline-none block bg-gray-800 text-gray-600 rounded-full w-20 h-20"
                  type="button"
                >
                  <svg
                    className="w-full h-full fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
                  </svg>
                </button>
                <p>Your Story</p>
              </div>

              <div className="text-sm text-center mr-4">
                <div className="p-1 rounded-full">
                  <div className="w-16 h-16 relative flex flex-shrink-0">
                    <img
                      className="shadow-md rounded-full w-full h-full object-cover"
                      src="https://randomuser.me/api/portraits/women/65.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <p>Eva</p>
              </div>
              <div className="text-sm text-center mr-4">
                <div className="p-1 border-4 border-transparent rounded-full">
                  <div className="w-16 h-16 relative flex flex-shrink-0">
                    <img
                      className="shadow-md rounded-full w-full h-full object-cover"
                      src="https://randomuser.me/api/portraits/men/31.jpg"
                      alt=""
                    />
                    <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                      <div className="bg-green-500 rounded-full w-3 h-3"></div>
                    </div>
                  </div>
                </div>
                <p>Max</p>
              </div>
              <div className="text-sm text-center mr-4">
                <div className="p-1 border-4 border-blue-600 rounded-full">
                  <div className="w-16 h-16 relative flex flex-shrink-0">
                    <img
                      className="shadow-md rounded-full w-full h-full object-cover"
                      src="https://randomuser.me/api/portraits/men/81.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <p>Adam</p>
              </div>
            </div>
            <div className="contacts p-2 flex-1 overflow-y-scroll">
              <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                <div className="w-16 h-16 relative flex flex-shrink-0">
                  <img
                    className="shadow-md rounded-full w-full h-full object-cover"
                    src="https://randomuser.me/api/portraits/women/61.jpg"
                    alt=""
                  />
                </div>
                <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                  <p>Angelina Jolie</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="min-w-0">
                      <p className="truncate">
                        Ok, see you at the subway in a bit.
                      </p>
                    </div>
                    <p className="ml-2 whitespace-no-wrap">Just now</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                <div className="w-16 h-16 relative flex flex-shrink-0">
                  <img
                    className="shadow-md rounded-full w-full h-full object-cover"
                    src="https://randomuser.me/api/portraits/men/97.jpg"
                    alt=""
                  />
                  <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                    <div className="bg-green-500 rounded-full w-3 h-3"></div>
                  </div>
                </div>
                <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                  <p className="font-bold">Tony Stark</p>
                  <div className="flex items-center text-sm font-bold">
                    <div className="min-w-0">
                      <p className="truncate">Hey, Are you there?</p>
                    </div>
                    <p className="ml-2 whitespace-no-wrap">10min</p>
                  </div>
                </div>
                <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"></div>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                <div className="w-16 h-16 relative flex flex-shrink-0">
                  <img
                    className="shadow-md rounded-full w-full h-full object-cover"
                    src="https://randomuser.me/api/portraits/women/23.jpg"
                    alt="User2"
                  />
                </div>
                <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                  <p>Emma Watson</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="min-w-0">
                      <p className="truncate">You sent a video.</p>
                    </div>
                    <p className="ml-2 whitespace-no-wrap">11 Feb</p>
                  </div>
                </div>
                <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
                  <img
                    className="rounded-full w-full h-full object-cover"
                    alt="user2"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* end the side bar */}

          <section className="flex flex-col flex-auto border-l border-gray-800">
            <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
              <div className="flex">
                <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                  <img
                    className="shadow-md rounded-full w-full h-full object-cover"
                    src="https://randomuser.me/api/portraits/women/33.jpg"
                    alt=""
                  />
                </div>
                <div className="text-sm">
                  <p className="font-bold">Scarlett Johansson</p>
                  <p>Active 1h ago</p>
                </div>
              </div>
            </div>
            <div className="chat-body p-4 flex-1 overflow-y-scroll">
              <p className="p-4 text-center text-sm text-gray-500"> 8:04 PM</p>
              <div className="flex flex-row justify-start">
                <p className="w-3 relative flex flex-shrink-0 "></p>
                <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                  <div className="flex items-center group">
                    <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                      Hey! How are you?
                    </p>
                    <button
                      type="button"
                      className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="w-full h-full fill-current"
                      >
                        <path
                          d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
 M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="w-full h-full fill-current"
                      >
                        <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-full h-full fill-current"
                      >
                        <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <p className="p-4 text-center text-sm text-gray-500">
                {" "}
                FRI 3:04 PM
              </p>
              <div className="flex flex-row justify-end">
                <div className="messages text-sm text-white grid grid-flow-row gap-2">
                  <div className="flex items-center flex-row-reverse group">
                    <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
                      Hey! How are you?
                    </p>
                    <button
                      type="button"
                      className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="w-full h-full fill-current"
                      >
                        <path
                          d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
	 M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
	C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="w-full h-full fill-current"
                      >
                        <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-full h-full fill-current"
                      >
                        <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-footer flex-none">
              <div className="flex flex-row items-center p-4">
                <button
                  type="button"
                  className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="w-full h-full fill-current"
                  >
                    <path d="M10,1.6c-4.639,0-8.4,3.761-8.4,8.4s3.761,8.4,8.4,8.4s8.4-3.761,8.4-8.4S14.639,1.6,10,1.6z M15,11h-4v4H9  v-4H5V9h4V5h2v4h4V11z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="w-full h-full fill-current"
                  >
                    <path d="M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z" />
                  </svg>
                </button>

                <div className="relative flex-grow">
                  <label>
                    <input
                      className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                      type="text"
                      value=""
                      placeholder="Aa"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="w-full h-full fill-current"
                      >
                        <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
                      </svg>
                    </button>
                  </label>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

// function classNames(...classes: any[]) {
//     return classes.filter(Boolean).join(' ')
// }

export default function NavBar() {
  // LoginCheck()

  // const currentUser = useStore((state) => state.currentUser);
  // const signOut = useStore((state) => state.signOut);

  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
  // const { authUser, signOut } = UseAuthContext();

  const navBarHeight = 5;
  // h-[${navBarHeight}rem]
  const navBarHeightStyle = `h-[${navBarHeight}rem]`;
  const styles = {
    userMenuOptions:
      "absolute top-14 right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
  };

  return (
    <nav className={`bg-gray-800 w-full h-14`}>
      <div className={`h-full mx-auto px-2 sm:px-6 lg:px-8`}>
        <div className={`relative flex h-full items-center justify-between`}>
          <div className="absolute inset-y-0 left-0 flex items-center">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* <!--Icon when menu is closed.Menu open: "hidden", Menu closed: "block"--> */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* <!-- Icon when menu is open. Menu open: "block", Menu closed: "hidden" --> */}
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              {/* <img className="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img>
                            <img className="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img> */}
            </div>
            <div className="hidden sm:ml-6 sm:block">
              {/* <div className="flex space-x-4">
                                <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
                                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
                                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
                                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
                            </div> */}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center justify-between pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </button> */}

            {/* <!-- Profile dropdown --> */}
            <div className="relative ml-3 flex space-x-4 items-center justify-center">
              <DevLogin />

              <a
                type="button"
                className="w-12 h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="new-note-button"
                onClick={() => {}}
                href="/newNote"
              >
                <span className="sr-only">New Note</span>
                <svg
                  className="w-16 stroke-zinc-600 stroke-0"
                  viewBox="0 0 15 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.70711L9.29289 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H9.5C9.63261 1 9.75979 1.05268 9.85355 1.14645L12.7803 4.07322C12.921 4.21388 13 4.40464 13 4.60355V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5ZM4.75 7.5C4.75 7.22386 4.97386 7 5.25 7H7V5.25C7 4.97386 7.22386 4.75 7.5 4.75C7.77614 4.75 8 4.97386 8 5.25V7H9.75C10.0261 7 10.25 7.22386 10.25 7.5C10.25 7.77614 10.0261 8 9.75 8H8V9.75C8 10.0261 7.77614 10.25 7.5 10.25C7.22386 10.25 7 10.0261 7 9.75V8H5.25C4.97386 8 4.75 7.77614 4.75 7.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>

              <button
                type="button"
                className="w-12 h-12 flex rounded-full bg-gray-800 text-sm items-center justify-center focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800"
                id="user-menu-button"
                onClick={() => setUserMenuIsOpen(!userMenuIsOpen)}
                // onBlur={() => setUserMenuIsOpen(false)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                ></img>
              </button>

              <div
                className={`${styles.userMenuOptions} ${
                  userMenuIsOpen ? "block" : "hidden"
                }`}
                role="menu"
              >
                {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">Your Profile</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">Settings</a> */}
               

                <a
                  href="/auth/loginPage"
                  onBlur={() => setUserMenuIsOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-2"
                >
                  Sign In
                </a>

                <a
                  href="/auth/loginPage"
                  onClick={() => {}}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-2"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {/* <div className="h-1/2 sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
                </div>
            </div> */}
    </nav>
  );
}

export const DevLogin = () => {
  // https://firebase.google.com/docs/reference/rest/auth/#section-fetch-providers-for-email

  //     curl 'https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=[API_KEY]' \
  // -H 'Content-Type: application/json' \
  // --data-binary '{"identifier":"[user@example.com]","continueUri":"[http://localhost:8080/app]"}'


  const email = "email@email.com";
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY;
  const fetchProvidersForEmailURL = `https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=${apiKey}`;
  const sampleData = {
    identifier: `${email}`,
    continueUri: "http://localhost:3000/auth/loginPage",
  };
  const signInWithEmailPassURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  const password = "123456";
  const emailSignInData = {
    email: `${email}`,
    password: `${password}`,
    returnSecureToken: true,
  };

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
    });

    const json = await response.json();
    return json;
  }

  async function getresponse(data: {} | undefined) {
    postData(signInWithEmailPassURL, data)
      .then((res) => {
        // console.log(res);
        // console.log(res.email);


        // {
        //   "kind": "identitytoolkit#VerifyPasswordResponse",
        //   "localId": "hV8zmJzkImXsfSzzAZOqrHQOgJ73",
        //   "email": "email@email.com",
        //   "displayName": "",
        //   "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2ZGE4NmU4MWJkNTllMGE4Y2YzNTgwNTJiYjUzYjUzYjE4MzA3NzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGVyc29uLWRhdGFiYXNlLXRlc3QtZjY4NTMiLCJhdWQiOiJwZXJzb24tZGF0YWJhc2UtdGVzdC1mNjg1MyIsImF1dGhfdGltZSI6MTY4MjA2NzI2MywidXNlcl9pZCI6ImhWOHptSnprSW1Yc2ZTenpBWk9xckhRT2dKNzMiLCJzdWIiOiJoVjh6bUp6a0ltWHNmU3p6QVpPcXJIUU9nSjczIiwiaWF0IjoxNjgyMDY3MjYzLCJleHAiOjE2ODIwNzA4NjMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImVtYWlsQGVtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.ctbO_JnZnEgB5Xd1Pu181sJ0tZjwUPhMV6yLsXPfEnS65qouUrkCxJRaE23IzSO4eDPLB-G_z5hVcKeRNbjRpzV4OY7gWlh0sCmL71_CzFRPAYImUeqLyYpWW6gV4XvXKvJXk40P1CJhr6tD5QOK3VlXP0PSy64iBICS6Gv2GEIarx19u_LlXDXdz1omZcU-DdLKp18QJhXOwhCqdKklBHQZy4D1FrkkVdXvBk34zq-KBtqDcvqTh7I9j_nJ2B0qHPEwQXUer2UdgOKEvM8uqVOcMJMA234_-xOW3BcmCBq2mpNKmBMm7EMZHxO9bQEYJgkV7-ox4fnpfF-9UxJgTw",
        //   "registered": true,
        //   "refreshToken": "APJWN8fWLYgbdIWh6DvJn5CeOTrpFlaMSgGcbovtli9CAzrSnthMQDDerLs-jBi0La_jB3RmgiFhYFF37sayw8b6qrucdrn4amnIB0Bz5ixqMt6lmfMiejg-RKTflCta_vzQZdUtnum48YhYWEZEvcBQAPJWP6Ib3FgJZHp_ue8aD9925KgzrO53E9LQsn9vko-HOYhSTywzBWHX5cDUlxwW4AzSPeXdjgG1xWM4TRSQP_zuechlaiY",
        //   "expiresIn": "3600"
        // }
      })
      .catch((e) => {
        console.log("error", e);
      });
  }

  return (
    <div className="flex">
   
      <button
        onClick={() => getresponse(emailSignInData)}
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Dev Login
      </button>
    </div>
  );
};

// {!!currentUser?.email ? (
//   <p
//     onBlur={() => setUserMenuIsOpen(false)}
//     className="block px-4 py-2 text-sm text-gray-700 bg-blue-100"
//     role="menuitem"
//     id="user-menu-item-2"
//   >
//     {currentUser?.email}
//   </p>
// ) : (
//   <></>
// )}
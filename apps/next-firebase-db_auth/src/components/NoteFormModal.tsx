import {
  addDoc,
  getDocs,
  QuerySnapshot,
  DocumentData,
  collection,
} from "firebase/firestore";
import { SetStateAction, useEffect, useState } from "react";

import dynamic from "next/dynamic"; // to ensure that code is run on the client. Quill ofcourse can not be run from the server.
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { firebaseDB } from "@/lib/firebaseConfig";

type RNote = { id: string; noteTitle: string; noteDesc: string }[];

const dbInstance = collection(firebaseDB, "notes");

export default function NoteFormModal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* <!-- Modal toggle --> */}
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          setModalOpen(!modalOpen);
        }}
      >
        Toggle modal
      </button>

      {/* <!-- Main modal --> */}

      <div
        className={`fixed top-0 left-0 right-0 z-50 ${
          modalOpen ? "" : "hidden"
        } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        onBlur={() => {
          setModalOpen(false);
        }}
      >
        <div className="relative w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-1.5 right-1.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <GoogleNoteForm />
          </div>
        </div>
      </div>
    </>
  );
}

export const NewNoteForm = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");

  const addDesc = (value: SetStateAction<string>) => {
    setNoteDesc(value);
  };

  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      setNoteTitle("");
      setNoteDesc("");
    });
  };

  useEffect(() => {}, []);

  const styles = {
    button: "w-full h-8 cursor-pointer bg-blue-400 text-white border-[]",
  };

  return (
    <div className="flex flex-col">
      <input
        className="w-full h-12 border text-center border-solid border-gray-300"
        placeholder="enter a title.."
        onChange={(e) => setNoteTitle(e.target.value)}
        value={noteTitle}
      />

      <div className="w-full max-h-full">
        <ReactQuill
          theme="snow"
          onChange={addDesc}
          value={noteDesc}
          placeholder="enter a note..."
          modules={modules}
          formats={formats}
          className="max-h-full"
        />
      </div>

      <button onClick={saveNote} className={`${styles.button}`}>
        Save Note
      </button>
    </div>
  );
};

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export const GoogleNoteForm = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [toolbarVisible, setToolbarVisible] = useState(true);

  const addDesc = (value: SetStateAction<string>) => {
    setNoteDesc(value);
  };

  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      setNoteTitle("");
      setNoteDesc("");
    });
  };

  const toggleToolbar = () => {
    setToolbarVisible(!toolbarVisible);
  };

  useEffect(() => {}, []);

  const styles = {
    button: "w-full h-8 cursor-pointer bg-blue-400 text-white border-[]",
  };

  return (
    <div className="flex flex-col">
      <button onClick={toggleToolbar}>
        {toolbarVisible ? "Hide" : "Show"} Toolbar
      </button>
      <input
        className="w-full h-12 border text-center border-solid border-gray-300"
        placeholder="enter a title.."
        onChange={(e) => setNoteTitle(e.target.value)}
        value={noteTitle}
      />

      <div className="w-full max-h-full">
        <ReactQuill
          theme="snow"
          onChange={addDesc}
          value={noteDesc}
          placeholder="enter a note..."
          // modules={modules}
          modules={{ toolbar: false }}
          formats={formats}
          className="max-h-full"
        />
      </div>

      <button onClick={saveNote} className={`${styles.button}`}>
        Save Note
      </button>
    </div>
  );
};

export const FormTest = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);

  const addDesc = (value: SetStateAction<string>) => {
    setNoteDesc(value);
  };

  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      setNoteTitle("");
      setNoteDesc("");
    });
  };

  useEffect(() => {}, []);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const noModules = { toolbar: false };
  const toggleToolbar = () => {
    setToolbarVisible(!toolbarVisible);
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const styles = {
    button: "w-full h-8 cursor-pointer bg-blue-400 text-white border-[]",
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-100 bg-blue-50 m-2 p-4 overflow-y-auto md:inset-0 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-lg`}
      onBlur={() => {
        setModalOpen(false);
      }}
    >
      dedede
      <NoteFormXButton />
      <ToolBarToggleButton />
      <div className="relative w-full max-w-md max-h-full">
        <input
          className="w-full h-12 text-center border-solid border-gray-300"
          placeholder="Title.."
          onChange={(e) => setNoteTitle(e.target.value)}
          value={noteTitle}
        />
        <div className="w-full max-h-full">
          <ReactQuill
            theme="snow"
            onChange={addDesc}
            value={noteDesc}
            placeholder="enter a note..."
            modules={toolbarVisible ? modules : noModules}
            // modules={{ toolbar: false }}
            formats={formats}
            className="max-h-full border-0"
          />
        </div>



        <div className="relative bg-white shadow dark:bg-gray-700">
          <div className="flex flex-col">
            <button onClick={toggleToolbar}>
              {toolbarVisible ? "Hide" : "Show"} Toolbar
            </button>
            <input
              className="w-full h-12 border text-center border-solid border-gray-300"
              placeholder="enter a title.."
              onChange={(e) => setNoteTitle(e.target.value)}
              value={noteTitle}
            />

            <div className="w-full max-h-full">
              <ReactQuill
                theme="snow"
                onChange={addDesc}
                value={noteDesc}
                placeholder="enter a note..."
                modules={toolbarVisible ? modules : noModules}
                // modules={{ toolbar: false }}
                formats={formats}
                className="max-h-full"
              />
            </div>

            <button onClick={saveNote} className={`${styles.button}`}>
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoteFormXButton = () => {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <button
      type="button"
      className="absolute top-1.5 right-1.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
      onClick={() => {
        //   setModalOpen(false);
      }}
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Close modal</span>
    </button>
  );
};

const ToolBarToggleButton = () => {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <button
      type="button"
      className="absolute bottom-1.5 right-1.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
      onClick={() => {
        //   setModalOpen(false);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // class="icon icon-tabler icon-tabler-tools"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />
        <line x1="14.5" y1="5.5" x2="18.5" y2="9.5" />
        <polyline points="12 8 7 3 3 7 8 12" />
        <line x1="7" y1="8" x2="5.5" y2="9.5" />
        <polyline points="16 12 21 17 17 21 12 16" />
        <line x1="16" y1="17" x2="14.5" y2="18.5" />
      </svg>
      <span className="sr-only">Close modal</span>
    </button>
  );
};

const OGNoteForm = () => {
  return (
    <div className="px-6 py-6 lg:px-8">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Sign in to our platform
      </h3>
      <form className="space-y-6" action="#">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div className="flex justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <a
            href="#"
            className="text-sm text-blue-700 hover:underline dark:text-blue-500"
          >
            Lost Password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <a
            href="#"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </a>
        </div>
      </form>
    </div>
  );
};

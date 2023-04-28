import { useEffect, useState } from "react";
import { firebaseDB } from "../lib/firebaseConfig";
import {
  // collection,
  // addDoc,
  // getDocs,
  // QuerySnapshot,
  // DocumentData,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import dynamic from "next/dynamic"; // to ensure that code is run on the client. Quill ofcourse can not be run from the server.
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type FNote = { id: string; noteTitle: string; noteDesc: string };
type RNote = { id: string; noteTitle: string; noteDesc: string }[];

// const dbInstance = collection(firebaseDB, "notes");

export default function NoteDetails(props: { ID: string | null }) {
  const [singleNote, setSingleNote] = useState<FNote>({
    noteTitle: "No notes selected ...",
    noteDesc: "",
    id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");

  const getSingleNote = async () => {
    if (props.ID) {
      const singleNote = doc(firebaseDB, "notes", props.ID);
      const data = await getDoc(singleNote);
      // console.log({ ...data.data(), id: data.id })

      const dataFunc = data.data();
      const dataAny: any = dataFunc;
      const noteTitle: string = dataAny.noteTitle;
      const noteDesc: string = dataAny.noteDesc;

      setSingleNote({ noteTitle: noteTitle, noteDesc: noteDesc, id: data.id });
    }
  };

  const getEditData = () => {
    setIsEdit(true);
    setNoteTitle(singleNote.noteTitle);
    setNoteDesc(singleNote.noteDesc);
  };

  const editNote = (id: string) => {
    const collectionById = doc(firebaseDB, "notes", id);

    updateDoc(collectionById, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      window.location.reload();
    });
  };

  const deleteNote = (id: string) => {
    const collectionById = doc(firebaseDB, "notes", id);

    deleteDoc(collectionById).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    getSingleNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.ID]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full text-center">
        <button
          className="w-20 h-8 bg-blue-400 cursor-pointer ml-0 mr-2.5 my-2.5 border-[none] rounded-[8px]"
          onClick={getEditData}
        >
          Edit
        </button>
        <button
          className="w-20 h-8 bg-red-400 cursor-pointer ml-0 mr-2.5 my-2.5 border-[none] rounded-[8px]"
          onClick={() => deleteNote(singleNote.id)}
        >
          Delete
        </button>
      </div>

      {isEdit ? (
        <div className="w-full text-center">
          <input
            className="w-60 h-8 border mx-0 my-[5px] rounded-[5px] border-solid border-"
            placeholder="Enter the Title.."
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
          />
          <div className="w-60">
            <ReactQuill onChange={setNoteDesc} value={noteDesc} />
          </div>
          <button
            onClick={() => editNote(singleNote.id)}
            className="w-60 h-8 cursor-pointer bg-red-500 text-white border-[]"
          >
            Update Note
          </button>
        </div>
      ) : (
        <></>
      )}

      {singleNote != undefined ? (
        <div className="w-full text-center border border-blue-400 text-center mt-1 rounded-[10px] border-dashed">
          <h2 className="font-bold text-lg">{singleNote.noteTitle}</h2>
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: singleNote.noteDesc }}
          ></div>
        </div>
      ) : (
        <>No notes selected ...</>
      )}
    </div>
  );
}

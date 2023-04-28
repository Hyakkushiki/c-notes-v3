import { SetStateAction, useEffect, useState } from "react";
import { firebaseDB } from "../lib/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

import dynamic from "next/dynamic"; // to ensure that code is run on the client. Quill ofcourse can not be run from the server.
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type FNote = { id: string; noteTitle: string; noteDesc: string };
type RNote = { id: string; noteTitle: string; noteDesc: string }[];

const dbInstance = collection(firebaseDB, "notes");

export default function NoteOperations(props: {
  getSingleNote: (id: string) => void;
}) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [notesArray, setNotesArray] = useState<RNote>([]);

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
      getNotes();
    });
  };

  const getNotes = () => {
    getDocs(dbInstance).then((data: QuerySnapshot<DocumentData>) => {
      const dataArray: RNote = data.docs.map((item) => {
        const itemData = item.data();
        const itemDataAny: any = itemData;
        const noteTitle: string = itemDataAny.noteTitle;
        const noteDesc: string = itemDataAny.noteDesc;
        // const noteData = {
        //   noteTitle: noteTitle,
        //   noteDesc: noteDesc
        // }

        // console.log(itemData, noteTitle, noteDesc, item.id);

        return { noteTitle: noteTitle, noteDesc: noteDesc, id: item.id };
      });

      setNotesArray(dataArray);
    });
  };

  useEffect(() => {
    getNotes();
  }, []);

  const styles = {
    button: "w-full h-8 cursor-pointer bg-blue-400 text-white border-[]",
  };

  return (
    <div className="flex flex-col w-full">
      <input
        className="w-full h-8 border mx-0 my-[5px] rounded-[10px] text-center border-solid border-gray-300"
        placeholder="enter a title.."
        onChange={(e) => setNoteTitle(e.target.value)}
        value={noteTitle}
      />
      <div className="w-full">
        <ReactQuill theme="snow" onChange={addDesc} value={noteDesc} />
      </div>
      <button onClick={saveNote} className={`${styles.button}`}>
        Save Note
      </button>

      <div className="w-full mt-1">
        {notesArray.map((note) => {
          return (
            <div
              key={note.id}
              className="w-full border border-indigo-400 text-center cursor-pointer mt-2 rounded-[10px] border-solid"
              onClick={() => props.getSingleNote(note.id)}
            >
              <h3>{note.noteTitle}</h3>
              {/* <p>{note.noteDesc}</p> */}
              {/* <p dangerouslySetInnerHTML={{ __html: note.noteDesc }}></p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// function NotesList(props: { getSingleNote: (id: string) => void }) {
//   const [notesArray, setNotesArray] = useState<RNote>([]);

//   const getNotes = () => {
//     getDocs(dbInstance).then((data: QuerySnapshot<DocumentData>) => {
//       const dataArray: RNote = data.docs.map((item) => {
//         const itemData = item.data();
//         const itemDataAny: any = itemData;
//         const noteTitle: string = itemDataAny.noteTitle;
//         const noteDesc: string = itemDataAny.noteDesc;
//         // const noteData = {
//         //   noteTitle: noteTitle,
//         //   noteDesc: noteDesc
//         // }

//         // console.log(itemData, noteTitle, noteDesc, item.id);

//         return { noteTitle: noteTitle, noteDesc: noteDesc, id: item.id };
//       });

//       setNotesArray(dataArray);
//     });
//   };

//   useEffect(() => {
//     getNotes();
//   }, []);

//   return (
//     <div className="">
//       {notesArray.map((note) => {
//         return (
//           <div
//             key={note.id}
//             className="w-full border border-red-600 text-center cursor-pointer mt-2 rounded-[10px] border-solid"
//             onClick={() => props.getSingleNote(note.id)}
//           >
//             <h4>{note.noteTitle}</h4>
//             {/* <p>{note.noteDesc}</p> */}
//             {/* <p dangerouslySetInnerHTML={{ __html: note.noteDesc }}></p> */}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

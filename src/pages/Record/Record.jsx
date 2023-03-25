import React, { useRef, useState } from 'react';
import { Navbar, DataTable } from 'components';

export default function Home() {
  const addBtnRef = useRef();
  const editBtnRef = useRef();
  const viewBtnRef = useRef();
  const [mode, setMode] = useState({ view: true, edit: false, add: false });

  const switchMode = (event) => {
    switch (event.target) {
      case viewBtnRef.current:
        setMode({ view: true, edit: false, add: false });
        break;
      case editBtnRef.current:
        setMode({ view: false, edit: true, add: false });
        break;
      case addBtnRef.current:
        setMode({ view: false, edit: false, add: true });
        break;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="flex-end gap-1 mt-1 pos-sticky top-0">
          <button
            ref={viewBtnRef}
            className={`btn ${mode.view ? 'btn-active' : ''}`}
            onClick={switchMode}
          >
            View
          </button>
          <button
            ref={addBtnRef}
            className={`btn ${mode.add ? 'btn-active' : ''}`}
            onClick={switchMode}
          >
            Add
          </button>
          <button
            ref={editBtnRef}
            className={`btn ${mode.edit ? 'btn-active' : ''}`}
            onClick={switchMode}
          >
            Edit
          </button>
        </div>
        <DataTable mode={mode} />
      </div>
    </>
  );
}

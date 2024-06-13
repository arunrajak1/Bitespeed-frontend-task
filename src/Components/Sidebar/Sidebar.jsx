import React from "react";

const Sidebar = ({ editValue, setEditValue, handleEdit, selectedNode }) => {
  const handleChange = (event) => {
    setEditValue(event.target.value);
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-1/5 md:w-1/5 sm:w-1/3   bg-white h-full border-l-2 border-gray-400  text-xs">
      {
        //Settings Panel
        selectedNode ? (
          <>
            <div className="text-center mb-4">
              <h1 className="text-base overflow-hidden whitespace-nowrap sm:whitespace-normal">Message</h1>
            </div>
            <hr className="border-gray-300 w-full" />
            <div className="mb-5 p-4">
              <label className="block mb-1 text-base">Text</label>
              <textarea
                className="w-full h-20 px-3 py-2 border text-left "
                placeholder="Text Message"
                value={editValue}
                onChange={handleChange}
              />
              <button
                className="rounded-lg bg-green-400 py-1 px-4 mt-2 text-gray-800 font-semibold"
                onClick={handleEdit}
                disabled={!selectedNode}
              >
                UPDATE
              </button>
            </div>
            <hr className="border-gray-300 my-4" />
          </>
        ) : (
          
          //Node panel
          <>
            <div className="p-5">
              <div
                className="mb-2  flex-col h-20 p-1 border border-blue-800 rounded flex justify-center items-center cursor-grab"
                onDragStart={(event) => onDragStart(event, "custom")}
                draggable
              >
                <img src="/assets/messenger.png" alt="message" />
                <h1 className="mt-2 font-semibold">Message</h1>
              </div>

              {/* <div className="mb-2 h-5 p-1 border border-gray-800 rounded flex justify-center items-center cursor-grab"
            onDragStart={(event) => onDragStart(event, 'custom')} draggable>
         Default Node
       </div>
       <div className="mb-2 h-5 p-1 border border-pink-600 rounded flex justify-center items-center cursor-grab"
            onDragStart={(event) => onDragStart(event, 'custom')} draggable>
         Output Node
       </div> */}
            </div>
            <hr className="border-gray-300 my-4" />
          </>
        )
      }
    </aside>
  );
};

export default Sidebar;

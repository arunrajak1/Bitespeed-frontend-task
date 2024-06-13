import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data,id }) {
  
  const handleClick = (event) => {
    event.stopPropagation();
    data.onClick(event, { id, data });
  };

  return (
    <div className=" shadow-md rounded-md bg-white border-2 border-stone-400" onClick={handleClick}>
      <div className="flex flex-col ">
        <div className="flex justify-between items-center align-middle bg-green-200 p-1 pl-2">
        <img src={data.image} alt="Node" className='object-fill	' height={10} width={12}/>
        <div className="flex text-xs font-base ml-2 mr-2 ">{data.name}</div>
        <div className='rounded-full w-4 h-4 ml-10 flex justify-center items-center  bg-gray-50'>
        <img src={data.image2} alt="Node" className='object-fill	' height={10} width={12} />

        </div>
        </div>
        <div className="text-gray-500 text-xs p-1 pl-2">{data.message}</div>

      </div>

      <Handle type="target" position={Position.Right}  />
      <Handle type="source" position={Position.Left}  />
    </div>
  );
}

export default memo(CustomNode);

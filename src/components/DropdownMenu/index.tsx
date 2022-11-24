import { useState } from "react";

const DropdownMenu = () => {
  const [isDown, setIsDown] = useState(false);

  return (
    <aside className={`absolute ${isDown ? 'top-0' : 'top-[-80vh]'} left-0 duration-[1s]`}>
      <div
        className={`z-[2] h-[80vh] w-[25vw] rounded-[0_0_50px_0] bg-headerText duration-[1s] ${
          isDown && 'shadow-[0_0_200px_50px_#000]'
        }`}
      >
        <ul className="flex h-full w-full flex-col items-center justify-center gap-10 text-3xl text-white">
          <li className="button">Rename board</li>
          <li className="button">Add table</li>
          <li className="button">Add issue</li>
          <li className="button">Delete board</li>
        </ul>
      </div>
      <div
        className="button z-1 ml-6 h-[10px] w-[10px] border-[30px] border-t-[70px] border-headerText border-b-transparent"
        onClick={() => setIsDown(!isDown)}
      ></div>
    </aside>
  );
};

export default DropdownMenu;

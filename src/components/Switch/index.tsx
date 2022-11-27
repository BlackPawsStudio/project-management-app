import { useState } from 'react';
import { Switch } from '@headlessui/react';

const LangSwitch = () => {
  const [ruEnabled, setRuEnabled] = useState(false);
  const innerText = ruEnabled ? 'Ru' : 'En';

  const classNames = (...classes: string[]) => {
    return classes.join(' ');
  }

  const outerStyle = `
    group w-[90px] h-[36px] px-[2px] rounded-lg flex justify-center items-center
    cursor-pointer
  `;
  const innerStyle = `
    w-[32px] h-[28px] rounded-lg text-[20px] leading-6 font-bold
    bg-white text-headerText group-hover:bg-headerText group-hover:text-background
    pointer-events-none transform transition duration-200
  `;
  const borderStyle = 'border-solid border-[3px] border-headerText';
  const uiStyle = 'ui-checked:translate-x-3/4 ui-not-checked:-translate-x-3/4';

  return (
    <Switch
      checked={ruEnabled}
      onChange={setRuEnabled}
      className={classNames(outerStyle, borderStyle)}
    >
      <span className={classNames(innerStyle, borderStyle, uiStyle)}>{innerText}</span>
    </Switch>
  );
}

export default LangSwitch;

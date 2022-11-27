import { useState } from 'react';
import { Switch } from '@headlessui/react';

const LangSwitch = () => {
  const [ruEnabled, setRuEnabled] = useState(false);
  const innerText = ruEnabled ? 'Ru' : 'En';

  const classNames = (...classes: string[]) => {
    return classes.join(' ');
  }

  const outerStyle = 'w-[90px] h-[36px] px-[2px] rounded-lg flex justify-center items-center cursor-pointer';
  const innerStyle = `
    w-[32px] h-[28px] rounded-lg text-[20px] leading-6 font-bold
    pointer-events-none transform transition duration-200
  `;
  const borderStyle = 'border-solid border-[3px] border-headerText';
  const uiStyle = `
    ui-not-checked:bg-white ui-not-checked:text-headerText
    ui-checked:bg-headerText ui-checked:text-background
    ui-checked:translate-x-3/4 ui-not-checked:-translate-x-3/4
  `;

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

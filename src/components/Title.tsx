import React from 'react';

type TitlePropsType = {
  text: string;
};

function Title({ text }: TitlePropsType) {
  return (
    <div>
      <h1 className="text-center text-3xl mb-6 sm:mb-10">{text}</h1>
    </div>
  );
}

export default Title;

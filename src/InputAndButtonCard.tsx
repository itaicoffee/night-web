import * as React from 'react';
import { InputField } from "./InputField";
import { Button } from "./Button";

export function InputAndButtonCard(props: {
  title: string;
  placeholder: string;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = React.useState(props.placeholder);
  return (
    <div>
      <div className="">
        <div className="py-2 px-2">
          <InputField title={props.title} placeholder={props.placeholder} onChange={setValue} />
        </div>
        <div className="px-2 py-2">
          <Button title="Login" onClick={() => { props.onSubmit(value); }} />
        </div>
      </div>
    </div>
  );
}

import * as React from 'react';
import { InputField } from "./InputField";
import { Button } from "./Button";

export function InputAndButtonCard(props: {
  title: string;
  placeholder: string;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = React.useState("");
  return (
    <div>
      <div className="flex items-center justify-between">
        <InputField title={props.title} placeholder={props.placeholder} onChange={setValue} />
        <div className="px-4 py-8">
          <Button title="Login" onClick={() => { props.onSubmit(value); }} />
        </div>
      </div>
    </div>
  );
}

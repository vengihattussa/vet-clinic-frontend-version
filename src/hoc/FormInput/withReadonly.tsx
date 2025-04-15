import {FormInputProps} from "@src/common/Form/Input";
import {ReactNode} from "react";
import {FieldValues} from "react-hook-form";

export const withReadonlyInput = <T extends FieldValues>(
  WrappedFormComponent: (props: FormInputProps<T>) => ReactNode,
) => {
  const withReadonly = (props: FormInputProps<T>) => {
    return <WrappedFormComponent {...props} isReadOnly pointerEvents={"none"} />;
  };

  return withReadonly;
};

import {FormSelectProps} from "@src/common/Form/Select";
import {ReactNode} from "react";
import {FieldValues} from "react-hook-form";

export const withReadonlySelect = <T extends FieldValues>(
  WrappedFormComponent: (props: FormSelectProps<T>) => ReactNode,
) => {
  const withReadonly = (props: FormSelectProps<T>) => {
    return <WrappedFormComponent {...props} isReadonly />;
  };

  return withReadonly;
};

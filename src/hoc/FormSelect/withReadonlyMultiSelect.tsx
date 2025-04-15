import {FormMultiSelectProps} from "@src/common/Form/Select/MultiSelect";
import {ReactNode} from "react";
import {FieldValues} from "react-hook-form";

export const withReadonlyMultiSelect = <T extends FieldValues>(
  WrappedFormComponent: (props: FormMultiSelectProps<T>) => ReactNode,
) => {
  const withReadonly = (props: FormMultiSelectProps<T>) => {
    return <WrappedFormComponent {...props} isReadonly />;
  };

  return withReadonly;
};

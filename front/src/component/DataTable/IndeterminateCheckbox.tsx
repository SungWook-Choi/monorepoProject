import type {InputHTMLAttributes} from 'react';
import {useEffect, useRef} from 'react';

type IndeterminateCheckboxProps = {
  indeterminate?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const IndeterminateCheckbox = ({indeterminate, ...props}: IndeterminateCheckboxProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = Boolean(indeterminate) && !props.checked;
    }
  }, [indeterminate, props.checked]);

  return <input type="checkbox" ref={checkboxRef} {...props} />;
};

export {IndeterminateCheckbox};

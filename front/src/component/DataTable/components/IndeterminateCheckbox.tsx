import type {InputHTMLAttributes} from 'react';
import {useEffect, useRef} from 'react';

type IndeterminateCheckboxProps = {
  indeterminate?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * 일부 선택 상태일 때도 시각적으로 표시해 주는 체크박스 컴포넌트.
 */
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

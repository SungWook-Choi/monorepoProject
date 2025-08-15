import React from 'react';
import {useReactToPrint} from 'react-to-print';

interface printProps {
    buttonLabel?: string;
    printRef: React.RefObject<HTMLDivElement | null>
}

const PrintBox = (props:printProps) => {
    const runPrint = useReactToPrint({
        contentRef:props.printRef,
        documentTitle: 'Print',
        onAfterPrint: () => console.log('Print'),
    })
    return (
        <>
            <button onClick={runPrint}>{props.buttonLabel || '인쇄하기'}</button>
        </>
    )
}
export default PrintBox;

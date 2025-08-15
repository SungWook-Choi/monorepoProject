import PrintBox from '../component/PrintBox.tsx';
import {useRef} from 'react';

const AboutPage = () => {
    const printRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <div ref={printRef}>
                <table>
                    <tbody>
                    <tr>
                        <td>Column1</td>
                        <td>Column2</td>
                    </tr>
                    <tr>
                        <td>value1</td>
                        <td>value2</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <PrintBox
                printRef={printRef}
                buttonLabel='인쇄할거야?'
            />
        </>
    )
}

export default AboutPage;

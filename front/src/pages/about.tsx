import PrintBox from '../component/PrintBox.tsx';
import { useRef } from 'react';

const AboutPage = () => {
    const printRef = useRef<HTMLDivElement>(null);

    return (
        <section className="page-section">
            <div className="page-card" ref={printRef}>
                <div className="page-card__header">
                    <div>
                        <p className="page-card__eyebrow">샘플 문서</p>
                        <h2>회사 정보</h2>
                    </div>
                    <span className="status-chip">PDF 내보내기</span>
                </div>
                <table className="about-table">
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
            <PrintBox printRef={printRef} buttonLabel="인쇄할거야?" />
        </section>
    );
};

export default AboutPage;

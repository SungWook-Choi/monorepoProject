import FileUploadBox from '../../component/fileUploadBox/FileUploadBox.tsx';

const ContractPage = () => {
    return (
        <section className="page-section">
            <div className="page-card">
                <div className="page-card__header">
                    <div>
                        <p className="page-card__eyebrow">문서 업로드</p>
                        <h2>계약서 관리</h2>
                    </div>
                    <span className="status-chip">보안 저장</span>
                </div>
                <FileUploadBox />
            </div>
        </section>
    );
};
export default ContractPage;

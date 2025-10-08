import FileUploadBox from '../component/fileUploadBox/FileUploadBox.tsx';

const ContractPage = () => {
    return (
        <section style={{ display: 'flex', flexDirection: 'column' }}>
            <div>Contract</div>
            <div>
                <FileUploadBox />
            </div>
        </section>
    );
};
export default ContractPage;

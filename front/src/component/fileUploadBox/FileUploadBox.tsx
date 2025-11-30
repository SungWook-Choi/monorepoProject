import { useDropzone } from 'react-dropzone';
import './FileUploadBox.css';
import { useFileStore } from '../../stores/FileStore.ts';
import { useEffect } from 'react';

const convertFileSizeToMB = (size: number) => (size / 1024 / 1024).toFixed(2);

const FileUploadBox = () => {
    const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
    });
    const setFiles = useFileStore((state) => state.setFiles);
    const files = useFileStore((state) => state.files);

    useEffect(() => {
        if (!acceptedFiles.length) {
            return;
        }

        const tmp = acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
        );
        setFiles({ files: tmp });
    }, [acceptedFiles, setFiles]);

    return (
        <section className="file_section_container">
            <div className="file_upload_container">
                <div {...getRootProps({ className: 'file_upload' })}>
                    <div className="file_upload_button_container">
                        <button className="file_upload_button" onClick={open}>
                            Open File
                        </button>
                    </div>
                    <input {...getInputProps()} />
                    {files.length === 0 ? (
                        <p className="file_upload_info">Click or Drag & Drop File</p>
                    ) : (
                        <div className="file_table_container">
                            <table>
                                <colgroup>
                                    <col width="100rem" />
                                    <col width="*" />
                                    <col width="150px" />
                                </colgroup>
                                <tbody>
                                    {files.map((file, index) => (
                                        <>
                                            {index === 0 && (
                                                <>
                                                    <tr className="file_table_header">
                                                        <th>Index</th>
                                                        <th>File Name</th>
                                                        <th>File Size</th>
                                                    </tr>
                                                </>
                                            )}
                                            <tr key={file.path}>
                                                <td>{index + 1}</td>
                                                <td>{file.name}</td>
                                                <td>{`${convertFileSizeToMB(file.size)} MB`}</td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FileUploadBox;

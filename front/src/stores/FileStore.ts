import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { FileWithPath } from 'react-dropzone';

// type fileItem = {
//     path: string | undefined;
//     relativePath: string | undefined;
//     lastModified: number;
//     // lastModifiedDate: Date;
//     name: string;
//     size: number;
//     type: string;
//     webkitRelativePath: string;
// };

interface stateType {
    files: fileItem[];
}

interface fileItem extends FileWithPath {
    preview?: string;
}

const initialState: stateType = {
    files: [],
};

type setFiles = {
    <K extends keyof stateType>(key: K, value?: stateType[K]): void;
    (value: Partial<stateType>): void;
};

interface actionType {
    setFiles: setFiles;
}

export const useFileStore = create<stateType & actionType>()(
    immer((set) => ({
        ...initialState,
        setFiles: ((k: keyof stateType | Partial<stateType>, v?: stateType[keyof stateType]) =>
            set((state) => {
                if (typeof k === 'object' && k !== null) {
                    Object.assign(state, k as Partial<stateType>);
                    return;
                }
                const key = k as keyof stateType;
                state[key] = v as stateType[typeof key];
            })) as setFiles,
    })),
);

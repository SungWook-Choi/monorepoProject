import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { aboutAction, aboutType } from '../types';
import type { Draft } from 'immer';

const initializeAboutType = (): aboutType => {
    return {
        info: 'test',
        isUse: 1,
        count: 0,
        lastAlertDate: new Date(),
    };
};
const useAboutStore = create<aboutType & aboutAction>()(
    immer((set) => ({
        ...initializeAboutType(),

        // Action 정의
        setValue: ((
            keyOrPartial: keyof aboutType | Partial<aboutType>,
            valueOrUpdater?: unknown,
        ): void => {
            set((draft) => {
                const state = draft as Draft<aboutType>;
                // 3) partial object로 여러 필드 업데이트
                if (typeof keyOrPartial === 'object' && keyOrPartial !== null) {
                    Object.assign(state, keyOrPartial);
                    return;
                }

                // 1) / 2) 단일 키 업데이트
                const key = keyOrPartial as keyof aboutType;
                const prev = state[key];
                const nextValue =
                    typeof valueOrUpdater === 'function'
                        ? (valueOrUpdater as (p: typeof prev) => typeof prev)(prev)
                        : (valueOrUpdater as typeof prev);

                Object.assign(state, {[key]: nextValue} as Partial<aboutType>);
            });
        }) as aboutAction['setValue'],
    })),
);

export default useAboutStore;

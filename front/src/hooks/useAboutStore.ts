import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { aboutAction, aboutType } from '../types';

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
            set((state) => {
                // 3) partial object로 여러 필드 업데이트
                if (typeof keyOrPartial === 'object' && keyOrPartial !== null) {
                    Object.assign(state, keyOrPartial);
                    return;
                }

                // 1) / 2) 단일 키 업데이트
                const key = keyOrPartial;
                const prev = state[key];

                state[key] =
                    typeof valueOrUpdater === 'function'
                        ? (valueOrUpdater as (p: typeof prev) => typeof prev)(prev)
                        : (valueOrUpdater as typeof prev);
            });
        }) as aboutAction['setValue'],
    })),
);

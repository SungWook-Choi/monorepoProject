type flag = 1 | 0;
type Nullable<T> = T | null;

export type aboutType = {
    info: Nullable<string>;
    isUse: flag;
    lastAlertDate: Date;
    count: number;
};

type setValueType = {
    // 1)  단일 키에 값 저장
    <K extends keyof aboutType>(key: K, value: aboutType[K]): void;

    // 2) 단일 키에 업데이트 함수 지정
    <K extends keyof aboutType>(key: K, updater: (prev: aboutType[K]) => aboutType[K]): void;

    // 3) 여러 필드 한꺼번에 변경
    (partial: Partial<aboutType>): void;
};

export type aboutAction = {
    setValue: setValueType;
};

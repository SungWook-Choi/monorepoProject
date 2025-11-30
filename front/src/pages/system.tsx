import { useQuery } from '@tanstack/react-query';
import { fetchAxios } from '../common/api/apis.ts';
import type { UserInfo } from '../types';
import { useAuth } from '../hooks/useAuth.ts';

const SystemManagePage = () => {
    const { user } = useAuth();
    const { data, isLoading } = useQuery<UserInfo[]>({
        queryKey: ['loginInfo'],
        queryFn: () => fetchAxios<UserInfo[]>('/users/loginInfo'),
        refetchOnWindowFocus: false,
    });

    return (
        <section className="page-section">
            <div className="page-card">
                <div className="page-card__header">
                    <div>
                        <p className="page-card__eyebrow">시스템 관리</p>
                        <h2>세션 및 로그인 현황</h2>
                    </div>
                    <span className="status-chip">모니터링</span>
                </div>
                <p>현재 로그인한 계정과 로그인 테이블의 차단 상태를 한눈에 확인합니다.</p>
                <div className="button-row">
                    <span className="status-chip">
                        {user
                            ? `${user.name ?? '로그인 사용자'} · ${user.provider}`
                            : '로그인 필요'}
                    </span>
                    {user?.lastLoginAt && (
                        <span className="status-chip">
                            최근 로그인 {new Date(user.lastLoginAt).toLocaleString()}
                        </span>
                    )}
                </div>
                <table className="about-table">
                    <thead>
                        <tr>
                            <th>UserID</th>
                            <th>차단 여부</th>
                            <th>차단 횟수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={3}>로그인 테이블 조회 중...</td>
                            </tr>
                        )}
                        {!isLoading &&
                            data?.map((row) => (
                                <tr key={row.UserID}>
                                    <td>{row.UserID}</td>
                                    <td>{row.IsBlock ? '차단' : '사용 가능'}</td>
                                    <td>{row.BlockCnt}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default SystemManagePage;

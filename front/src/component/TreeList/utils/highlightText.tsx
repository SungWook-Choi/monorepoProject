import type {ReactNode} from 'react';

// 검색 키워드가 포함된 텍스트를 부분적으로 <mark> 처리
export const highlightText = (text: string, keyword: string): ReactNode => {
  if (!keyword.trim()) {
    return text;
  }
  const normalizedText = text.toLowerCase();
  const normalizedKeyword = keyword.toLowerCase().trim();
  const matchIndex = normalizedText.indexOf(normalizedKeyword);
  if (matchIndex === -1) {
    return text;
  }

  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + normalizedKeyword.length);
  const after = text.slice(matchIndex + normalizedKeyword.length);

  return (
    <>
      {before}
      <mark>{match}</mark>
      {after}
    </>
  );
};

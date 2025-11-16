import type {TreeNode} from '../component/TreeList';

// 데모 페이지에서만 사용하는 더미 트리 데이터
export const WORKSPACE_TREE_NODES: TreeNode[] = [
  {
    id: 'workspace',
    label: 'Digital Workspace',
    description: '회사 전체 OKR와 인사이트를 정리하는 루트 노드',
    children: [
      {
        id: 'workspace-research',
        label: 'Research Lab',
        description: '신규 가설 검증',
        children: [
          {id: 'workspace-research-ux', label: 'UX Interview'},
          {id: 'workspace-research-dataset', label: 'Data Set Gathering'},
        ],
      },
      {
        id: 'workspace-product',
        label: 'Product Group',
        description: '제품 전략과 로드맵',
        children: [
          {
            id: 'workspace-product-core',
            label: 'Core Platform',
            children: [
              {id: 'workspace-product-core-api', label: 'Public API'},
              {id: 'workspace-product-core-ux', label: 'Studio UX'},
            ],
          },
          {
            id: 'workspace-product-growth',
            label: 'Growth Squad',
            children: [
              {id: 'workspace-product-growth-funnel', label: 'Acquisition Funnel'},
              {id: 'workspace-product-growth-retention', label: 'Retention Dashboard'},
            ],
          },
        ],
      },
      {
        id: 'workspace-operations',
        label: 'Operations',
        children: [
          {id: 'workspace-operations-hiring', label: 'Hiring Plan'},
          {id: 'workspace-operations-onboarding', label: 'Onboarding Journey'},
        ],
      },
    ],
  },
];

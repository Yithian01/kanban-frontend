// src/entities/board/index.ts

export type { 
  BoardSummary, 
  BoardDetail,
  BoardListResponse,
  BoardDetailResponse,
  BoardCeateResponse
} from './model/types';

export { 
  fetchMyBoards, 
  fetchBoardDetail,
  createBoard
} from './api/boardApi';

export { BoardRow } from './ui/BoardRow';
import React, { useEffect } from 'react';
import { Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchBoardList, useBoardListQuery } from '../api/BoardApi';
import useBoardStore from '../store/BoardStore';
import { useAuth } from 'pages/AuthConText';
import './css/BoardCss.css';
import { Board } from 'board/entity/Board';

interface BoardItem {
  boardId: number;
  title: string;
  writer: string;
  createdData: string;
}

interface BoardListProps {
  searchResults?: Board[]; 
}

const BoardListPage: React.FC<BoardListProps> = ({ searchResults }) => {
  const { data: boards, isLoading, isError } = useBoardListQuery();
  const { checkAuthorization } = useAuth();
  const setBoards = useBoardStore((state) => state.setBoards);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBoardList();
      console.log(data);
      setBoards(data);
    };

    fetchData();
  }, [setBoards]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>리스트를 가져오는 도중 에러가 발생했습니다</Typography>;
  }

  const handleRowClick = (boardId: number) => {
    Navigate(`/read/${boardId}`);
  };

  const handleWriteClick = () => {
    const isAuthorized = checkAuthorization();

    if (isAuthorized) {
      Navigate('/register');
    } else {
      Navigate('/login');
    }
  };

  return (
    <Container maxWidth="md">
      <div>
        {searchResults && searchResults.map((result) => <div key={result.boardId}>{result.title}</div>)}
      </div>
      <Button variant="contained" onClick={handleWriteClick} color="primary" style={{ marginTop: '20px' }} className="board-write-button">
        글쓰기
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="board table">
          <TableHead className="board-table">
            <TableRow>
              <TableCell style={{ width: '50%' }}>제목</TableCell>
              <TableCell align='right'>작성자</TableCell>
              <TableCell align='right'>작성일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boards?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align='center'>등록된 게시물이 없습니다</TableCell>
              </TableRow>
            ) : (
              // 여기가 boardList를 뿌리는 곳
              boards?.map((board) => (
                <TableRow key={board.boardId} onClick={() => handleRowClick(board.boardId)} style={{ cursor: 'pointer' }} className="board-row">
                  <TableCell>{board.title}</TableCell>
                  <TableCell>{board.writer}</TableCell>
                  {/* 작성날짜만 나오게 표시 */}
                  <TableCell>{new Date(board.createdData).toISOString().slice(0, 10)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default BoardListPage;

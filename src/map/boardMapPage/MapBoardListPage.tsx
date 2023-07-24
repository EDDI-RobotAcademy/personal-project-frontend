import { Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { fetchBoardList, useBoardListQuery } from 'map/api/BoardMapApi'
import useBoardMapStore from 'map/store/BoardMapStore'
import { useAuth } from 'pages/AuthConText'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface MapBoardListPageProps {
  place_name: string; 
}
const MapBoardListPage: React.FC<MapBoardListPageProps> = ({ place_name }) => {
  const { data: boards, isLoading, isError } = useBoardListQuery(place_name);
  const { checkAuthorization } = useAuth()
  const setBoards = useBoardMapStore((state) => state.setBoards)
  const Navigate = useNavigate()
  

  useEffect(() => {
    const fetchData = async () => {
      if (place_name) {
        const data = await fetchBoardList(place_name);
        console.log('위치', place_name);
        setBoards(data);
      }
    };

    fetchData();
  }, [place_name, setBoards]);

  if (isLoading) {
    return<CircularProgress/>
  }

  if (isError) {
    return <Typography>에러 발생</Typography>
  }

  const handleRowClick = (boardId: number) => {
    const isAuthorized = checkAuthorization();
    if (isAuthorized) {
      // Navigate(`/read/${boardId}`);
    } else {
      // Navigate('/login');
    }
  };

  const handleWriteClick = () => {
    const isAuthorized = checkAuthorization();

    if (isAuthorized) {
      Navigate('/boardMapRegister');
    } else {
      Navigate('/login');
    }
  };

  // const handlePlaceNameChange = (event) => {
  //   setPlaceName(event.target.value);
  // };

  // // 마커 클릭 이벤트 핸들러 생성
  // const handleMarkerClick = (clickedPlaceName) => {
  //   setPlaceName(clickedPlaceName); // 마커를 클릭한 placeName을 업데이트
  // };

  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="board table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '50%'}}>제목</TableCell>
              <TableCell align='right'>작성자</TableCell>
              <TableCell align='right'>작성일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { boards?.length ===0 ? (
              <TableRow>
                <TableCell colSpan={3} align='center'>등록된 게시물이 없습니다</TableCell>
              </TableRow>
            ) : (
              boards?.map((board) => (
                <TableRow key={board?.boardId} onClick={() => handleRowClick(board?.boardId)} style={{ cursor: 'pointer' }}>
                  <TableCell>{ board.title }</TableCell>
                  <TableCell>{ board.writer }</TableCell>
                  <TableCell>{ new Date(board.createdData).toISOString().slice(0, 10) }</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleWriteClick}
          color="primary" style={{ marginTop: '20px' }}>
        글쓰기
      </Button>
    </Container>
  )
}

export default MapBoardListPage
import styled from '@emotion/styled';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import ChapterSelection from '../Molecules/MenuPage/ChapterSelection';
import LearningProgressButtons from '../Molecules/MenuPage/LearningProgressButtons';
import MainHeader from '../Molecules/MenuPage/Header';
import { useState } from 'react';

const MenuPage = () => {
  const [chapterNum, setChapterNum] = useState<number>(0);
  return (
    <>
      <MainHeader />
      <SContent>
        <CircularProgress value={70.3} size='196px' thickness='1.5px' color='#38A169'>
          <CircularProgressLabel>
            <SCircularProgressText>70.3%</SCircularProgressText>
            <SCircularProgressText>spent</SCircularProgressText>
          </CircularProgressLabel>
        </CircularProgress>
        <LearningProgressButtons
          chapterNum={chapterNum}
          setChapterNum={setChapterNum} />
        <ChapterSelection
          chapterNum={chapterNum}
          setChapterNum={setChapterNum} />
      </SContent >
    </>
  )
};

const SContent = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const SCircularProgressText = styled.div`
  color: #38A169;
  font-size: 1.25rem;
  height: auto;
`;

export default MenuPage

import MainHeader from '../Molecules/FlashcardPage/Header';
import styled from '@emotion/styled';
import { Card, CardBody, Heading, Text } from '@chakra-ui/react'
import SecondaryButton from '../ Atoms/Buttons/SecondaryButton';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GetChapterNum, getChapterNum } from '../ Hooks/GetChapterNum';
import { Flashcard, getFlashcards } from '../ Hooks/GetFlashcard';

const FlashcardPage = () => {
  const [currentFlashcardNum, setCurrentFlashcardListNum] = useState<number>(1);
  const [totalFlashcardsNum, setTotalFlashcardsNum] = useState<number>(1);
  const [isChapterNumFetched, setIsChapterNumFetched] = useState(false);
  const [flashcardsData, setFlashcardsData] = useState<Flashcard[]>([]);
  const itemsPerPage = 15;

  const location = useLocation();
  const state = location.state as { chapterNum: number, userName: string };

  useEffect(() => {
    const fetchChapterNumData = async () => {
      try {
        const chapterNumData: GetChapterNum = await getChapterNum(state.chapterNum);
        setTotalFlashcardsNum(chapterNumData.maxNum);
        setIsChapterNumFetched(true);
      } catch (error) {
        console.error('chapterNum取得中にエラーが発生しました。', error);
      };
    };
    fetchChapterNumData();
  }, [state.chapterNum]);

  useEffect(() => {
    if (isChapterNumFetched) {
      const fetchFlashcardData = async () => {
        try {
          const fetchedFlashcards: Flashcard[] =
            await getFlashcards(currentFlashcardNum, itemsPerPage, state.chapterNum);
          setFlashcardsData(fetchedFlashcards.flat());
        } catch (error) {
          console.error('Error fetching flashcard data:', error);
        }
      };
      fetchFlashcardData();
    }
  }, [state.chapterNum, currentFlashcardNum, isChapterNumFetched]);

  const currentPage = Math.ceil(currentFlashcardNum / itemsPerPage);
  const totalPage = Math.ceil(totalFlashcardsNum / itemsPerPage);

  const handleClickNextButton = () => {
    setCurrentFlashcardListNum(currentFlashcardNum =>
      Math.min(currentFlashcardNum + itemsPerPage, totalFlashcardsNum));
    window.scrollTo(0, 0);
  };

  const handleClickBackButton = () => {
    setCurrentFlashcardListNum(currentFlashcardNum =>
      Math.max(currentFlashcardNum - itemsPerPage, 1));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <MainHeader />
      <SContent>
        {flashcardsData.map((flashcard, index) => (
          <SCard key={index}>
            <CardBody>
              <SHeading>{flashcard.word}</SHeading>
              <SText>{flashcard.description}</SText>
            </CardBody>
          </SCard>
        ))}
        <SButtonContainer>
          <SecondaryButton
            width='128px'
            height='43px'
            onClick={handleClickBackButton}
            isDisabled={Boolean(currentPage === 1)}>
            Back
          </SecondaryButton>
          <SPageNumber>{currentPage}/{totalPage}</SPageNumber>
          <SecondaryButton
            width='128px'
            height='43px'
            onClick={handleClickNextButton}
            isDisabled={Boolean(currentPage === totalPage)}>
            Next
          </SecondaryButton>
        </SButtonContainer>
      </SContent>
    </>
  );
};

const SContent = styled.div`
  background-color: #38A169;
  padding: 1rem;
`;

const SCard = styled(Card)`
  margin-bottom: 1rem;
`;

const SHeading = styled(Heading)`
  font-size: 24px;
  font-weight: 600;
`;

const SText = styled(Text)`
  color: #666666;
`;

const SButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5;
  margin-bottom: 1.5;
`;

const SPageNumber = styled.div`
  color: white;
  font-weight: bold;
`;

export default FlashcardPage

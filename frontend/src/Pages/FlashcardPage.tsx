import MainHeader from "../Molecules/FlashcardPage/Header";
import styled from "@emotion/styled";
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetChapterNum, getChapterNum } from "../ Hooks/GetChapterNum";
import { Flashcard, getFlashcards } from "../ Hooks/GetFlashcard";
import { fetchUserProfile } from "../ Hooks/PostUserProfile";
import { Footer } from "../Molecules/FlashcardPage/Footer";

const FlashcardPage = () => {
  const location = useLocation();
  const state = location.state as {
    chapterNum: number;
    currentFlashcardNum: number;
  };

  const [currentFlashcardNum, setCurrentFlashcardNum] = useState<number>(
    state.currentFlashcardNum
  );
  const [totalFlashcardsNum, setTotalFlashcardsNum] = useState<number>(1);
  const [isChapterNumFetched, setIsChapterNumFetched] = useState(false);
  const [flashcardsData, setFlashcardsData] = useState<Flashcard[]>([]);
  const itemsPerPage = 15;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChapterNumData = async () => {
      try {
        const chapterNumData: GetChapterNum = await getChapterNum(
          state.chapterNum
        );
        setTotalFlashcardsNum(chapterNumData.maxNum);
        setIsChapterNumFetched(true);
      } catch (error) {
        console.error("chapterNum取得中にエラーが発生しました。", error);
      }
    };
    fetchChapterNumData();
  }, [state.chapterNum]);

  useEffect(() => {
    if (isChapterNumFetched) {
      const fetchFlashcardData = async () => {
        try {
          const fetchedFlashcards: Flashcard[] = await getFlashcards(
            currentFlashcardNum,
            itemsPerPage,
            state.chapterNum
          );
          setFlashcardsData(fetchedFlashcards.flat());
        } catch (error) {
          console.error("Error fetching flashcard data:", error);
        }
      };
      fetchFlashcardData();
    }
  }, [state.chapterNum, currentFlashcardNum, isChapterNumFetched]);

  useEffect(() => {
    const postUserProfileData = async () => {
      if (flashcardsData.length > 0) {
        const lastFlashcard = flashcardsData[flashcardsData.length - 1];
        try {
          if (token) {
            await fetchUserProfile(lastFlashcard, token);
          }
        } catch (error) {
          console.error("Error posting user profile data:", error);
        }
      }
    };
    postUserProfileData();
  }, [flashcardsData, token]);

  const [currentPage, setCurrentPage] = useState(
    Math.ceil(state.currentFlashcardNum / itemsPerPage)
  );
  const totalPage = Math.ceil(totalFlashcardsNum / itemsPerPage);

  useEffect(() => {
    const newCurrentPage = Math.ceil(currentFlashcardNum / itemsPerPage);
    setCurrentPage(newCurrentPage);
  }, [currentFlashcardNum, itemsPerPage]);

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
      </SContent>
      <Footer
        setCurrentFlashcardNum={setCurrentFlashcardNum}
        currentFlashcardNum={currentFlashcardNum}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
        itemsPerPage={itemsPerPage}
        totalFlashcardsNum={totalFlashcardsNum}
      />
    </>
  );
};

const SContent = styled.div`
  background-color: #38a169;
  padding: 1rem;
  padding-bottom: 75px;
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

export default FlashcardPage;

import styled from "@emotion/styled";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import ChapterSelection from "../Molecules/MenuPage/ChapterSelection";
import LearningProgressButtons from "../Molecules/MenuPage/LearningProgressButtons";
import MainHeader from "../Molecules/MenuPage/Header";
import { useEffect, useState } from "react";
import {
  ChapterDataType,
  GetUserProfileData,
  ResponseUserProfileDataType,
} from "../ Hooks/GetUserProfileData";
import { useNavigate } from "react-router-dom";

// TODO: 以下の変数をnavigateで渡すようにする。
// const [currentFlashcardNum, setCurrentFlashcardNum] = useState<number>(1);

const MenuPage = () => {
  const [chapterNum, setChapterNum] = useState<number>(0);
  const [userProfileData, setUserProfileData] =
    useState<ResponseUserProfileDataType | null>(null);
  const [chapterData, setChapterData] = useState<ChapterDataType | null>(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        if (token !== null) {
          const response = await GetUserProfileData(token);
          setUserProfileData(response.userProfileData);
          setChapterData(response.chapterData);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching userProfile data:", error.message);
        }
      }
    };
    if (token) {
      fetchUserProfileData();
    } else {
      navigate("/");
    }
    // tokenを依存関係に含めてしまうと、Flashcard画面からメニュー画面に戻った時にこの関数が更新されない。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainHeader />
      <SContent>
        <CircularProgress
          value={
            ((userProfileData?.currentId ?? 0) /
              (Number(process.env.REACT_TOTAL_FLASHCARDS_NUM) || 903)) *
            100
          }
          size="196px"
          thickness="1.5px"
          color="#38A169"
        >
          <CircularProgressLabel>
            <SCircularProgressText>
              {(
                ((userProfileData?.currentId ?? 0) /
                  (Number(process.env.REACT_TOTAL_FLASHCARDS_NUM) || 903)) *
                100
              ).toFixed(2)}
              %
            </SCircularProgressText>
            <SCircularProgressText>spent</SCircularProgressText>
          </CircularProgressLabel>
        </CircularProgress>
        <LearningProgressButtons
          chapterNum={chapterNum}
          setChapterNum={setChapterNum}
          chapterData={chapterData}
          currentFlashcardNum={userProfileData?.currentChapterWordOrder}
        />
        <ChapterSelection
          chapterNum={chapterNum}
          setChapterNum={setChapterNum}
        />
      </SContent>
    </>
  );
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
  color: #38a169;
  font-size: 1.25rem;
  height: auto;
`;

export default MenuPage;

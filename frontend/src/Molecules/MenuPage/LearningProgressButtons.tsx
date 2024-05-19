import styled from "@emotion/styled";
import PrimaryButton from "../../ Atoms/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { ChapterDataType } from "../../ Hooks/GetUserProfileData";

export type LearningProgressButtonsPropsType = {
  chapterNum: number;
  setChapterNum: React.Dispatch<React.SetStateAction<number>>;
  chapterData: ChapterDataType | null;
  currentFlashcardNum: number | undefined;
};

// TODO: 以下の変数をnavigateで渡すようにする。
// const [currentFlashcardNum, setCurrentFlashcardNum] = useState<number>(1);

const LearningProgressButtons: React.FC<LearningProgressButtonsPropsType> = (
  props
) => {
  const { chapterNum, setChapterNum, chapterData, currentFlashcardNum } = props;
  const navigate = useNavigate();

  const handleClickPreviousButton = (num: number) => {
    if (currentFlashcardNum === undefined) {
      console.error("currentFlashcardNum is undefined");
      return;
    }
    setChapterNum(num);
    navigate("/flashcard", {
      state: { chapterNum: num, currentFlashcardNum: 1 },
    });
  };

  const handleClickCurrentButton = (num: number) => {
    if (currentFlashcardNum === undefined) {
      console.error("currentFlashcardNum is undefined");
      return;
    }
    setChapterNum(num);
    navigate("/flashcard", {
      //NOTE:currentFlashcardNum+1としたのは現在学習済みの単語の次の物を取得するため。
      state: { chapterNum: num, currentFlashcardNum: currentFlashcardNum },
    });
  };

  return (
    <LearningProgressButtonContainer>
      <LearningProgressButton>
        <SLearningProgressHeaderText>
          Previous Chapter
        </SLearningProgressHeaderText>
        <PrimaryButton
          colorScheme="green"
          color="white"
          onClick={() => {
            handleClickPreviousButton(chapterData?.previousChapterId ?? 0);
          }}
          height="60.8px"
        >
          <LearningProgressButtonText>
            {chapterData?.previousChapterName}
          </LearningProgressButtonText>
        </PrimaryButton>
      </LearningProgressButton>
      <LearningProgressButton>
        <SLearningProgressHeaderText>
          Current Chapter
        </SLearningProgressHeaderText>
        <PrimaryButton
          colorScheme="green"
          color="white"
          onClick={() => {
            handleClickCurrentButton(chapterData?.currentChapterId ?? 0);
          }}
          height="60.8px"
        >
          <LearningProgressButtonText>
            {chapterData?.currentChapterName}
          </LearningProgressButtonText>
        </PrimaryButton>
      </LearningProgressButton>
    </LearningProgressButtonContainer>
  );
};

const LearningProgressButtonContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
`;

const LearningProgressButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 170px;
`;

const LearningProgressButtonText = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
`;

const SLearningProgressHeaderText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  color: #666666;
  margin-bottom: 0.5rem;
`;

export default LearningProgressButtons;

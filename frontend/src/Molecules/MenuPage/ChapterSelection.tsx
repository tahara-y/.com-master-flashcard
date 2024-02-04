import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export type ChapterSelectionPropsType = {
  chapterNum: number;
  setChapterNum: React.Dispatch<React.SetStateAction<number>>;
};

const ChapterSelection: React.FC<ChapterSelectionPropsType> = (props) => {
  const { chapterNum, setChapterNum } = props;
  const navigate = useNavigate();
  const handleClickPrimaryButton = async (num: number) => {
    setChapterNum(num);
    navigate("/flashcard", {
      state: { chapterNum: num, currentFlashcardNum: 1 },
    });
  };

  return (
    <>
      <SChapterHeadText>CHAPTER</SChapterHeadText>
      <ChapterContainer>
        <SCapterSelectionContainer>
          <SCapterSelectionComponent
            variant="ghost"
            onClick={() => handleClickPrimaryButton(1)}
          >
            <SCapterSelectionText>
              {process.env.REACT_APP_CHAPTER_OF_1}
            </SCapterSelectionText>
            <SCapterSelectionIcon>⁨〉</SCapterSelectionIcon>
          </SCapterSelectionComponent>
          <SDivider />
          <SCapterSelectionComponent
            variant="ghost"
            onClick={() => handleClickPrimaryButton(2)}
          >
            <SCapterSelectionText>
              {process.env.REACT_APP_CHAPTER_OF_2}
            </SCapterSelectionText>
            <SCapterSelectionIcon>⁨〉</SCapterSelectionIcon>
          </SCapterSelectionComponent>
          <SDivider />
          <SCapterSelectionComponent
            variant="ghost"
            onClick={() => handleClickPrimaryButton(3)}
          >
            <SCapterSelectionText>
              {process.env.REACT_APP_CHAPTER_OF_3}
            </SCapterSelectionText>
            <SCapterSelectionIcon>⁨〉</SCapterSelectionIcon>
          </SCapterSelectionComponent>
          <SDivider />
          <SCapterSelectionComponent
            variant="ghost"
            onClick={() => handleClickPrimaryButton(4)}
          >
            <SCapterSelectionText>
              {process.env.REACT_APP_CHAPTER_OF_4}
            </SCapterSelectionText>
            <SCapterSelectionIcon>⁨〉</SCapterSelectionIcon>
          </SCapterSelectionComponent>
          <SDivider />
          <SCapterSelectionComponent
            variant="ghost"
            onClick={() => handleClickPrimaryButton(5)}
          >
            <SCapterSelectionText>
              {process.env.REACT_APP_CHAPTER_OF_5}
            </SCapterSelectionText>
            <SCapterSelectionIcon>⁨〉</SCapterSelectionIcon>
          </SCapterSelectionComponent>
          <SDivider />
        </SCapterSelectionContainer>
      </ChapterContainer>
    </>
  );
};

const ChapterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
`;

const SChapterHeadText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  width: 100%;
  text-align: left;
`;

const SCapterSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  font-size: 0.75rem;
  flex: 1;
`;

const SCapterSelectionComponent = styled(Button)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  align-items: center;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
`;

const SCapterSelectionText = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  color: #000000;
`;

const SCapterSelectionIcon = styled.div`
  opacity: 60%;
  font-size: 0.875rem;
  color: #666666;
`;

const SDivider = styled.div`
  border: 1px solid #e8e8e8;
  width: 100%;
`;

export default ChapterSelection;

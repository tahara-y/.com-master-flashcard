import styled from '@emotion/styled';
import PrimaryButton from '../../ Atoms/Buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export type LearningProgressButtonsPropsType = {
  chapterNum: number;
  setChapterNum: React.Dispatch<React.SetStateAction<number>>;
}

const LearningProgressButtons: React.FC<LearningProgressButtonsPropsType> = (props) => {
  const { chapterNum, setChapterNum } = props;
  const navigate = useNavigate();
  const handleClickPrimaryButton = (num: number) => {
    setChapterNum(num);
    navigate('/flashcard', { state: { chapterNum: num } });
  };
  return (
    <LearningProgressButtonContainer>
      <LearningProgressButton>
        <SLearningProgressHeaderText>Previous Chapter</SLearningProgressHeaderText>
        <PrimaryButton
          colorScheme='green'
          color='white'
          onClick={() => {
            handleClickPrimaryButton(2);
          }}>
          <LearningProgressButtonText>
            2.インターネット接続の設定とトラブル処理
          </LearningProgressButtonText>
        </PrimaryButton>
      </LearningProgressButton>
      <LearningProgressButton>
        <SLearningProgressHeaderText>Current Chapter</SLearningProgressHeaderText>
        <PrimaryButton
          colorScheme='green'
          color='white'
          onClick={() => {
            handleClickPrimaryButton(3);
          }}
          height='60.8px'>
          <LearningProgressButtonText>
            3.ICTの使いこなし
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
  font-size: .75rem;
  font-weight: bold;
`;

const SLearningProgressHeaderText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .75rem;
  color: #666666;
  margin-bottom: .5rem;
`;

export default LearningProgressButtons;

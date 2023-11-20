import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const ChapterSelection = () => {
  const navigate = useNavigate();
  const handleClickPrimaryButton = () => {
    navigate('/flashcard');
  };
  return (
    <>
      <SChapterHeadText>CHAPTER</SChapterHeadText>
      <ChapterContainer>
        <SCapterSelectionContainer>
          <SCapterSelectionComponent variant='ghost' onClick={handleClickPrimaryButton}>
            <SCapterSelectionText>1.インターネットの仕組みと関連技術</SCapterSelectionText>
            <SCapterSelectionIcon>⁨〉</SCapterSelectionIcon>
          </SCapterSelectionComponent>
          <SDivider />
          <SCapterSelectionComponent variant='ghost' onClick={handleClickPrimaryButton}>
            <SCapterSelectionText>2.インターネット接続の設定とトラブル処理</SCapterSelectionText>
            <SCapterSelectionIcon>⁨〉</SCapterSelectionIcon>
          </SCapterSelectionComponent>
          <SDivider />
          <SCapterSelectionComponent variant='ghost' onClick={handleClickPrimaryButton}>
            <SCapterSelectionText>3.ICTの設定と使いこなし</SCapterSelectionText>
            <SCapterSelectionIcon>⁨〉</SCapterSelectionIcon>
          </SCapterSelectionComponent>
          <SDivider />
          <SCapterSelectionComponent variant='ghost' onClick={handleClickPrimaryButton}>
            <SCapterSelectionText>4.セキュリティ</SCapterSelectionText>
            <SCapterSelectionIcon>⁨〉</SCapterSelectionIcon>
          </SCapterSelectionComponent>
          <SDivider />
          <SCapterSelectionComponent variant='ghost' onClick={handleClickPrimaryButton}>
            <SCapterSelectionText>5.ICTの活用と法律</SCapterSelectionText>
            <SCapterSelectionIcon>⁨〉</SCapterSelectionIcon>
          </SCapterSelectionComponent>
          <SDivider />
        </SCapterSelectionContainer>
      </ChapterContainer>
    </>
  )
}

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
  font-size: .75rem;
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
  border: 1px solid #E8E8E8;
  width: 100%;
`;

export default ChapterSelection;

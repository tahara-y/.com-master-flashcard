import MainHeader from '../Molecules/FlashcardPage/Header';
import styled from '@emotion/styled';
import { Card, CardBody, Heading, Text } from '@chakra-ui/react'
import SecondaryButton from '../ Atoms/Buttons/SecondaryButton';

const FlashcardPage = () => {
  return (
    <>
      <MainHeader />
      <SContent>
        {Array.from({ length: 30 }).map((_, index) => (
          <SCard key={index}>
            <CardBody>
              <SHeading>IETF</SHeading>
              <SText>インターネット技術の標準化を行う国際的な組織であり、インターネット標準の策定を行う。</SText>
            </CardBody>
          </SCard>
        ))}
        <SButtonContainer>
          <SecondaryButton width='128px' height='43px'>Back</SecondaryButton>
          <SPageNumber>2/20</SPageNumber>
          <SecondaryButton width='128px' height='43px'>Next</SecondaryButton>
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
  font-size: 30px;
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

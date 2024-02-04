import styled from "@emotion/styled";
import React, { useEffect } from "react";
import SecondaryButton from "../../ Atoms/Buttons/SecondaryButton";

export type FooterPropsType = {
  setCurrentFlashcardNum: React.Dispatch<React.SetStateAction<number>>;
  currentFlashcardNum: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  itemsPerPage: number;
  totalFlashcardsNum: number;
};

export const Footer: React.FC<FooterPropsType> = (props) => {
  const {
    setCurrentFlashcardNum,
    currentFlashcardNum,
    currentPage,
    setCurrentPage,
    totalPage,
    itemsPerPage,
    totalFlashcardsNum,
  } = props;

  const handleClickPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPage = Number(event.target.value);
    const newFlashcardListNum = (selectedPage - 1) * itemsPerPage + 1;
    setCurrentFlashcardNum(newFlashcardListNum);
    window.scrollTo(0, 0);
  };

  const handleClickNextButton = () => {
    const newCurrentFlashcardNum = Math.min(
      currentFlashcardNum + itemsPerPage,
      totalFlashcardsNum
    );
    setCurrentFlashcardNum(newCurrentFlashcardNum);
    const newPage = Math.ceil(newCurrentFlashcardNum / itemsPerPage);
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleClickBackButton = () => {
    const newCurrentFlashcardNum = Math.max(
      currentFlashcardNum - itemsPerPage,
      1
    );
    setCurrentFlashcardNum(newCurrentFlashcardNum);
    const newPage = Math.ceil(newCurrentFlashcardNum / itemsPerPage);
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <SFooter>
      <SButtonContainer>
        <SecondaryButton
          width="100px"
          height="43px"
          onClick={handleClickBackButton}
          isDisabled={Boolean(currentPage === 1)}
        >
          Back
        </SecondaryButton>
        <SelectContainer>
          <SSelect onChange={handleClickPageChange} value={currentPage}>
            {Array.from({ length: totalPage }, (_, i) => i + 1).map(
              (pageNumber) => (
                <option key={pageNumber} value={pageNumber}>
                  {pageNumber} / {totalPage}
                </option>
              )
            )}
          </SSelect>
        </SelectContainer>
        <SecondaryButton
          width="100px"
          height="43px"
          onClick={handleClickNextButton}
          isDisabled={Boolean(currentPage === totalPage)}
        >
          Next
        </SecondaryButton>
      </SButtonContainer>
    </SFooter>
  );
};

const SFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #38a169;
  padding: 1rem;
`;

const SButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5;
  margin-bottom: 1.5;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100px;
  height: 43px;
  border-radius: 6rem;
`;

const SSelect = styled.select`
  border: none;
  font-weight: bold;
  color: #4b9460;
  &:focus {
    outline: none;
  }
`;

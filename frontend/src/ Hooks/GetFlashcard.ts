export type Flashcard = {
  id: number;
  chapter: number;
  chapterWordOrder: string;
  word: string;
  description: string;
};

export const getFlashcards = async (
  currentFlashcardNum: number,
  itemsPerPage: number,
  chapterNum: number
): Promise<Flashcard[]> => {
  const flashcards: Flashcard[] = [];
  for (let i = currentFlashcardNum; i < currentFlashcardNum + itemsPerPage; i++) {
    const id = i.toString().padStart(5, '0');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/flashcards/?chapter=${chapterNum}&chapterWordOrder=${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! (Flashcard ID: ${id}): ${response.status}`);
    }
    const data: Flashcard = await response.json();
    flashcards.push(data);
  }
  return flashcards;
};

import { Flashcard } from "./GetFlashcard";

export const fetchUserProfile = async(lastFlashcard:Flashcard, token:string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/userProfile/`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        currentId: lastFlashcard.id,
        currentChapter: lastFlashcard.chapter,
        currentChapterWordOrder: lastFlashcard.chapterWordOrder,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
};
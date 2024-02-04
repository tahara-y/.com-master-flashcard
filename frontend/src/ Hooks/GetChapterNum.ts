export type GetChapterNum = {
  chapterId: number;
  maxNum: number;
}

export const getChapterNum = async (chapterNum:number):Promise<GetChapterNum> => {
  const response = 
    await fetch(`${process.env.REACT_APP_API_URL}/api/chapterNum/${chapterNum}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  if (!response.ok) {
    throw new Error(`HTTP error! (FlashcardsNum): ${response.status}`);
  };
  const data = await response.json();
  return {
    chapterId:data.chapterId,
    maxNum:data.maxNum
  };
};
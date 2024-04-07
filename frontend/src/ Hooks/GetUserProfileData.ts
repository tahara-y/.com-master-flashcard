// NOTE:UserProfileデータベースから受け取ったデータを使いやすいように変更したレスポンスに使用する型定義
// NOTE:currentChapterWordOrderを整数型に変更
export type ResponseUserProfileDataType = {
  user: string;
  currentId: number;
  currentChapter: number;
  currentChapterWordOrder: number;
};

// NOTE:UserProfileデータベースから受け取った際の型定義はそのまま
export type UserProfileDataType = {
  user: string;
  currentId: number;
  currentChapter: number;
  currentChapterWordOrder: string;
};

export type ChapterDataType = {
  previousChapterId: number;
  previousChapterName: string;
  currentChapterId: number;
  currentChapterName: string;
};

export type ResponseType = {
  userProfileData: ResponseUserProfileDataType;
  chapterData: ChapterDataType;
};

export const GetUserProfileData = async (
  token: string
): Promise<ResponseType> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/userProfile/`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const userProfileData: UserProfileDataType[] = await response.json();
  const responseUserProfileData: ResponseUserProfileDataType = {
    user: userProfileData[0].user,
    currentId: userProfileData[0].currentId,
    currentChapter: userProfileData[0].currentChapter,
    currentChapterWordOrder: parseInt(
      userProfileData[0].currentChapterWordOrder,
      10
    ),
  };
  const chapterData: ChapterDataType = {
    previousChapterId:
      userProfileData[0].currentChapter > 1
        ? userProfileData[0].currentChapter - 1
        : 1,
    previousChapterName: `${
      process.env[
        `REACT_APP_CHAPTER_OF_${
          userProfileData[0].currentChapter > 1
            ? userProfileData[0].currentChapter - 1
            : 1
        }`
      ]
    }`,
    currentChapterId: userProfileData[0].currentChapter,
    currentChapterName: `${
      process.env[`REACT_APP_CHAPTER_OF_${userProfileData[0].currentChapter}`]
    }`,
  };

  return {
    userProfileData: responseUserProfileData,
    chapterData: chapterData,
  };
};

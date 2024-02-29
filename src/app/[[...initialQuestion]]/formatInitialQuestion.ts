export const formatInitialQuestion = (
  initialQuestion: string[] | undefined
) => {
  if (!initialQuestion) return "";

  const sentence = initialQuestion[0].split("-").join(" ");
  const uppercasedSentence =
    sentence.charAt(0).toUpperCase() + sentence.slice(1);

  return uppercasedSentence;
};

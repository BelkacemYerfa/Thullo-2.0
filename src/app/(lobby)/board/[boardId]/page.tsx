type BoardPageProps = {
  params: {
    boardId: string;
  };
};

export default function BoardPage({ params: { boardId } }: BoardPageProps) {
  return <div>{boardId}</div>;
}

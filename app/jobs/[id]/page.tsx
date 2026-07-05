interface Props {
  params: {
    id: string;
  };
}

export default function JobDetailsPage({ params }: Props) {
  return (
    <main className="p-5">
      <h1>Job Details</h1>
      <p>Job ID: {params.id}</p>
    </main>
  );
}
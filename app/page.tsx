import { FileUpload } from './components/FileUpload';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <FileUpload />
    </main>
  );
}

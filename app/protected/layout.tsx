import Navbar from "@/components/ui/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-100 ">{children}</div>
    </>
  );
}
